'use client'

import { useState, useEffect } from 'react'

interface VersionInfo {
  pc: {
    currentVersion: string
    downloadUrl: string
    updateTime: string
  }
  android: {
    currentVersion: string
    downloadUrl: string
    updateTime: string
  }
  ios: {
    currentVersion: string
    downloadUrl: string
    updateTime: string
  }
}

export default function Xiazai() {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/banben')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVersionInfo(data.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    )
  }

  if (!versionInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">数据加载失败</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">客户端下载</h1>
          <p className="text-xl text-gray-600">选择适合您设备的版本</p>
        </div>

        <div className="flex justify-center gap-12"> {/* 增加间距到 gap-12 */}
          {/* PC端下载 */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-72 text-center"> {/* 增加宽度和内边距 */}
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Windows</h2>
            <div className="mb-6">
              <div className="text-sm text-gray-500">版本 {versionInfo.pc.currentVersion}</div>
            </div>
            <a 
              href={versionInfo.pc.downloadUrl} 
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              下载 EXE
            </a>
          </div>

          {/* Android下载 */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-72 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Android</h2>
            <div className="mb-6">
              <div className="text-sm text-gray-500">版本 {versionInfo.android.currentVersion}</div>
            </div>
            <a 
              href={versionInfo.android.downloadUrl} 
              className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              下载 APK
            </a>
          </div>

          {/* iOS下载 */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-72 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">iOS</h2>
            <div className="mb-6">
              <div className="text-sm text-gray-500">版本 {versionInfo.ios.currentVersion}</div>
            </div>
            <a 
              href={versionInfo.ios.downloadUrl} 
              className="inline-block bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              App Store
            </a>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-12">
          <p className="text-gray-500">请根据您的设备类型选择对应的客户端版本</p>
        </div>
      </div>
    </div>
  )
}