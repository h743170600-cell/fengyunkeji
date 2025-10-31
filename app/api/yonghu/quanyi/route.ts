import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

// JWT配置
const JWT_CONFIG = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET || 'zhongyi_ai_default_secret_2024'),
};

// 模拟数据库（后续替换为真实数据库连接）
const users = new Map();
const userBenefits = new Map();

// 验证JWT token
async function verifyToken(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.slice(7);
  
  try {
    const { payload } = await jose.jwtVerify(token, JWT_CONFIG.secret);
    return payload;
  } catch (error) {
    console.error('Token验证失败:', error);
    return null;
  }
}

// 查询用户权益
export async function GET(request: NextRequest) {
  try {
    // 1. 验证用户token
    const authHeader = request.headers.get('authorization');
    const payload = await verifyToken(authHeader);
    
    if (!payload) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const userId = payload.user_id as string;

    // 2. 查询用户权益
    const benefits = userBenefits.get(userId);
    
    if (!benefits) {
      return NextResponse.json(
        { error: '用户权益信息不存在' },
        { status: 404 }
      );
    }

    // 3. 返回权益信息
    return NextResponse.json({
      success: true,
      benefits: {
        balance: benefits.balance,
        vip_level: benefits.vip_level,
        vip_expire_time: benefits.vip_expire_time,
        diagnosis_remaining: benefits.diagnosis_remaining,
        expert_remaining: benefits.expert_remaining,
        updated_at: benefits.updated_at
      }
    });

  } catch (error) {
    console.error('查询用户权益错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 扣减服务次数
export async function PUT(request: NextRequest) {
  try {
    // 1. 验证用户token
    const authHeader = request.headers.get('authorization');
    const payload = await verifyToken(authHeader);
    
    if (!payload) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const userId = payload.user_id as string;
    const { serviceType } = await request.json();

    // 2. 验证服务类型
    if (!serviceType || !['diagnosis', 'expert'].includes(serviceType)) {
      return NextResponse.json(
        { error: '服务类型错误' },
        { status: 400 }
      );
    }

    // 3. 获取用户当前权益
    const benefits = userBenefits.get(userId);
    
    if (!benefits) {
      return NextResponse.json(
        { error: '用户权益信息不存在' },
        { status: 404 }
      );
    }

    // 4. 扣减对应次数
    let deducted = false;
    
    if (serviceType === 'diagnosis') {
      if (benefits.diagnosis_remaining <= 0) {
        return NextResponse.json(
          { error: '诊断次数不足' },
          { status: 400 }
        );
      }
      benefits.diagnosis_remaining -= 1;
      deducted = true;
    } else if (serviceType === 'expert') {
      if (benefits.expert_remaining <= 0) {
        return NextResponse.json(
          { error: '专家诊断次数不足' },
          { status: 400 }
        );
      }
      benefits.expert_remaining -= 1;
      deducted = true;
    }

    if (deducted) {
      // 5. 更新权益信息
      benefits.updated_at = new Date().toISOString();
      userBenefits.set(userId, benefits);
    }

    return NextResponse.json({
      success: true,
      benefits: {
        balance: benefits.balance,
        vip_level: benefits.vip_level,
        vip_expire_time: benefits.vip_expire_time,
        diagnosis_remaining: benefits.diagnosis_remaining,
        expert_remaining: benefits.expert_remaining
      },
      message: '服务使用成功'
    });

  } catch (error) {
    console.error('更新用户权益错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}