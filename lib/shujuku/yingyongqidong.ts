import { chushihuaShujuku } from './chushihua';

// 应用启动时自动初始化数据库
let shujukuChushihuaWancheng = false;

export async function yingyongQidongShujuku() {
    if (!shujukuChushihuaWancheng) {
        await chushihuaShujuku();
        shujukuChushihuaWancheng = true;
    }
}

// 在应用主入口调用此函数