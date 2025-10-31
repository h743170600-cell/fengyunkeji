'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// 定义统计数据类型
interface StatsData {
  revenue: {
    today: number
    monthly: number
    total: number
    growth: number
  }
  users: {
    total: number
    newToday: number
    newMonthly: number
    active: number
  }
}

// 定义充值记录类型
interface ChongzhiRecord {
  id: string
  orderNo: string
  phone: string
  amount: number
  packageType: string
  createTime: string
}

export default function Banbenguanli() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [chongzhiRecords, setChongzhiRecords] = useState<ChongzhiRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [recordsLoading, setRecordsLoading] = useState(true)
  
  // 版本管理状态
  const [pcVersion, setPcVersion] = useState('v2.1.0')
  const [newPcVersion, setNewPcVersion] = useState('')
  const [mobileVersion, setMobileVersion] = useState('v1.5.2')
  const [newMobileVersion, setNewMobileVersion] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    // 调用统计API
    fetch('/api/tongji')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // 获取版本信息
    fetch('/api/banben')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPcVersion(data.data.pc.currentVersion)
          setMobileVersion(data.data.android.currentVersion)
        }
      })

    // 获取最近充值记录
    fetch('/api/chongzhi?page=1&pageSize=5')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setChongzhiRecords(data.data.records.slice(0, 5)) // 只显示最近5条
        }
        setRecordsLoading(false)
      })
      .catch(() => setRecordsLoading(false))
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

  // 更新版本函数
  const updateVersion = async (platform: string, newVersion: string) => {
    if (!newVersion.trim()) {
      alert('请输入新版本号')
      return
    }
    
    setUpdating(true)
    try {
      const response = await fetch('/api/banben', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          newVersion
        }),
      })
      
      const data = await response.json()
      if (data.success) {
        alert(data.message)
        // 更新本地状态
        if (platform === 'pc') {
          setPcVersion(newVersion)
          setNewPcVersion('')
        } else {
          setMobileVersion(newVersion)
          setNewMobileVersion('')
        }
      } else {
        alert('更新失败: ' + data.message)
      }
    } catch (error) {
      alert('更新失败，请检查网络连接')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">数据加载失败</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">系统管理</h1>
        
        <div className="flex justify-between items-start">
          {/* 版本管理 */}
          <div className="bg-white rounded-lg shadow p-6 w-80 mr-8">
            <h2 className="text-xl font-semibold mb-4 text-center">版本管理</h2>
            
            {/* PC端版本管理 */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-center text-gray-700">PC端</h3>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">当前版本</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center bg-gray-50" 
                  value={pcVersion}
                  readOnly
                />
              </div>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">新版本号</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center" 
                  placeholder="v2.2.0"
                  value={newPcVersion}
                  onChange={(e) => setNewPcVersion(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button 
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => updateVersion('pc', newPcVersion)}
                  disabled={updating || !newPcVersion.trim()}
                >
                  {updating ? '更新中...' : '更新版本'}
                </button>
              </div>
            </div>

            {/* 手机端版本管理 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-700">手机端</h3>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">当前版本</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center bg-gray-50" 
                  value={mobileVersion}
                  readOnly
                />
              </div>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">新版本号</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center" 
                  placeholder="v1.6.0"
                  value={newMobileVersion}
                  onChange={(e) => setNewMobileVersion(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button 
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => updateVersion('android', newMobileVersion)}
                  disabled={updating || !newMobileVersion.trim()}
                >
                  {updating ? '更新中...' : '更新版本'}
                </button>
              </div>
            </div>
          </div>

          {/* 充值管理 - 使用API数据 */}
          <div className="bg-white rounded-lg shadow p-6 w-80 mx-8">
            <h2 className="text-xl font-semibold mb-4 text-center">充值管理</h2>
            
            {/* 今日充值 */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-center text-gray-700">今日充值</h3>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">充值金额</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center" 
                  value={`¥${stats.revenue.today}`}
                  readOnly
                />
              </div>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">充值笔数</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center" 
                  value={stats.users.newToday}
                  readOnly
                />
              </div>
              <div className="text-center">
                <Link href="/guanliyuan/chongzhijilu">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-full">
                    查看详情
                  </button>
                </Link>
              </div>
            </div>

            {/* 本月充值 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-700">本月充值</h3>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">充值金额</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center" 
                  value={`¥${stats.revenue.monthly}`}
                  readOnly
                />
              </div>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">充值笔数</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center" 
                  value={stats.users.newMonthly}
                  readOnly
                />
              </div>
              <div className="text-center">
                <Link href="/guanliyuan/chongzhijilu">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 w-full">
                    查看详情
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* 充值记录 - 使用API数据 */}
          <div className="bg-white rounded-lg shadow p-6 w-80 ml-8">
            <h2 className="text-xl font-semibold mb-4 text-center">充值记录</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recordsLoading ? (
                <div className="text-center text-gray-500 py-4">加载中...</div>
              ) : chongzhiRecords.length === 0 ? (
                <div className="text-center text-gray-500 py-4">暂无充值记录</div>
              ) : (
                chongzhiRecords.map((record) => (
                  <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm">
                      <div className="font-medium">用户{record.phone}</div>
                      <div className="text-gray-500">
                        {new Date(record.createTime).toLocaleTimeString('zh-CN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">¥{record.amount}</div>
                      <div className="text-xs text-gray-500">{getPackageDisplay(record.packageType)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link href="/guanliyuan/chongzhijilu">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold mt-4">
                查看完整记录
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}