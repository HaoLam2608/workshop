export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-white-800">Giới thiệu hệ thống</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="prose prose-lg text-gray-700">
            <h2 className="text-2xl font-bold text-indigo-700">Về chúng tôi</h2>
            <p>
              Hệ thống HộiThảoOnline được xây dựng với mục tiêu kết nối các chuyên gia, nhà nghiên cứu
              và những người đam mê học hỏi thông qua các hội thảo chất lượng cao.
            </p>
            
            <h2 className="text-2xl font-bold text-indigo-700 mt-8">Sứ mệnh</h2>
            <p>
              Chúng tôi mong muốn tạo ra một nền tảng mở, nơi mọi người có thể dễ dàng tiếp cận với
              những kiến thức mới nhất từ các chuyên gia hàng đầu trong nhiều lĩnh vực khác nhau.
            </p>
            
            <h2 className="text-2xl font-bold text-indigo-700 mt-8">Tính năng nổi bật</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hệ thống hội thảo trực tuyến chất lượng cao</li>
              <li>Đa dạng chủ đề từ nhiều lĩnh vực</li>
              <li>Giao diện thân thiện, dễ sử dụng</li>
              <li>Hỗ trợ đa nền tảng</li>
              <li>Công cụ tương tác đa dạng</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}