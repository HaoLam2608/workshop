import Link from 'next/link'

export default function RegisterPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Đăng ký tài khoản</h1>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullname"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                required
                minLength={8}
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nhập lại mật khẩu"
                required
                minLength={8}
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Tôi đồng ý với{' '}
                <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                  điều khoản sử dụng
                </Link>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
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