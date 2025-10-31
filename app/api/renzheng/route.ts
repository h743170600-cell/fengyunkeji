import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { sql } from '@vercel/postgres';

// JWT配置
const JWT_CONFIG = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET || 'zhongyi_ai_default_secret_2024'),
  expiresIn: process.env.APP_TOKEN_EXPIRE_DAYS || '30d',
};

// 生成JWT token
async function generateToken(userId: string, phone: string): Promise<string> {
  const token = await new jose.SignJWT({ 
    user_id: userId,
    phone: phone,
    type: 'user'
  })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime(JWT_CONFIG.expiresIn)
  .setIssuedAt()
  .setIssuer('zhongyi-ai-system')
  .setAudience('zhongyi-ai-app')
  .sign(JWT_CONFIG.secret);

  return token;
}

// 验证手机号格式
function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    const { shoujihao, yanzhengma } = await request.json();

    // 1. 验证输入参数
    if (!shoujihao || !yanzhengma) {
      return NextResponse.json(
        { error: '手机号和验证码不能为空' },
        { status: 400 }
      );
    }

    // 2. 验证手机号格式
    if (!isValidPhone(shoujihao)) {
      return NextResponse.json(
        { error: '手机号格式错误' },
        { status: 400 }
      );
    }

    // 3. 验证验证码（使用数据库）
    const codeResult = await sql`
      SELECT verification_code, code_expires_at 
      FROM users 
      WHERE phone = ${shoujihao}
      LIMIT 1
    `;

    if (codeResult.rows.length === 0 || !codeResult.rows[0].verification_code) {
      return NextResponse.json(
        { error: '验证码错误或已过期' },
        { status: 400 }
      );
    }

    const storedCode = codeResult.rows[0].verification_code;
    const expiresAt = new Date(codeResult.rows[0].code_expires_at);

    if (storedCode !== yanzhengma) {
      return NextResponse.json(
        { error: '验证码错误' },
        { status: 400 }
      );
    }

    // 检查验证码是否过期
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { error: '验证码已过期' },
        { status: 400 }
      );
    }

    // 4. 清除已使用的验证码
    await sql`
      UPDATE users 
      SET verification_code = NULL, code_expires_at = NULL 
      WHERE phone = ${shoujihao}
    `;

    // 5. 查找或创建用户（使用数据库）
    let userResult = await sql`
      SELECT * FROM users WHERE phone = ${shoujihao} LIMIT 1
    `;

    const isNewUser = userResult.rows.length === 0;
    let user;

    if (isNewUser) {
      // 新用户注册
      const newUser = await sql`
        INSERT INTO users (phone, created_at, updated_at)
        VALUES (${shoujihao}, NOW(), NOW())
        RETURNING *
      `;
      user = newUser.rows[0];

      // 初始化用户权益
      await sql`
        INSERT INTO user_benefits (user_id, diagnosis_remaining, expert_remaining, created_at, updated_at)
        VALUES (${user.id}, 3, 1, NOW(), NOW())
      `;
    } else {
      // 老用户更新最后登录时间
      user = userResult.rows[0];
      await sql`
        UPDATE users SET updated_at = NOW() WHERE id = ${user.id}
      `;
    }

    // 6. 获取用户权益
    const benefitsResult = await sql`
      SELECT * FROM user_benefits WHERE user_id = ${user.id} LIMIT 1
    `;
    const benefits = benefitsResult.rows[0];

    // 7. 生成JWT token
    const token = await generateToken(user.id.toString(), user.phone);

    return NextResponse.json({
      success: true,
      isNewUser: isNewUser,
      user: {
        user_id: user.id,
        shoujihao: user.phone,
        created_at: user.created_at,
      },
      benefits: {
        balance: benefits?.balance || 0,
        vip_level: benefits?.vip_level || 0,
        vip_expire_time: benefits?.vip_expire_time,
        diagnosis_remaining: benefits?.diagnosis_remaining || 0,
        expert_remaining: benefits?.expert_remaining || 0,
      },
      token: token,
      message: isNewUser ? '注册成功' : '登录成功'
    });

  } catch (error) {
    console.error('认证登录错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}