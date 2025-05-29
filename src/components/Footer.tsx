import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HộiThảoOnline</h3>
            <p className="text-gray-300">
              Nền tảng kết nối và chia sẻ kiến thức thông qua các hội thảo chuyên nghiệp.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition">Trang chủ</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">Giới thiệu hệ thống</Link></li>
              <li><Link href="/conferences" className="text-gray-300 hover:text-white transition">Danh sách hội thảo</Link></li>
              <li><Link href="/login" className="text-gray-300 hover:text-white transition">Đăng nhập</Link></li>
              <li><Link href="/register" className="text-gray-300 hover:text-white transition">Đăng ký</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <span>contact@hoithaoonline.vn</span>
              </div>
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <span>(+84) 123 456 789</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} HộiThảoOnline. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  )
}