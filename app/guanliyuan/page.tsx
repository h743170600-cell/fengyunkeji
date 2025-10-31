'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Guanliyuan() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/guanliyuan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/guanliyuan/banbenguanli')
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-xs">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            管理员登录
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入管理员账号"
                required
              />
            </div>
            
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入密码"
                required
              />
            </div>

            {error && (
              <div className="w-48 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="w-48 pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-5 px-7 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-colors text-base disabled:opacity-50"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}