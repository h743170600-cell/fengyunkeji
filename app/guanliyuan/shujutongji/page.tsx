export default function Shujutongji() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">数据统计</h1>
        
        {/* 日期筛选 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
              <input type="date" className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
              <input type="date" className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex items-end">
              <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                查询
              </button>
            </div>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-600">总收入</div>
                <div className="text-2xl font-bold text-gray-900">¥89,600</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                <span className="text-green-600 text-xl">👥</span>
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-600">新增用户</div>
                <div className="text-2xl font-bold text-gray-900">156</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-600">付费率</div>
                <div className="text-2xl font-bold text-gray-900">18.5%</div>
              </div>
            </div>
          </div>
        </div>

        {/* 套餐分布 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">套餐分布</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>月卡套餐</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>年卡套餐</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>次卡套餐</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">支付方式</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>微信支付</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>支付宝</span>
                  <span>35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}