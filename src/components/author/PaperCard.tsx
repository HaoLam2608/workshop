'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { getReviewsByPaper } from '@/axios/api';
import moment from 'moment';

const statusIcons = {
  "Đang phản biện": <ClockIcon className="w-5 h-5 text-yellow-500" />,
  "Đã chấp nhận": <CheckCircleIcon className="w-5 h-5 text-green-500" />,
  "Từ chối": <XCircleIcon className="w-5 h-5 text-red-500" />
};

interface Review {
  maphieuncx: number;
  noidung: string;
  ketqua: string;
  ngaynhanxet: string;
  ten_nguoi_phan_bien: string;
}

interface Paper {
  id: number;
  title: string;
  date: string;
  status: string;
  conference?: string;
  reviews?: number;
}

export default function PaperCard({ paper }: { paper: Paper }) {
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const viewPaperReviews = async () => {
    setLoadingReviews(true);
    setShowReviewsModal(true);

    try {
      const reviewsData = await getReviewsByPaper(paper.id);
      console.log("Reviews data for paper:", reviewsData);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  const closeReviewsModal = () => {
    setShowReviewsModal(false);
    setReviews([]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
        <div className='flex gap-7 flex-col'>
          <h3 className="text-lg font-semibold">Tiêu đề: {paper.title}</h3>
          <p className='text-sm'>Ngày nộp: {paper.date}</p>
          {paper.status && (
            <div className="flex items-center">
              {statusIcons[paper.status as keyof typeof statusIcons]}
              {/* <span className="ml-2 text-sm">{paper.status}</span> */}
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          {/* <Link 
            href={`/author/papers/${paper.id}`}
            className="px-3 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
          >
            Chi tiết
          </Link> */}
          <button 
            onClick={viewPaperReviews}
            className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
          >
            Xem kết quả phản biện
          </button>
        </div>
      </div>

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Kết quả phản biện: {paper.title}
              </h3>
              <button 
                onClick={closeReviewsModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Đóng</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {loadingReviews ? (
                <p className="text-center text-gray-500">Đang tải kết quả phản biện...</p>
              ) : reviews.length === 0 ? (
                <p className="text-center text-red-500">Chưa có kết quả phản biện nào</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.maphieuncx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-medium text-gray-900">
                          Phiếu nhận xét #{review.maphieuncx}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Ngày nhận xét: {moment(review.ngaynhanxet).format('DD/MM/YYYY HH:mm:ss')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium text-gray-700">Người nhận xét:</span> 
                          <span className="text-gray-900 font-semibold ml-2">{review.ten_nguoi_phan_bien}</span>
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">Nội dung:</span> 
                          <span className="text-gray-900 font-semibold ml-2">{review.noidung}</span>
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">Kết quả:</span> 
                          <span className={`font-semibold ml-2 ${
                            review.ketqua === 'Chấp nhận' ? 'text-green-600' : 
                            review.ketqua === 'Từ chối' ? 'text-red-600' : 
                            'text-yellow-600'
                          }`}>
                            {review.ketqua}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeReviewsModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}