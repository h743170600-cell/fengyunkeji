export default function Yonghuguanli() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">用户管理</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 md:p-6">
            {/* 搜索和操作区域 - 响应式布局 */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="搜索用户..."
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                导出数据
              </button>
            </div>
            
            {/* 表格区域 - 手机端卡片式，电脑端表格 */}
            <div className="block md:hidden space-y-4">
              {/* 手机端卡片 */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">10001</span>
                  <span className="px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    正常
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>手机号: 138****0001</div>
                  <div>注册: 2024-01-15</div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-blue-600 text-sm">查看</button>
                  <button className="text-red-600 text-sm">禁用</button>
                </div>
              </div>
            </div>
            
            {/* 电脑端表格 */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      用户ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      手机号
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      注册时间
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      10001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      138****0001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      2024-01-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        正常
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        查看
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        禁用
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}