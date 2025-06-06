'use client';

import { getAssignedPapers, createReview } from '@/axios/api';
import { useState, useEffect } from 'react';

interface Paper {
  id: number;
  title: string;
  authors: string;
  field: string;
  deadline: string;
  status: string;
  reviewForm?: ReviewForm;
}

interface ReviewForm {
  scientificValue: string;
  novelty: string;
  researchResults: string;
  conclusion: string;
  finalDecision: string;
}



export default function ReviewerPanel() {
  const reviewerId = 5; // TODO: Lấy động từ context/auth, ví dụ: useAuth()?.user?.id
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    scientificValue: '',
    novelty: '',
    researchResults: '',
    conclusion: '',
    finalDecision: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const data = await getAssignedPapers(reviewerId);
        console.log('API RESPONSE for getAssignedPapers:', data);
        setPapers(data);
        setError(null);
      } catch (err) {
        console.error('Lỗi khi gọi API:', err);
        setError('Không thể tải danh sách bài báo. Vui lòng thử lại.');
      }
    };
    fetchPapers();
  }, [reviewerId]);

  // Xử lý ESC và click ngoài modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPaper(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleInputChange = (field: keyof ReviewForm, value: string) => {
    setReviewForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return Object.values(reviewForm).every(value => value.trim() !== '');
  };

  const submitReview = async (paperId: number) => {
    if (!isFormValid()) {
      alert('Vui lòng điền đầy đủ các trường.');
      return;
    }


    setIsSubmitting(true);
    try {
      await createReview(reviewerId, paperId, reviewForm);

      const updatedPapers = papers.map((paper) =>
        paper.id === paperId
          ? {
            ...paper,
            status: 'Đã đánh giá',
            reviewForm: { ...reviewForm },
          }
          : paper
      );

      setPapers(updatedPapers);
      setSelectedPaper(null);
      alert('Đã gửi đánh giá thành công!');
    } catch (error) {
      alert('Gửi đánh giá thất bại, vui lòng thử lại.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPaper = (paperId: number) => {
    // TODO: Triển khai API tải file thực tế
    alert(`Tải xuống bài báo ${paperId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Hệ thống quản lý hội thảo - Phản biện</h1>

        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {papers.length === 0 && !error ? (
          <p className="text-center text-gray-500">Chưa có bài báo nào được phân công.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatsCard label="Tổng số bài nhận" value={papers.length} color="blue" />
              <StatsCard
                label="Bài chờ đánh giá"
                value={papers.filter((p) => p.status.includes('Chưa') || p.status.includes('dangcho')).length}
                color="yellow"
              />
              <StatsCard
                label="Bài đã đánh giá"
                value={papers.filter((p) => p.status.includes('Đã')).length}
                color="green"
              />
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Danh sách bài báo cần phản biện</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {papers.map((paper) => (
                  <div key={paper.id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-600 truncate">{paper.title}</p>
                      <p className="text-sm text-gray-500 truncate">{paper.authors}</p>
                      <p className="text-sm text-gray-500">Lĩnh vực: {paper.field}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${paper.status.includes('Chưa')
                          ? 'bg-yellow-100 text-yellow-800'
                          : paper.status.includes('Đang')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                          }`}
                      >
                        {paper.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Hạn chót: {paper.deadline}</p>
                    </div>
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => downloadPaper(paper.id)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                      >
                        Tải bài
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPaper(paper);
                          setReviewForm(
                            paper.reviewForm || {
                              scientificValue: '',
                              novelty: '',
                              researchResults: '',
                              conclusion: '',
                              finalDecision: '',
                            }
                          );
                        }}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                      >
                        Đánh giá
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Review Modal */}
        {selectedPaper && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center p-4 z-50">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Đánh giá bài báo: {selectedPaper.title}</h3>
                <button onClick={() => setSelectedPaper(null)} className="text-gray-400 hover:text-gray-500">
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-medium text-black mb-3">Thông tin bài báo</h4>
                  <p className="text-black"><strong>Tác giả:</strong> {selectedPaper.authors}</p>
                  <p className="text-black"><strong>Lĩnh vực:</strong> {selectedPaper.field}</p>
                  <p className="text-black"><strong>Hạn chót:</strong> {selectedPaper.deadline}</p>
                </div>

                {['scientificValue', 'novelty', 'researchResults', 'conclusion'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                      {field === 'scientificValue'
                        ? 'Hàm lượng khoa học'
                        : field === 'novelty'
                          ? 'Tính mới'
                          : field === 'researchResults'
                            ? 'Kết quả nghiên cứu'
                            : 'Kết luận'}
                    </label>
                    <textarea
                      value={reviewForm[field as keyof ReviewForm]}
                      onChange={(e) => handleInputChange(field as keyof ReviewForm, e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded-md text-black placeholder-black/50 bg-white bg-opacity-70"
                      placeholder="Nhận xét..."
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quyết định cuối cùng</label>
                  <select
                    value={reviewForm.finalDecision}
                    onChange={(e) => handleInputChange('finalDecision', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md text-black bg-white bg-opacity-70"
                  >
                    <option value="">-- Chọn quyết định --</option>
                    <option value="Chấp nhận">Chấp nhận</option>
                    <option value="Từ chối">Từ chối</option>
                    <option value="Yêu cầu chỉnh sửa">Yêu cầu chỉnh sửa</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={() => submitReview(selectedPaper.id)}
                    disabled={!reviewForm.finalDecision}
                    className={`px-4 py-2 rounded-md ${reviewForm.finalDecision
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatsCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClass =
    color === 'blue'
      ? 'text-blue-600'
      : color === 'yellow'
        ? 'text-yellow-600'
        : 'text-green-600';
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900">{label}</h3>
      <p className={`mt-2 text-3xl font-bold ${colorClass}`}>{value}</p>
    </div>
  );
}