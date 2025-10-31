import { NextResponse } from 'next/server'
import { listFiles } from '@/lib/oss'

// 获取版本信息 - 从OSS动态获取
export async function GET() {
  try {
    // 从OSS获取文件列表
    const files = await listFiles()
    
    // 提取版本信息
    const versionData = {
      pc: {
        currentVersion: extractVersionFromFiles(files, 'Windows'),
        downloadUrl: "https://download-20251024.oss-cn-beijing.aliyuncs.com/downloads/Windows/latest.exe",
        updateTime: getLatestUpdateTime(files, 'Windows')
      },
      android: {
        currentVersion: extractVersionFromFiles(files, 'android'),
        downloadUrl: "https://download-20251024.oss-cn-beijing.aliyuncs.com/downloads/android/app.apk", 
        updateTime: getLatestUpdateTime(files, 'android')
      },
      ios: {
        currentVersion: "v1.5.2",
        downloadUrl: "https://apps.apple.com/yourapp",
        updateTime: new Date().toISOString().split('T')[0]
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: versionData
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: '获取版本信息失败'
    }, { status: 500 })
  }
}

// 辅助函数：从文件名提取版本号
function extractVersionFromFiles(files: any[], platform: string): string {
  // 这里可以根据实际文件命名规则解析版本号
  // 暂时返回默认版本
  return platform === 'Windows' ? 'v2.1.0' : 'v1.5.2'
}

// 辅助函数：获取最新更新时间
function getLatestUpdateTime(files: any[], platform: string): string {
  const platformFiles = files.filter(file => file.name.includes(platform))
  if (platformFiles.length > 0) {
    return new Date(platformFiles[0].lastModified).toISOString().split('T')[0]
  }
  return new Date().toISOString().split('T')[0]
}

// 更新版本信息
export async function POST(request: Request) {
  try {
    const { platform, newVersion, downloadUrl } = await request.json()
    
    if (!platform || !newVersion) {
      return NextResponse.json({ 
        success: false, 
        message: '参数不完整'
      }, { status: 400 })
    }

    // 这里可以添加更新OSS文件名的逻辑
    // 目前先返回成功

    return NextResponse.json({ 
      success: true, 
      message: `${platform}版本更新为${newVersion}`,
      data: {
        platform,
        newVersion, 
        downloadUrl
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: '更新版本失败'
    }, { status: 500 })
  }
}