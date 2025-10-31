import { getShujukuLianjie } from './lianjie';
import { Yanzhengma } from './Yanzhengma';

export class YanzhengmaCaozuo {
    // 创建验证码记录
    static async chuangjianYanzhengma(yanzhengmaData: {
        shoujihao: string;
        yanzhengma: string;
    }) {
        const shujuku = getShujukuLianjie();
        const yanzhengmaRepository = shujuku.getRepository(Yanzhengma);
        
        const yanzhengma = new Yanzhengma();
        yanzhengma.shoujihao = yanzhengmaData.shoujihao;
        yanzhengma.yanzhengma = yanzhengmaData.yanzhengma;
        yanzhengma.guoqi_shijian = new Date(Date.now() + 10 * 60 * 1000); // 10分钟后过期
        
        return await yanzhengmaRepository.save(yanzhengma);
    }

    // 验证验证码
    static async yanzhengYanzhengma(shoujihao: string, yanzhengma: string) {
        const shujuku = getShujukuLianjie();
        const yanzhengmaRepository = shujuku.getRepository(Yanzhengma);
        
        const record = await yanzhengmaRepository.findOne({
            where: { 
                shoujihao,
                yanzhengma,
                zhuangtai: 'weishiyong'
            }
        });

        if (!record) {
            return { success: false, message: '验证码错误或已使用' };
        }

        if (new Date() > record.guoqi_shijian) {
            await yanzhengmaRepository.update(
                { id: record.id },
                { zhuangtai: 'yiguoqi' }
            );
            return { success: false, message: '验证码已过期' };
        }

        // 验证成功，标记为已使用
        await yanzhengmaRepository.update(
            { id: record.id },
            { zhuangtai: 'yishiyong' }
        );

        return { success: true, message: '验证成功' };
    }

    // 清理过期验证码
    static async qingliGuoqiYanzhengma() {
        const shujuku = getShujukuLianjie();
        const yanzhengmaRepository = shujuku.getRepository(Yanzhengma);
        
        await yanzhengmaRepository
            .createQueryBuilder()
            .delete()
            .where('guoqi_shijian < :now', { now: new Date() })
            .execute();
    }
}