import { initializeShujuku } from './lianjie';

// 初始化数据库
export async function chushihuaShujuku() {
    const success = await initializeShujuku();
    if (success) {
        console.log('数据库初始化成功');
    } else {
        console.log('数据库初始化失败，使用模拟数据模式');
    }
    return success;
}