import { initDatabase } from '../lib/shujukuguanli';

async function main() {
  console.log('开始初始化数据库表...');
  try {
    await initDatabase();
    console.log('✅ 数据库表初始化成功！');
    process.exit(0);
  } catch (error) {
    console.error('❌ 数据库表初始化失败:', error);
    process.exit(1);
  }
}

main();