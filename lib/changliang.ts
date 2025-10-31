// 系统常量配置

// 分页配置
export const FENYE_CHANGLIANG = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
}

// 用户状态
export const YONGHU_ZHUANGTAI = {
  ACTIVE: 'active',      // 正常
  INACTIVE: 'inactive',  // 未激活
  BANNED: 'banned'       // 已禁用
} as const

// 充值记录状态
export const CHONGZHI_ZHUANGTAI = {
  DAISHENHE: 'daishenhe',  // 待审核
  YITONGGUO: 'yitongguo',  // 已通过
  YIJUJUE: 'yijujue',      // 已拒绝
  YIQUXIAO: 'yiquxiao'     // 已取消
} as const

// 支付方式
export const ZHIFU_FANGSHI = {
  WECHAT: 'wechat',    // 微信支付
  ALIPAY: 'alipay'     // 支付宝
} as const

// 套餐类型
export const TAOCAN_LEIXING = {
  YUEKA: 'yueka',          // 月卡
  NIANKA: 'nianka',        // 年卡
  CISHU_30: 'cishu_30',    // 30次套餐
  CISHU_70: 'cishu_70'     // 70次套餐
} as const

// 套餐价格（单位：元）
export const TAOCAN_JIAGE = {
  [TAOCAN_LEIXING.YUEKA]: 60,
  [TAOCAN_LEIXING.NIANKA]: 600,
  [TAOCAN_LEIXING.CISHU_30]: 20,
  [TAOCAN_LEIXING.CISHU_70]: 40
} as const

// 状态显示文本映射
export const ZHUANGTAI_WENBEN = {
  [YONGHU_ZHUANGTAI.ACTIVE]: '正常',
  [YONGHU_ZHUANGTAI.INACTIVE]: '未激活',
  [YONGHU_ZHUANGTAI.BANNED]: '已禁用',
  
  [CHONGZHI_ZHUANGTAI.DAISHENHE]: '待审核',
  [CHONGZHI_ZHUANGTAI.YITONGGUO]: '已通过',
  [CHONGZHI_ZHUANGTAI.YIJUJUE]: '已拒绝',
  [CHONGZHI_ZHUANGTAI.YIQUXIAO]: '已取消',
  
  [ZHIFU_FANGSHI.WECHAT]: '微信支付',
  [ZHIFU_FANGSHI.ALIPAY]: '支付宝',
  
  [TAOCAN_LEIXING.YUEKA]: '月卡套餐',
  [TAOCAN_LEIXING.NIANKA]: '年卡套餐',
  [TAOCAN_LEIXING.CISHU_30]: '30次套餐',
  [TAOCAN_LEIXING.CISHU_70]: '70次套餐'
} as const

// 状态颜色映射
export const ZHUANGTAI_YANSE = {
  [YONGHU_ZHUANGTAI.ACTIVE]: 'bg-green-100 text-green-800',
  [YONGHU_ZHUANGTAI.INACTIVE]: 'bg-yellow-100 text-yellow-800',
  [YONGHU_ZHUANGTAI.BANNED]: 'bg-red-100 text-red-800',
  
  [CHONGZHI_ZHUANGTAI.DAISHENHE]: 'bg-yellow-100 text-yellow-800',
  [CHONGZHI_ZHUANGTAI.YITONGGUO]: 'bg-green-100 text-green-800',
  [CHONGZHI_ZHUANGTAI.YIJUJUE]: 'bg-red-100 text-red-800',
  [CHONGZHI_ZHUANGTAI.YIQUXIAO]: 'bg-gray-100 text-gray-800'
} as const

// API响应码
export const XIANGYINGMA = {
  SUCCESS: 200,           // 成功
  BAD_REQUEST: 400,       // 请求错误
  UNAUTHORIZED: 401,      // 未授权
  FORBIDDEN: 403,         // 禁止访问
  NOT_FOUND: 404,         // 未找到
  SERVER_ERROR: 500       // 服务器错误
} as const

// 管理员角色
export const GUANLIYUAN_JIAOSE = {
  SUPER_ADMIN: 'super_admin',    // 超级管理员
  OPERATOR: 'operator'           // 操作员
} as const