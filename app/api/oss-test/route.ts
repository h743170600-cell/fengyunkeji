import { listFiles } from '../../../lib/oss'

export async function GET() {
  try {
    const files = await listFiles()
    return Response.json({ 
      success: true, 
      message: 'OSS连接成功',
      fileCount: files.length,
      files: files
    })
  } catch (error: any) {
    return Response.json({ 
      success: false, 
      message: 'OSS连接失败: ' + error.message 
    }, { status: 500 })
  }
}