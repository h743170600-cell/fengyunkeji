// 用户数据模型
export interface Yonghu {
  // 用户基础信息
  id: string
  phone: string
  registerTime: string
  lastLoginTime?: string
  status: 'active' | 'inactive' | 'banned'
  
  // 套餐信息
  currentPackage?: {
    type: 'monthly' | 'yearly' | 'times_30' | 'times_70'
    purchaseTime: string
    expireTime: string
    totalUsage: number
    usedUsage: number
  }
  
  // 统计信息
  stats?: {
    totalRecharge: number
    totalOrders: number
    lastRechargeTime?: string
  }
}

// 用户查询参数
export interface YonghuQuery {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  startDate?: string
  endDate?: string
}

// 用户创建参数
export interface CreateYonghuParams {
  phone: string
}

// 用户更新参数
export interface UpdateYonghuParams {
  status?: 'active' | 'inactive' | 'banned'
  currentPackage?: Yonghu['currentPackage']
}