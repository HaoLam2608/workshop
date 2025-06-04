import { NextRequest, NextResponse } from "next/server";
import fetchApi from "@/axios/config"
export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    const { username, hoten, password, email } = user;

    if (!username || !hoten || !password || !email) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    console.log('Đang gửi tới /api/auth/register:', user);

    const newUser = await fetchApi.post('/api/auth/register', user); 

    console.log('Phản hồi từ /api/auth/register:', newUser.data);

    return NextResponse.json(
      { message: 'Đăng ký thành công', user: newUser.data },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error creating user:', error.response?.data || error.message);
    return NextResponse.json(
      { message: 'Lỗi khi đăng ký. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
