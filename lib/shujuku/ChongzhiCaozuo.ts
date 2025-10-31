import { getShujukuLianjie } from './lianjie';
import { Chongzhi } from './Chongzhi';

export class ChongzhiCaozuo {
    // 创建充值记录
    static async chuangjianChongzhi(chongzhiData: {
        shoujihao: string;
        jine: number;
        taocan_leixing: string;
        zhifu_fangshi: string;
    }) {
        const shujuku = getShujukuLianjie();
        const chongzhiRepository = shujuku.getRepository(Chongzhi);
        
        const chongzhi = new Chongzhi();
        chongzhi.chongzhi_id = `CZ${Date.now()}`;
        chongzhi.dingdanhao = `DD${Date.now()}`;
        chongzhi.shoujihao = chongzhiData.shoujihao;
        chongzhi.jine = chongzhiData.jine;
        chongzhi.taocan_leixing = chongzhiData.taocan_leixing;
        chongzhi.zhifu_fangshi = chongzhiData.zhifu_fangshi;
        
        return await chongzhiRepository.save(chongzhi);
    }

    // 根据手机号获取充值记录
    static async huoquChongzhiByShoujihao(shoujihao: string) {
        const shujuku = getShujukuLianjie();
        const chongzhiRepository = shujuku.getRepository(Chongzhi);
        
        return await chongzhiRepository.find({
            where: { shoujihao },
            order: { chongzhi_shijian: 'DESC' }
        });
    }

    // 获取所有充值记录（管理员用）
    static async huoquSuoyouChongzhi() {
        const shujuku = getShujukuLianjie();
        const chongzhiRepository = shujuku.getRepository(Chongzhi);
        
        return await chongzhiRepository.find({
            order: { chongzhi_shijian: 'DESC' }
        });
    }

    // 更新充值状态
    static async gengxinChongzhiZhuangtai(chongzhi_id: string, xin_zhuangtai: string) {
        const shujuku = getShujukuLianjie();
        const chongzhiRepository = shujuku.getRepository(Chongzhi);
        
        await chongzhiRepository.update(
            { chongzhi_id },
            { zhuangtai: xin_zhuangtai }
        );
    }

    // 统计今日充值金额
    static async tongjiJinriChongzhi() {
        const shujuku = getShujukuLianjie();
        const chongzhiRepository = shujuku.getRepository(Chongzhi);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const result = await chongzhiRepository
            .createQueryBuilder('chongzhi')
            .select('SUM(chongzhi.jine)', 'total')
            .addSelect('COUNT(chongzhi.id)', 'count')
            .where('chongzhi.chongzhi_shijian >= :today', { today })
            .andWhere('chongzhi.zhuangtai = :zhuangtai', { zhuangtai: 'yitongguo' })
            .getRawOne();
            
        return {
            total: parseFloat(result?.total) || 0,
            count: parseInt(result?.count) || 0
        };
    }

    // 统计本月充值金额
    static async tongjiBenYueChongzhi() {
        const shujuku = getShujukuLianjie();
        const chongzhiRepository = shujuku.getRepository(Chongzhi);
        
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const result = await chongzhiRepository
            .createQueryBuilder('chongzhi')
            .select('SUM(chongzhi.jine)', 'total')
            .addSelect('COUNT(chongzhi.id)', 'count')
            .where('chongzhi.chongzhi_shijian >= :startOfMonth', { startOfMonth })
            .andWhere('chongzhi.zhuangtai = :zhuangtai', { zhuangtai: 'yitongguo' })
            .getRawOne();
            
        return {
            total: parseFloat(result?.total) || 0,
            count: parseInt(result?.count) || 0
        };
    }
}