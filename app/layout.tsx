import './globals.css'
import { yingyongQidongShujuku } from '@/lib/shujuku/yingyongqidong';

// 在根布局中初始化数据库
yingyongQidongShujuku().catch(console.error);

export const metadata = {
  title: '健康系统',
  description: '健康系统 - 客户端下载与数据管理',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full bg-gray-50">
        {children}
      </body>
    </html>
  )
}