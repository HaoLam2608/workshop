"use client";
import { useEffect, useState } from 'react'
import PaperCard from '@/components/author/PaperCard'
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
  data: {
    reviewed: PaperResponse[];
    pending: PaperResponse[];
    needs_review: PaperResponse[];
  }
}

export default function PapersPage() {
  const [papers, setPapers] = useState<PaperResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorId = localStorage.getItem("userId");
    if (!authorId) {
      console.warn("No authorId found in localStorage");
      setLoading(false);
      return;
    }

    const fetchPapers = async () => {
      try {
        const response: ApiResponse[] = await GetPaperByAuthor(Number(authorId)); 
        const result = response[0].data;        
        // Extract arrays from the response object
        const pending = result.pending || [];
        const reviewed = result.reviewed || [];
        const needsReview = result.needs_review || [];
        
        // Combine all papers
        const allPapersArray = [...pending, ...reviewed, ...needsReview];
        setPapers(allPapersArray);
        
      } catch (err) {
        console.error('Error fetching papers:', err);
        setPapers([]);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <div className="ml-4 text-gray-600 text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Bài báo của tôi</h1>
        <a 
          href="/author/papers/new" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Nộp bài mới
        </a>
      </div>
      
      <div className="space-y-4">
        {papers.length > 0 ? (
          papers.map(paper => {
            const transformedPaper = {
              id: paper.id,
              title: paper.title,
              status: getStatusText(paper.status),
              date: new Date(paper.submission_date).toLocaleDateString('vi-VN'),
              conference: paper.field, 
              reviews: 0 
            };
            
            return (
              <PaperCard key={paper.id} paper={transformedPaper} />
            );
          })
        ) : (
          <div className="text-center py-12">
            <p className="text-black text-lg">Bạn chưa có bài báo nào.</p>
            <a 
              href="/author/papers/new" 
              className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Nộp bài báo đầu tiên
            </a>
          </div>
        )}
      </div>
    </div>
  );
}