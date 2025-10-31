import OSS from 'ali-oss'
import type { OSSFile, ListObjectsResult } from './oss-types'

// 创建OSS客户端
let ossClient: OSS | null = null

try {
  ossClient = new OSS({
    region: process.env.OSS_REGION!,
    bucket: process.env.OSS_BUCKET!,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  })
  console.log('OSS客户端初始化成功')
} catch (error) {
  console.error('OSS初始化失败:', error)
  ossClient = null
}

// 文件上传功能
export async function uploadFile(fileName: string, fileBuffer: Buffer) {
  if (!ossClient) {
    return { success: false, error: 'OSS客户端未初始化' }
  }
  
  try {
    const result = await ossClient.put(`downloads/${fileName}`, fileBuffer)
    return {
      success: true,
      url: result.url
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

// 获取文件列表
export async function listFiles(): Promise<OSSFile[]> {
  if (!ossClient) {
    console.error('OSS客户端未初始化')
    return []
  }
  
  try {
    const result = await ossClient.list(
      {
        prefix: 'downloads/',
        delimiter: '/',
        'max-keys': 100
      },
      {}
    ) as ListObjectsResult
    
    return result.objects || []
  } catch (error: any) {
    console.error('获取文件列表失败:', error.message)
    return []
  }
}

// 获取文件信息
export async function getFileInfo(fileName: string) {
  if (!ossClient) {
    return { success: false, error: 'OSS客户端未初始化' }
  }
  
  try {
    const result = await ossClient.head(fileName)
    return {
      success: true,
      data: result
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}