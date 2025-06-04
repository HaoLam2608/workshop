import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fetchApi from "@/axios/config";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    console.log(formData);
    const title = formData.get('title') as string;
    const field = formData.get('field') as string;
    const abstract = formData.get('abstract') as string;
    const keywords = formData.get('keywords') as string;
    const contactAuthorIndex = formData.get('contactAuthorIndex') as string;
    const contactPhone = formData.get('contactPhone') as string;
    const authorsRaw = formData.get('authors') as string;
    const file = formData.get('file') as File;

    if (
      !title || !field || !abstract || !keywords ||
      !contactAuthorIndex || !contactPhone || !authorsRaw || !file
    ) {
      return NextResponse.json({ message: 'Thiếu thông tin cần thiết' }, { status: 400 });
    }

    const authors = JSON.parse(authorsRaw);

    if (!Array.isArray(authors) || authors.length === 0) {
      return NextResponse.json({ message: 'Danh sách tác giả không hợp lệ' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ message: 'Chỉ chấp nhận file PDF' }, { status: 400 });
    }

    const uploaddir = path.join(process.cwd(), 'public', 'uploads');

    if (!existsSync(uploaddir)) {
      mkdirSync(uploaddir, { recursive: true });  // Sửa thành true
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Tạo tên file tránh ghi đè
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const filepath = path.join(uploaddir, filename);

    await writeFile(filepath, buffer);

    const data = JSON.stringify({tenbaibao: title,
      linhvuc: field,
      tomtat: abstract,
      tacgia: authors,});
    const res = await fetchApi.post("api/article/addPaper", {tenbaibao: title,
      linhvuc: field,
      tomtat: abstract,
      tacgia: authors,});

    return NextResponse.json({ message: "Upload thành công", data: res.data }, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/papers:", error);
    return NextResponse.json({ message: "Lỗi server nội bộ" }, { status: 500 });
  }
}
