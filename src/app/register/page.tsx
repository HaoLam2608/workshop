'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    role : '',
    hoten: '',
    username: '',
    email: '',
    diachi: '',
    coquan: '',
    linhvuc: '',
    hocvi: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const onchange = (e) => {
        const {name , value} = e.target;
        setFormData(prev => ({
          ...prev,
          [name] : value
        }))
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const res =await axios.post("/api/user/register", formData);
    console.log(res);
    if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
      
      router.push('/login');
    } else {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  }
  return (
    <section className="py-16 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng ký người dùng</h1>

          <form className="space-y-5" onSubmit={handlesubmit}>
            {/* Họ và tên */}
            <div>
              <label htmlFor="hoten" className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="hoten"
                name="hoten"
                required
                value={formData.hoten}
                onChange={onchange}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Tên đăng nhập */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange = {onchange}
                required
                placeholder="nguyenvana"
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange = {onchange}
                required
                placeholder="abc@example.com"
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <label htmlFor="diachi" className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                id="diachi"
                name="diachi"
                value={formData.diachi}
                onChange = {onchange}
                placeholder="123 Đường ABC, Quận 1, TP.HCM"
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Cơ quan */}
            <div>
              <label htmlFor="coquan" className="block text-sm font-medium text-gray-700 mb-1">
                Cơ quan
              </label>
              <input
                type="text"
                id="coquan"
                name="coquan"
                value={formData.coquan}
                onChange = {onchange}
                required
                placeholder="Đại học Khoa học Tự nhiên"
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Lĩnh vực */}
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1 required">Lĩnh vực nghiên cứu</label>
                <select
                  name='linhvuc'
                  value={formData.linhvuc}
                  onChange={onchange}
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Chọn lĩnh vực</option>
                  <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                  <option value="Kỹ thuật">Kỹ thuật</option>
                  <option value="Khoa học tự nhiên">Khoa học tự nhiên</option>
                  <option value="Kinh tế">Kinh tế</option>
                  <option value="Giáo dục">Giáo dục</option>
                </select>
            </div>

            {/* Học vị */}
            <div>
              <label htmlFor="hocvi" className="block text-sm font-medium text-gray-700 mb-1">
                Học vị
              </label>
              <input
                type="text"
                id="hocvi"
                name="hocvi"
                value={formData.hocvi}
                onChange = {onchange}
                required
                placeholder="Tiến sĩ, Thạc sĩ,..."
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
              <div>
               <label className="block text-sm font-medium text-gray-700 mb-1 required">Vai trò</label>
                <select
                  name='role'
                  value={formData.role}
                  onChange={onchange}
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Chọn vai trò</option>
                  <option value="author">Tác giả</option>
                  <option value="reviewer">Người phản biện</option>
                </select>
            </div>
            {/* Mật khẩu */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange = {onchange}
                required
                minLength={8}
                placeholder="Tối thiểu 8 ký tự"
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                minLength={8}
                placeholder="Nhập lại mật khẩu"
                className="w-full px-4 py-2  rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>

            {/* Đồng ý điều khoản */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 -gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                Tôi đồng ý với{' '}
                <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                  điều khoản sử dụng
                </Link>
              </label>
            </div>

            {/* Nút submit */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition cursor-pointer"
              >
                Đăng ký
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
