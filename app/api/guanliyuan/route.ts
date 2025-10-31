import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // 固定管理员账号密码验证
    if (username === '743170600' && password === 'h41832313') {
      return NextResponse.json({ 
        success: true, 
        message: '登录成功'
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: '账号或密码错误'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: '服务器错误'
    }, { status: 500 })
  }
}