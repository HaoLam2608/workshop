import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Kết nối với các chuyên gia hàng đầu
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Tham gia các hội thảo chất lượng cao, mở rộng kiến thức và mạng lưới chuyên nghiệp của bạn.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/conferences" 
            className="px-8 py-3 bg-white text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-bold text-lg"
          >
            Xem hội thảo
          </Link>
          <Link 
            href="/about" 
            className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-indigo-700 transition font-bold text-lg"
          >
            Giới thiệu hệ thống
          </Link>
        </div>
      </div>
    </section>
  )
}