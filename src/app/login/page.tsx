'use client'
import axios from 'axios'
import { log } from 'console'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from "react-toastify"
export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onchange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await axios.post('/api/user/login', formData);

      if (res.status === 201) {
        const { id, hoten,username } = res.data.data.user;
        console.log("hhahah",res.data.data.user);
        localStorage.setItem('userId', id);
        console.log('User ID:', id);
        localStorage.setItem('hoten', hoten);
        console.log('User Name:', hoten);
        if( username === 'admin') {
          toast.success(res.data.message);
          router.push('/Organizer');
        }else{
          toast.success(res.data.message);
          router.push('/author/dashboard');
        }
        
      }

    } catch (err) {
      const message = err.response?.data?.error || 'Đăng nhập thất bại';
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
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng nhập</h1>

          <form className="space-y-6" onSubmit={handlesubmit}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Email */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={onchange}
                required
                placeholder="Nhập username của bạn"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
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
                onChange={onchange}
                required
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
              />
            </div>

            {/* Ghi nhớ + Quên mật khẩu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {/* Nút đăng nhập */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </div>
          </form>

          {/* Đăng ký */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
