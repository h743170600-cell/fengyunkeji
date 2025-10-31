import { NextResponse } from 'next/server'
import { getShujukuLianjie } from '@/lib/shujuku/lianjie'
import { Yonghu } from '@/lib/shujuku/Yonghu'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const search = searchParams.get('search') || ''

    const shujuku = getShujukuLianjie()
    const yonghuRepository = shujuku.getRepository(Yonghu)
    
    // 构建查询
    const queryBuilder = yonghuRepository.createQueryBuilder('yonghu')
    
    if (search) {
      queryBuilder.where('yonghu.shoujihao LIKE :search OR yonghu.username LIKE :search', {
        search: `%${search}%`
      })
    }
    
    // 分页查询
    const [users, total] = await queryBuilder
      .orderBy('yonghu.chuangjian_shijian', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()

    // 格式化返回数据
    const formattedUsers = users.map(user => ({
      id: user.id.toString(),
      phone: user.shoujihao,
      username: user.username,
      registerTime: user.chuangjian_shijian.toISOString(),
      status: user.zhuangtai,
      lastLogin: user.gengxin_shijian.toISOString(),
      balance: user.yue,
      remainingTimes: user.shengyu_cishu
    }))

    return NextResponse.json({
      success: true,
      data: {
        users: formattedUsers,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    })

  } catch (error) {
    console.error('获取用户列表失败:', error)
    return NextResponse.json(
      { success: false, message: '获取用户列表失败' },
      { status: 500 }
    )
  }
}