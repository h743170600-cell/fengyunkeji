// 充值记录数据模型
export interface Chongzhi {
  // 记录标识
  id: string
  chongzhiId: string
  
  // 用户信息
  yonghuId: string
  shoujihao: string
  
  // 订单信息
  dingdanhao: string
  jine: number
  taocanleixing: 'yueka' | 'nianka' | 'cishu_30' | 'cishu_70'
  zhifufangshi: 'wechat' | 'alipay'
  
  // 时间信息
  chongzhishijian: string
  shenheshijian?: string
  gengxinshijian: string
  
  // 状态信息
  zhuangtai: 'daishenhe' | 'yitongguo' | 'yijujue' | 'yiquxiao'
  
  // 审核信息
  shenheyuan?: string
  shenhebeizhu?: string
  
  // 系统信息
  xitongbeizhu?: {
    appbanben: string
    shebeileixing: string
    ipdizhi: string
  }
}

// 充值记录查询参数
export interface ChongzhiQuery {
  page?: number
  pageSize?: number
  zhuangtai?: string
  zhifufangshi?: string
  taocanleixing?: string
  kaishishijian?: string
  jieshushijian?: string
  sousuo?: string
}

// 充值记录创建参数（APP上报）
export interface CreateChongzhiParams {
  chongzhiId: string
  yonghuId: string
  shoujihao: string
  dingdanhao: string
  jine: number
  taocanleixing: string
  zhifufangshi: string
  xitongbeizhu?: {
    appbanben: string
    shebeileixing: string
    ipdizhi: string
  }
}

// 充值记录更新参数
export interface UpdateChongzhiParams {
  zhuangtai: 'yitongguo' | 'yijujue' | 'yiquxiao'
  shenheyuan: string
  shenhebeizhu?: string
}

// 充值统计信息
export interface ChongzhiTongji {
  zongjine: number
  zongtiaoshu: number
  daishenheShu: number
  yitongguoShu: number
  yijujueShu: number
  ritongji: number
  yuetongji: number
}

// 套餐类型映射
export const TaocanMap = {
  'yueka': '月卡套餐',
  'nianka': '年卡套餐', 
  'cishu_30': '30次套餐',
  'cishu_70': '70次套餐'
}

// 支付方式映射
export const ZhifuMap = {
  'wechat': '微信支付',
  'alipay': '支付宝'
}

// 状态映射
export const ZhuangtaiMap = {
  'daishenhe': '待审核',
  'yitongguo': '已通过',
  'yijujue': '已拒绝',
  'yiquxiao': '已取消'
}