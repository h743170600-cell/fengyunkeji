import { sql } from '@vercel/postgres';

export async function initDatabase() {
  try {
    // 创建用户表
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) UNIQUE NOT NULL,
        verification_code VARCHAR(10),
        code_expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    // 创建用户权益表
    await sql`
      CREATE TABLE IF NOT EXISTS user_benefits (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        balance INTEGER DEFAULT 0,
        vip_level INTEGER DEFAULT 0,
        vip_expire_time TIMESTAMP,
        diagnosis_remaining INTEGER DEFAULT 0,
        expert_remaining INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    // 创建诊断记录表
    await sql`
      CREATE TABLE IF NOT EXISTS diagnosis_records (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        symptoms TEXT,
        diagnosis_type VARCHAR(50),
        diagnosis_result TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    console.log('数据库表创建成功');
  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
}

export { sql };