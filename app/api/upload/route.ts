import { NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '@/lib/oss'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileName = formData.get('fileName') as string

    if (!file || !fileName) {
      return NextResponse.json(
        { success: false, message: '文件和文件名不能为空' },
        { status: 400 }
      )
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadFile(fileName, fileBuffer)

    if (result.success) {
      return NextResponse.json({
        success: true,
        url: result.url,
        message: '文件上传成功'
      })
    } else {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: '上传失败: ' + error.message },
      { status: 500 }
    )
  }
}