import Link from 'next/link'
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const statusIcons = {
  "Đang phản biện": <ClockIcon className="w-5 h-5 text-yellow-500" />,
  "Đã chấp nhận": <CheckCircleIcon className="w-5 h-5 text-green-500" />,
  "Từ chối": <XCircleIcon className="w-5 h-5 text-red-500" />
}

export default function PaperCard({ paper }: { paper: any }) {
  return (
    // <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
    //   <div className="flex justify-between items-start">
    //     <div>
    //       <h3 className="text-lg font-semibold">{paper.title}</h3>
    //       <p className="text-gray-600 mt-1">{paper.conference}</p>
    //       <div className="flex items-center mt-2">
    //         {statusIcons[paper.status as keyof typeof statusIcons]}
    //         <span className="ml-2">{paper.status}</span>
    //       </div>
    //     </div>
        
    //     <div className="text-right">
    //       <p className="text-sm text-gray-500">{paper.date}</p>
    //       {paper.reviews > 0 && (
    //         <p className="text-sm mt-2">
    //           <span className="font-medium">{paper.reviews}</span> phản biện
    //         </p>
    //       )}
    //     </div>
    //   </div>
      
    //   <div className="flex justify-end mt-4 space-x-2">
    //     <Link 
    //       href={`/author/papers/${paper.id}`}
    //       className="px-3 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
    //     >
    //       Chi tiết
    //     </Link>
    //     {paper.status === "Đang phản biện" && (
    //       <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition">
    //         Xem phản biện
    //       </button>
    //     )}
    //   </div>
    // </div>
     <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
      <div className='flex gap-7 flex-col'>
          <h3 className="text-lg font-semibold ">Tiêu đề :{paper.title}</h3>
          <p className='text-sm'>Ngày nộp : {paper.date}</p>

      </div>
      <div className="flex justify-end mt-4">
        <Link 
          href={`/author/papers/${paper.id}`}
          className="px-3 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
        >
          Chi tiết
        </Link>
      </div>
    </div>
  )
}