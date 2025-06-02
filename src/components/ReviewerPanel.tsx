'use client';

import { useState } from 'react';

export default function ReviewerPanel() {
  const [papers, setPapers] = useState([
    { 
      id: 1, 
      title: 'Bài 1', 
      deadline: '2025-06-10',
      authors: 'Nguyễn Văn A, Trần Thị B',
      field: 'Trí tuệ nhân tạo',
      status: 'Chưa đánh giá',
      reviewForm: {
        scientificValue: '',
        novelty: '',
        researchResults: '',
        conclusion: '',
        finalDecision: ''
      }
    },
    { 
      id: 2, 
      title: 'Bài 2', 
      deadline: '2025-06-12',
      authors: 'Lê Văn C, Phạm Thị D',
      field: 'Hệ thống thông tin',
      status: 'Đang đánh giá',
      reviewForm: {
        scientificValue: 'Tốt',
        novelty: 'Khá',
        researchResults: '',
        conclusion: '',
        finalDecision: ''
      }
    },
  ]);

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    scientificValue: '',
    novelty: '',
    researchResults: '',
    conclusion: '',
    finalDecision: ''
  });

  const handleInputChange = (field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitReview = (paperId) => {
    const updatedPapers = papers.map(paper => 
      paper.id === paperId 
        ? { 
            ...paper, 
            status: 'Đã đánh giá',
            reviewForm: { ...reviewForm }
          } 
        : paper
    );
    
    setPapers(updatedPapers);
    setSelectedPaper(null);
    alert('Đã gửi đánh giá thành công!');
  };

  const downloadPaper = (paperId) => {
    alert(`Tải xuống bài báo ${paperId}`);
  };

  const downloadReviewForm = () => {
    alert('Tải xuống mẫu phiếu đánh giá');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Hệ thống quản lý hội thảo - Phản biện</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Xin chào, GS. Trần Văn X</span>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md text-sm">Đăng xuất</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Tổng số bài nhận</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{papers.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Bài chờ đánh giá</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {papers.filter(p => p.status.includes('chưa') || p.status.includes('đang')).length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Bài đã đánh giá</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {papers.filter(p => p.status.includes('Đã')).length}
            </p>
          </div>
        </div>

        {/* Papers List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Danh sách bài báo cần phản biện</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {papers.map((paper) => (
              <div key={paper.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-600 truncate">{paper.title}</p>
                    <p className="text-sm text-gray-500 truncate">{paper.authors}</p>
                    <p className="text-sm text-gray-500">Lĩnh vực: {paper.field}</p>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      paper.status.includes('chưa') ? 'bg-yellow-100 text-yellow-800' : 
                      paper.status.includes('đang') ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {paper.status}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">Hạn chót: {paper.deadline}</span>
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
                        setReviewForm(paper.reviewForm);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                    >
                      Đánh giá
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Modal */}
        {selectedPaper && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Đánh giá bài báo: {selectedPaper.title}
                </h3>
                <button 
                  onClick={() => setSelectedPaper(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Đóng</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Thông tin bài báo</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><span className="text-gray-600">Tác giả:</span> {selectedPaper.authors}</p>
                      <p><span className="text-gray-600">Lĩnh vực:</span> {selectedPaper.field}</p>
                    </div>
                    <div>
                      <p><span className="text-gray-600">Hạn chót:</span> {selectedPaper.deadline}</p>
                      <p><span className="text-gray-600">Trạng thái:</span> {selectedPaper.status}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button 
                      onClick={() => downloadPaper(selectedPaper.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    >
                      Tải bài báo
                    </button>
                    <button 
                      onClick={downloadReviewForm}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    >
                      Tải mẫu phiếu đánh giá
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hàm lượng khoa học
                    </label>
                    <textarea
                      value={reviewForm.scientificValue}
                      onChange={(e) => handleInputChange('scientificValue', e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhận xét về hàm lượng khoa học của bài báo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tính mới
                    </label>
                    <textarea
                      value={reviewForm.novelty}
                      onChange={(e) => handleInputChange('novelty', e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhận xét về tính mới của nghiên cứu..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kết quả nghiên cứu
                    </label>
                    <textarea
                      value={reviewForm.researchResults}
                      onChange={(e) => handleInputChange('researchResults', e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhận xét về kết quả nghiên cứu..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kết luận
                    </label>
                    <textarea
                      value={reviewForm.conclusion}
                      onChange={(e) => handleInputChange('conclusion', e.target.value)}
                      className="w-full h-20 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhận xét về kết luận của bài báo..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quyết định cuối cùng
                    </label>
                    <select
                      value={reviewForm.finalDecision}
                      onChange={(e) => handleInputChange('finalDecision', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- Chọn quyết định --</option>
                      <option value="Chấp nhận">Chấp nhận</option>
                      <option value="Từ chối">Từ chối</option>
                      <option value="Yêu cầu chỉnh sửa">Yêu cầu chỉnh sửa</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={() => submitReview(selectedPaper.id)}
                    disabled={!reviewForm.finalDecision}
                    className={`px-4 py-2 rounded-md ${
                      reviewForm.finalDecision ? 
                      'bg-blue-500 text-white hover:bg-blue-600' : 
                      'bg-gray-300 text-gray-500 cursor-not-allowed'
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