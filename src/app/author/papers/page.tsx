import PaperCard from '@/components/author/PaperCard'

const papers = [
  {
    id: 1,
    title: "Công nghệ AI trong phát triển phần mềm",
    status: "Đang phản biện",
    date: "15/06/2023",
    conference: "Hội thảo CNTT 2023",
    reviews: 2
  },
  {
    id: 2,
    title: "Xu hướng Digital Marketing 2023",
    status: "Đã chấp nhận",
    date: "10/05/2023",
    conference: "Hội thảo Marketing Quốc tế",
    reviews: 3
  },
  {
    id: 3,
    title: "Blockchain và tương lai của tài chính",
    status: "Từ chối",
    date: "22/04/2023",
    conference: "Hội thảo Tài chính Ngân hàng",
    reviews: 2
  }
]

export default function PapersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Bài báo của tôi</h1>
        <a 
          href="/author/papers/new" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Nộp bài mới
        </a>
      </div>
      
      <div className="space-y-4">
        {papers.map(paper => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  )
}