import { NextResponse } from 'next/server';
import fetchApi from '@/axios/config';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetchApi.post("/api/auth/login", body);

    if (res.data?.data) {
      return NextResponse.json(
        { message: res.data.message, data: res.data.data },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: res.data.message },
        { status: 401 }
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
      { error: 'Lỗi server không xác định khi đăng nhập' },
      { status: 500 }
    );
  }
}
