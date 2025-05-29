import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

const conferences = [
  {
    id: 1,
    title: 'Công nghệ AI trong phát triển phần mềm',
    date: '15/06/2023',
    time: '09:00 - 11:30',
    location: 'Trực tuyến',
    description: 'Hội thảo về ứng dụng trí tuệ nhân tạo trong phát triển phần mềm hiện đại.',
    image: '/ai-conference.jpg'
  },
  {
    id: 2,
    title: 'Xu hướng Digital Marketing 2023',
    date: '22/06/2023',
    time: '14:00 - 16:30',
    location: 'Hội trường A, TP.HCM',
    description: 'Cập nhật những xu hướng mới nhất trong lĩnh vực Digital Marketing.',
    image: '/marketing-conference.jpg'
  },
  {
    id: 3,
    title: 'Blockchain và tương lai của tài chính',
    date: '30/06/2023',
    time: '13:30 - 17:00',
    location: 'Trực tuyến',
    description: 'Khám phá tiềm năng của công nghệ blockchain trong lĩnh vực tài chính ngân hàng.',
    image: '/blockchain-conference.jpg'
  },
]

export default function ConferenceList() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Danh sách hội thảo đang mở
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conferences.map((conference) => (
            <div 
              key={conference.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Hình ảnh hội thảo</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{conference.title}</h3>
                <p className="text-gray-600 mb-4">{conference.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-500">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>{conference.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>{conference.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{conference.location}</span>
                  </div>
                </div>
                
                <Link
                  href={`/conferences/${conference.id}`}
                  className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/conferences"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition font-bold"
          >
            Xem tất cả hội thảo
          </Link>
        </div>
      </div>
    </section>
  )
}