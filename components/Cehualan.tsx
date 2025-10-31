'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Cehualan() {
  const pathname = usePathname()

  const menuItems = [
    {
      href: '/guanliyuan/yonghuguanli',
      label: '用户管理',
      icon: '👥'
    },
    {
      href: '/guanliyuan/chongzhiguanli', 
      label: '充值管理',
      icon: '💰'
    },
    {
      href: '/guanliyuan/shujutongji',
      label: '数据统计',
      icon: '📊'
    },
    {
      href: '/guanliyuan/banbenguanli',
      label: '版本管理',
      icon: '📱'
    }
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">管理菜单</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive(item.href)
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* 移动端底部菜单 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 grid grid-cols-4 gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center p-2 rounded-lg text-xs transition-colors ${
              isActive(item.href)
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-base mb-1">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}