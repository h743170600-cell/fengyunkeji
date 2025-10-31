import { NextRequest, NextResponse } from 'next/server';

// 模拟短信发送（实际应接入云片网、阿里云等）
const sendSMS = async (phone: string, code: string): Promise<boolean> => {
  console.log(`发送短信到 ${phone}，验证码：${code}`);
  // 实际接入短信服务商时替换这里
  return true;
};

// 存储验证码（实际应该用Redis，这里用模拟）
const smsCodes = new Map();

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // 1. 验证手机号格式
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: '手机号格式错误' },
        { status: 400 }
      );
    }

    // 2. 检查发送频率（防止轰炸）
    const lastSent = smsCodes.get(`${phone}_time`);
    if (lastSent && Date.now() - lastSent < 60000) {
      return NextResponse.json(
        { error: '请60秒后再试' },
        { status: 400 }
      );
    }

    // 3. 生成6位验证码
    const code = Math.random().toString().slice(2, 8);
    
    // 4. 存储验证码（5分钟过期）
    smsCodes.set(phone, code);
    smsCodes.set(`${phone}_time`, Date.now());
    
    // 5. 设置过期时间（5分钟后自动清除）
    setTimeout(() => {
      smsCodes.delete(phone);
    }, 5 * 60 * 1000);

    // 6. 发送短信
    const sendResult = await sendSMS(phone, code);
    
    if (!sendResult) {
      return NextResponse.json(
        { error: '验证码发送失败' },
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