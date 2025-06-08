'use client'
import { loginOrganizer } from '@/axios/api';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from "react-toastify"

export default function OrganizerLoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
        console.log("Form data sent:", formData); // Log dữ liệu gửi

    try {
      const user = await loginOrganizer(formData.username, formData.password);
      console.log("User data:", user);
      if (user) {
        console.log("Organizer Login Response:", user);
        toast.success("Đăng nhập ban tổ chức thành công!");
        router.push('/Organizer');
      } else {
        throw new Error("Dữ liệu người dùng không hợp lệ");
      }
    } catch (err) {
      const message = err.message || 'Đăng nhập thất bại';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng nhập Ban Tổ Chức</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={onChange}
                required
                placeholder="Nhập username của bạn"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
              />
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
                onChange={onChange}
                required
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
              />
            </div>

            {/* Ghi nhớ + Quên mật khẩu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {/* Nút đăng nhập */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập Ban Tổ Chức'}
              </button>
            </div>

            {/* Nút quay lại đăng nhập thường */}
            <div>
              <Link href="/login">
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
                >
                  Đăng nhập với tư cách người dùng
                </button>
              </Link>
            </div>
          </form>

        </div>
      </div>
    </section>
  )
}