export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { ChongzhiCaozuo } from '../../../lib/shujuku/ChongzhiCaozuo';

interface FormattedRecord {
  id: string;
  orderNo: string;
  userId: string;
  phone: string;
  amount: number;
  packageType: string;
  paymentMethod: string;
  status: string;
  createTime: string;
  updateTime: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const status = searchParams.get('status') || '';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search') || '';

    // 从数据库获取所有充值记录
    const allRecords = await ChongzhiCaozuo.huoquSuoyouChongzhi();
    
    // 如果数据库为空，返回空数组
    if (!allRecords || allRecords.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          records: [],
          stats: {
            totalAmount: 0,
            pendingCount: 0,
            approvedCount: 0,
            totalCount: 0
          },
          total: 0,
          page,
          pageSize,
          totalPages: 0
        }
      });
    }

    // 转换数据格式以保持兼容性
    const formattedRecords: FormattedRecord[] = allRecords.map(record => ({
      id: record.id.toString(),
      orderNo: record.dingdanhao,
      userId: record.yonghu_id?.toString() || '',
      phone: record.shoujihao,
      amount: record.jine,
      packageType: record.taocan_leixing,
      paymentMethod: record.zhifu_fangshi,
      status: record.zhuangtai,
      createTime: record.chongzhi_shijian.toISOString(),
      updateTime: record.gengxin_shijian.toISOString()
    }));

    // 筛选逻辑
    let filteredRecords = formattedRecords;
    
    if (status) {
      filteredRecords = filteredRecords.filter((record: FormattedRecord) => record.status === status);
    }
    
    if (search) {
      filteredRecords = filteredRecords.filter((record: FormattedRecord) => 
        record.orderNo.includes(search) || 
        record.phone.includes(search) ||
        record.userId.includes(search)
      );
    }

    // 分页逻辑
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

    // 统计信息
    const stats = {
      totalAmount: filteredRecords.reduce((sum: number, record: FormattedRecord) => sum + record.amount, 0),
      pendingCount: filteredRecords.filter((record: FormattedRecord) => record.status === 'daishenhe').length,
      approvedCount: filteredRecords.filter((record: FormattedRecord) => record.status === 'yitongguo').length,
      totalCount: filteredRecords.length
    };

    return NextResponse.json({
      success: true,
      data: {
        records: paginatedRecords,
        stats,
        total: filteredRecords.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredRecords.length / pageSize)
      }
    });

  } catch (error) {
    console.error('获取充值记录失败:', error);
    return NextResponse.json(
      { success: false, message: '获取充值记录失败' },
      { status: 500 }
    );
  }
}

// 更新充值记录状态
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    // 从数据库获取记录
    const allRecords = await ChongzhiCaozuo.huoquSuoyouChongzhi();
    const record = allRecords.find((r: any) => r.id.toString() === id);
    
    if (record) {
      // 更新数据库中的状态
      await ChongzhiCaozuo.gengxinChongzhiZhuangtai(record.chongzhi_id, status);
      
      return NextResponse.json({
        success: true,
        message: '更新成功',
        data: {
          id: record.id.toString(),
          orderNo: record.dingdanhao,
          phone: record.shoujihao,
          amount: record.jine,
          packageType: record.taocan_leixing,
          paymentMethod: record.zhifu_fangshi,
          status: status,
          createTime: record.chongzhi_shijian.toISOString(),
          updateTime: new Date().toISOString()
        }
      });
    } else {
      return NextResponse.json(
        { success: false, message: '记录不存在' },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('更新充值记录失败:', error);
    return NextResponse.json(
      { success: false, message: '更新失败' },
      { status: 500 }
    );
  }
}