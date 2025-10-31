// 充值订单数据模型
export interface Dingdan {
  // 订单基础信息
  id: string
  orderNo: string
  userId: string
  phone: string
  
  // 支付信息
  amount: number
  packageType: 'monthly' | 'yearly' | 'times_30' | 'times_70'
  paymentMethod: 'wechat' | 'alipay'
  paymentTime?: string
  
  // 状态信息
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  createTime: string
  updateTime: string
  
  // 审核信息
  reviewBy?: string
  reviewTime?: string
  reviewNote?: string
  
  // 客户端信息
  clientInfo?: {
    appVersion: string
    deviceType: string
    ipAddress: string
  }
}

// 订单查询参数
export interface DingdanQuery {
  page?: number
  pageSize?: number
  status?: string
  paymentMethod?: string
  packageType?: string
  startDate?: string
  endDate?: string
  search?: string
}

// 订单创建参数（APP上报）
export interface CreateDingdanParams {
  orderNo: string
  userId: string
  phone: string
  amount: number
  packageType: string
  paymentMethod: string
  clientInfo?: {
    appVersion: string
    deviceType: string
    ipAddress: string
  }
}

// 订单更新参数
export interface UpdateDingdanParams {
  status: 'approved' | 'rejected' | 'cancelled'
  reviewBy: string
  reviewNote?: string
}

// 订单统计信息
export interface DingdanTongji {
  totalAmount: number
  totalCount: number
  pendingCount: number
  approvedCount: number
  rejectedCount: number
  dailyAmount: number
  monthlyAmount: number
}