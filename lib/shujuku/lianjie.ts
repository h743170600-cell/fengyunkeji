import { DataSource } from 'typeorm';
import { Chongzhi } from './Chongzhi';
import { Yanzhengma } from './Yanzhengma';

// 使用 Neon Postgres 连接
export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Chongzhi, Yanzhengma],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

// 初始化数据库连接
export async function initializeShujuku() {
    try {
        await AppDataSource.initialize();
        console.log('Neon Postgres 数据库连接成功');
        return true;
    } catch (error) {
        console.error('数据库连接失败:', error);
        return false;
    }
}

// 获取数据库连接
export function getShujukuLianjie() {
    if (!AppDataSource.isInitialized) {
        throw new Error('数据库未初始化');
    }
    return AppDataSource;
}