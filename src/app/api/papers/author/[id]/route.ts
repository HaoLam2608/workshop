// app/api/papers/author/[id]/route.ts

import { NextResponse } from 'next/server';
import fetchApi from '@/axios/config';
import axios from 'axios';
import { NextApiRequest } from 'next';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params; 
    const { id } = params;


    const res = await fetchApi.get(`/api/article/FetchAllByAuthor/${id}`);
    console.log(res.data);
    if (res.data) {
      return NextResponse.json(
        { message: res.data.message, data: res.data.papers },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: res.data.message || 'Không có dữ liệu' },
        { status: 404 }
      );
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status || 500;
      const message = error.response.data?.message || 'Lỗi xác thực';

      return NextResponse.json({ error: message }, { status });
    }

    console.error('Lỗi không xác định:', error);
    return NextResponse.json(
      { error: 'Lỗi server không xác định khi gọi API' },
      { status: 500 }
    );
  }
}
