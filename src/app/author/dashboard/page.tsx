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

type FilterType = 'all' | 'pending' | 'reviewed' | 'needs_review';

export default function AuthorDashboard() {
  const [allpapers, setAllpapers] = useState<PaperResponse[]>([]);
  const [papers, setPapers] = useState<PaperResponse[]>([]);
  const [pendingpapers, setPendingpapers] = useState<PaperResponse[]>([]);
  const [reviewedpapers, setReviewedpapers] = useState<PaperResponse[]>([]);
  const [needsReviewpapers, setNeedsReviewpapers] = useState<PaperResponse[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [filteredPapers, setFilteredPapers] = useState<PaperResponse[]>([]);

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
        
        const pending = result.pending || [];
        const reviewed = result.reviewed || [];
        const needsReview = result.needs_review || [];
        
         console.log(pending);
        setPendingpapers(pending);
        setReviewedpapers(reviewed);
        setNeedsReviewpapers(needsReview);
        
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

  useEffect(() => {
    switch (currentFilter) {
      case 'pending':
        setFilteredPapers(pendingpapers);
        break;
      case 'reviewed':
        setFilteredPapers(reviewedpapers);
        break;
      case 'needs_review':
        setFilteredPapers(needsReviewpapers);
        break;
      case 'all':
      default:
        setFilteredPapers(allpapers);
        break;
    }
  }, [currentFilter, allpapers, pendingpapers, reviewedpapers, needsReviewpapers]);

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'da_phan_cong':
        return 'Đã phân công';
      case 'da_phan_bien':
        return 'Đã duyệt';
      case 'dang_cho_phan_cong':
        return 'Cần phản biện';
      case 'tu_choi':
        return 'Từ chối';
      default:
        return status;
    }
  };

  const handleFilterChange = (filterType: FilterType) => {
    setCurrentFilter(filterType);
  };

  const getFilterTitle = (): string => {
    switch (currentFilter) {
      case 'pending':
        return 'Bài báo đang phản biện';
      case 'reviewed':
        return 'Bài báo đã chấp nhận';
      case 'needs_review':
        return 'Bài báo cần xem phản biện';
      case 'all':
      default:
        return 'Danh sách tất cả bài báo';
    }
  };

  const stats = [
    { 
      title: "Bài đã nộp", 
      value: papers.length, 
      icon: <FileTextIcon className="w-6 h-6" />,
      onClick: () => handleFilterChange('all'),
      isActive: currentFilter === 'all'
    },
    { 
      title: "Đang phản biện", 
      value: pendingpapers.length, 
      icon: <ClockIcon className="w-6 h-6" />,
      onClick: () => handleFilterChange('pending'),
      isActive: currentFilter === 'pending'
    },
    { 
      title: "Đã chấp nhận", 
      value: reviewedpapers.length, 
      icon: <CheckCircleIcon className="w-6 h-6" />,
      onClick: () => handleFilterChange('reviewed'),
      isActive: currentFilter === 'reviewed'
    },
    { 
      title: "Phản biện cần xem", 
      value: needsReviewpapers.length, 
      icon: <MessageSquareIcon className="w-6 h-6" />,
      onClick: () => handleFilterChange('needs_review'),
      isActive: currentFilter === 'needs_review'
    }
  ];

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            onClick={stat.onClick}
            className={`cursor-pointer transition-all duration-200 ${
              stat.isActive ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:shadow-lg'
            }`}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{getFilterTitle()}</h2>
          <span className="text-sm text-gray-500">
            {filteredPapers.length} bài báo
          </span>
        </div>
        
        {filteredPapers.length > 0 ? (
          <ul className="space-y-3">
            {filteredPapers.map((paper, index) => (
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
          <p>Không có bài báo nào trong danh mục này.</p>
        )}
      </div>
    </div>
  );
}