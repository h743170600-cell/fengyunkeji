import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">健康系统</h1>
        <p className="text-gray-600 mt-2">管理后台</p>
        <div className="mt-4 space-y-2">
          <div>
            <a href="/xiazai" className="text-blue-500 hover:text-blue-700">客户端下载</a>
          </div>
          <div>
            <Link href="/guanliyuan" className="text-gray-500 hover:text-gray-700">管理员登录</Link>
          </div>
        </div>
      </div>
    </div>
  )
}