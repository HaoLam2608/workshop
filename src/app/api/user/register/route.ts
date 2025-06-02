import { NextRequest, NextResponse } from 'next/server';
import fetchApi from '@/axios/config'; 

export async function POST(req: NextRequest) {
  const user = await req.json();
  const { username, hoten, password, email } = user;

  if (!username || !hoten || !password || !email) {
    return NextResponse.json(
      { message: 'Vui lòng điền đầy đủ thông tin' },
      { status: 400 }
    );
  }

  try {
    const newUser = await fetchApi.post('api/auth/register', user); 
    return NextResponse.json({ message: 'Đăng ký thành công', user: newUser.data }, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Lỗi khi đăng ký. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
