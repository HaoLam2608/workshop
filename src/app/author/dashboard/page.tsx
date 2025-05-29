import { FileTextIcon, ClockIcon, CheckCircleIcon, MessageSquareIcon } from '@/components/icons'
import StatCard from '@/components/author/StatCard'

export default function AuthorDashboard() {
  const stats = [
    { title: "Bài đã nộp", value: 5, icon: <FileTextIcon className="w-6 h-6 " /> },
    { title: "Đang phản biện", value: 2, icon: <ClockIcon className="w-6 h-6" /> },
    { title: "Đã chấp nhận", value: 3, icon: <CheckCircleIcon className="w-6 h-6" /> },
    { title: "Phản biện cần xem", value: 1, icon: <MessageSquareIcon className="w-6 h-6" /> }
  ]

  return (
    <div>
      <h1 className="text-black text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl text-black font-semibold mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-gray-600">Bạn đã nộp bài <span className="font-medium">"Công nghệ AI trong phát triển phần mềm"</span></p>
            <p className="text-sm text-gray-400">2 ngày trước</p>
          </div>
          <div className="border-b pb-4">
            <p className="text-gray-600">Bài báo <span className="font-medium">"Xu hướng Digital Marketing 2023"</span> đã được chấp nhận</p>
            <p className="text-sm text-gray-400">1 tuần trước</p>
          </div>
        </div>
      </div>
    </div>
  )
}