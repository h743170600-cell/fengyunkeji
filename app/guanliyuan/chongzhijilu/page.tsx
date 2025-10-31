'use client'

import { useState, useEffect } from 'react'

interface ChongzhiRecord {
  id: string
  orderNo: string
  userId: string
  phone: string
  amount: number
  packageType: string
  paymentMethod: string
  status: string
  createTime: string
  updateTime: string
}

export default function Guanliyuan() {
  const [activeTab, setActiveTab] = useState('all') // all, times, month, year
  const [records, setRecords] = useState<ChongzhiRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // 从API获取充值记录
    fetch('/api/chongzhi')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRecords(data.data.records || [])
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // 转换套餐类型显示
  const getPackageDisplay = (packageType: string) => {
    const packageMap: { [key: string]: string } = {
      'yueka': '月卡',
      'nianka': '年卡', 
      'cishu_30': '30次套餐',
      'cishu_70': '70次套餐'
    }
    return packageMap[packageType] || packageType
  }

  // 转换充值方式显示
  const getTypeDisplay = (paymentMethod: string) => {
    const typeMap: { [key: string]: string } = {
      'wechat': '微信支付',
      'alipay': '支付宝'
    }
    return typeMap[paymentMethod] || paymentMethod
  }

  // 筛选记录
  const filteredRecords = records.filter(record => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'times' && record.packageType.includes('cishu')) ||
      (activeTab === 'month' && record.packageType === 'yueka') ||
      (activeTab === 'year' && record.packageType === 'nianka')
    
    const matchesSearch = !search || 
      record.orderNo.includes(search) || 
      record.phone.includes(search)
    
    return matchesTab && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-gray-600">加载中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">充值记录</h1>
        
        {/* 选项卡 */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              全部记录
            </button>
            <button
              onClick={() => setActiveTab('times')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'times' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              按次充值
            </button>
            <button
              onClick={() => setActiveTab('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'month' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              按月充值
            </button>
            <button
              onClick={() => setActiveTab('year')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'year' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              按年充值
            </button>
          </div>
        </div>

        {/* 筛选区域 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="搜索订单号或手机号..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              搜索
            </button>
          </div>
        </div>

        {/* 充值记录表格 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户账号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">充值金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">套餐类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">充值时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">充值方式</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.orderNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">¥{record.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getPackageDisplay(record.packageType)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.createTime).toLocaleString('zh-CN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        record.packageType.includes('cishu') ? 'bg-blue-100 text-blue-800' :
                        record.packageType === 'yueka' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {getTypeDisplay(record.paymentMethod)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分页 */}
        <div className="bg-white rounded-lg shadow p-4 mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            显示 1 到 {filteredRecords.length} 条，共 {filteredRecords.length} 条记录
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">上一页</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  )
}