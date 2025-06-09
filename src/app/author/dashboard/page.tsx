"use client";
import { useEffect, useState } from 'react'
import { FileTextIcon, ClockIcon, CheckCircleIcon, MessageSquareIcon } from '@/components/icons'
import StatCard from '@/components/author/StatCard'
import { GetPaperByAuthor } from '@/axios/api';

// Define types based on actual API response
interface PaperResponse {
  id: number;
  title: string;
  field: string;
  summary: string;
  submission_date: string;
  status: string;
}

interface ApiResponse {
  data : {
    reviewed: PaperResponse[];
      pending: PaperResponse[];
      needs_review: PaperResponse[];
  }
 
}

export default function AuthorDashboard() {
  const [allpapers, setAllpapers] = useState<PaperResponse[]>([]);
  const [papers, setPapers] = useState<PaperResponse[]>([]);
  const [pendingpapers, setPendingpapers] = useState<PaperResponse[]>([]);
  const [reviewedpapers, setReviewedpapers] = useState<PaperResponse[]>([]);
  const [needsReviewpapers, setNeedsReviewpapers] = useState<PaperResponse[]>([]);

  useEffect(() => {
    const authorId = localStorage.getItem("userId");
    if (!authorId) {
      console.warn("No authorId found in localStorage");
      return;
    }

    const fetchPapers = async () => {
      try {
        const response: ApiResponse[] = await GetPaperByAuthor(Number(authorId)); 
        const result = await response[0].data;
        
        // Extract arrays from the response object
        const pending = result.pending || [];
        const reviewed = result.reviewed || [];
        const needsReview = result.needs_review || [];
        
         console.log(pending);
        setPendingpapers(pending);
        setReviewedpapers(reviewed);
        setNeedsReviewpapers(needsReview);
        
        // Combine all papers
        const allPapersArray = [...pending, ...reviewed, ...needsReview];
        setPapers(allPapersArray);
        setAllpapers(allPapersArray);

      } catch (err) {
        console.error('Error fetching papers:', err);
        setPapers([]);
        setAllpapers([]);
        setPendingpapers([]);
        setReviewedpapers([]);
        setNeedsReviewpapers([]);
      }
    };

    fetchPapers();
  }, []);

  // Helper function to get status text in Vietnamese
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'da_phan_cong':
        return 'Đã phân công';
      case 'da_duyet':
        return 'Đã duyệt';
      case 'can_phan_bien':
        return 'Cần phản biện';
      case 'tu_choi':
        return 'Từ chối';
      default:
        return status;
    }
  };

  const stats = [
    { title: "Bài đã nộp", value: papers.length, icon: <FileTextIcon className="w-6 h-6" /> },
    { title: "Đang phản biện", value: pendingpapers.length, icon: <ClockIcon className="w-6 h-6" /> },
    { title: "Đã chấp nhận", value: reviewedpapers.length, icon: <CheckCircleIcon className="w-6 h-6" /> },
    { title: "Phản biện cần xem", value: needsReviewpapers.length, icon: <MessageSquareIcon className="w-6 h-6" /> }
  ];

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Danh sách bài báo</h2>
        {allpapers.length > 0 ? (
          <ul className="space-y-3">
            {allpapers.map((paper, index) => (
              <li key={paper.id || index} className="border-b pb-3">
                <p className="text-gray-800 text-sm">Tiêu đề: {paper.title}</p>
                <p className="text-sm text-gray-500">Lĩnh vực: {paper.field}</p>
                <p className="text-sm text-gray-500">Tóm tắt: {paper.summary}</p>
                <p className="text-sm text-gray-500">Ngày nộp: {new Date(paper.submission_date).toLocaleDateString('vi-VN')}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  paper.status === 'da_phan_cong' ? 'bg-yellow-100 text-yellow-800' :
                  paper.status === 'da_duyet' ? 'bg-green-100 text-green-800' :
                  paper.status === 'can_phan_bien' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getStatusText(paper.status)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có bài báo nào.</p>
        )}
      </div>
    </div>
  );
}