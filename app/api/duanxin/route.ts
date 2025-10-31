import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// 短信服务商配置
const SMS_CONFIG = {
  accessKeyId: process.env.SMS_ACCESS_KEY_ID || process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.SMS_ACCESS_KEY_SECRET || process.env.OSS_ACCESS_KEY_SECRET,
  signName: process.env.SMS_SIGN_NAME || 'AI诊疗',
  templateCode: process.env.SMS_TEMPLATE_CODE || 'SMS_0000000',
  endpoint: process.env.SMS_ENDPOINT || 'dysmsapi.aliyuncs.com',
};

// 真实的阿里云短信发送
const realSendSMS = async (phone: string, code: string): Promise<boolean> => {
  try {
    // 动态导入，避免服务端打包问题
    const Core = require('@alicloud/pop-core');
    
    const client = new Core({
      accessKeyId: SMS_CONFIG.accessKeyId,
      accessKeySecret: SMS_CONFIG.accessKeySecret,
      endpoint: SMS_CONFIG.endpoint,
      apiVersion: '2017-05-25'
    });

    const params = {
      RegionId: "cn-hangzhou",
      PhoneNumbers: phone,
      SignName: SMS_CONFIG.signName,
      TemplateCode: SMS_CONFIG.templateCode,
      TemplateParam: JSON.stringify({ code: code })
    };

    const requestOption = {
      method: 'POST'
    };

    const result = await client.request('SendSms', params, requestOption);
    return result.Code === 'OK';
    
  } catch (error) {
    console.error('阿里云短信发送失败:', error);
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    const { shoujihao } = await request.json();

    // 1. 验证手机号格式
    if (!shoujihao || !/^1[3-9]\d{9}$/.test(shoujihao)) {
      return NextResponse.json(
        { error: '手机号格式错误' },
        { status: 400 }
      );
    }

    // 2. 检查24小时内是否已发送过
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await sql`
      SELECT created_at FROM users 
      WHERE phone = ${shoujihao} 
      AND created_at >= ${twentyFourHoursAgo.toISOString()}
      AND verification_code IS NOT NULL
      LIMIT 1
    `;
    
    if (result.rows.length > 0) {
      return NextResponse.json(
        { error: '24小时内已发送过验证码，请使用已收到的验证码登录' },
        { status: 400 }
      );
    }

    // 3. 生成6位验证码
    const code = Math.random().toString().slice(2, 8);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时后过期

    // 4. 存储验证码到数据库
    await sql`
      INSERT INTO users (phone, verification_code, code_expires_at, created_at, updated_at)
      VALUES (${shoujihao}, ${code}, ${expiresAt.toISOString()}, NOW(), NOW())
      ON CONFLICT (phone) 
      DO UPDATE SET 
        verification_code = ${code},
        code_expires_at = ${expiresAt.toISOString()},
        updated_at = NOW()
    `;

    // 5. 发送真实短信
    const sendResult = await realSendSMS(shoujihao, code);
    
    if (!sendResult) {
      return NextResponse.json(
        { error: '验证码发送失败，请稍后重试' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '验证码已发送'
    });

  } catch (error) {
    console.error('发送验证码错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
