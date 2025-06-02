'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [papers, setPapers] = useState([
    { id: 1, title: 'Bài 1', status: 'Đang chờ phân công', date: '2025-06-10', authors: 'Nguyễn Văn A, Trần Thị B', field: 'Trí tuệ nhân tạo' },
    { id: 2, title: 'Bài 2', status: 'Đã giao cho 2 phản biện', date: '2025-06-12', authors: 'Lê Văn C, Phạm Thị D', field: 'Hệ thống thông tin' },
    { id: 3, title: 'Bài 3', status: 'Chờ đánh giá', date: '2025-06-15', authors: 'Hoàng Văn E', field: 'An toàn thông tin' },
  ]);

  const [reviewers, setReviewers] = useState([
    { id: 1, name: 'GS. Trần Văn X', field: 'Trí tuệ nhân tạo', assignedPapers: 2 },
    { id: 2, name: 'PGS. Nguyễn Thị Y', field: 'Hệ thống thông tin', assignedPapers: 1 },
    { id: 3, name: 'TS. Lê Văn Z', field: 'An toàn thông tin', assignedPapers: 0 },
  ]);

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  const assignReviewers = () => {
    if (selectedReviewers.length !== 2) {
      alert('Vui lòng chọn đúng 2 phản biện cho mỗi bài báo');
      return;
    }
    
    const updatedPapers = papers.map(paper => 
      paper.id === selectedPaper.id 
        ? { ...paper, status: `Đã giao cho ${selectedReviewers.length} phản biện` } 
        : paper
    );
    
    setPapers(updatedPapers);
    setAssigning(false);
    setSelectedPaper(null);
    setSelectedReviewers([]);
    alert('Phân công phản biện thành công!');
  };

  const viewPaperDetails = (paper) => {
    setSelectedPaper(paper);
  };

  const toggleReviewerSelection = (reviewer) => {
    if (selectedReviewers.some(r => r.id === reviewer.id)) {
      setSelectedReviewers(selectedReviewers.filter(r => r.id !== reviewer.id));
    } else {
      if (selectedReviewers.length < 2) {
        setSelectedReviewers([...selectedReviewers, reviewer]);
      } else {
        alert('Mỗi bài báo chỉ có thể phân công tối đa 2 phản biện');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Hệ thống quản lý hội thảo - Ban tổ chức</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Xin chào, Admin</span>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md text-sm">Đăng xuất</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Conference Info */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hội thảo Khoa học Công nghệ Thông tin 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Thời gian</h3>
              <p className="text-gray-600">15-17/11/2025</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Địa điểm</h3>
              <p className="text-gray-600">Trường Đại học XYZ</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Trạng thái</h3>
              <p className="text-green-600 font-medium">Đang nhận bài</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Tổng số bài báo</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{papers.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Bài chờ phân công</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {papers.filter(p => p.status.includes('chờ phân công')).length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Phản biện đã phân công</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {papers.filter(p => p.status.includes('giao cho')).length}
            </p>
          </div>
        </div>

        {/* Papers List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Danh sách bài báo</h3>
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
                      paper.status.includes('chờ phân công') ? 'bg-yellow-100 text-yellow-800' : 
                      paper.status.includes('giao cho') ? 'bg-green-100 text-green-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {paper.status}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">Ngày nộp: {paper.date}</span>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button 
                      onClick={() => viewPaperDetails(paper)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    >
                      Chi tiết
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedPaper(paper);
                        setAssigning(true);
                      }}
                      disabled={!paper.status.includes('chờ phân công')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        paper.status.includes('chờ phân công') ? 
                        'bg-blue-500 text-white hover:bg-blue-600' : 
                        'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Phân công
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviewer Assignment Modal */}
        {assigning && selectedPaper && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Phân công phản biện cho bài: {selectedPaper.title}
                </h3>
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-700 mb-4">Danh sách phản biện phù hợp</h4>
                <div className="space-y-3 mb-6">
                  {reviewers
                    .filter(r => r.field === selectedPaper.field && r.assignedPapers < 4)
                    .map(reviewer => (
                      <div key={reviewer.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium">{reviewer.name}</p>
                          <p className="text-sm text-gray-600">Lĩnh vực: {reviewer.field}</p>
                          <p className="text-sm text-gray-600">Số bài đã nhận: {reviewer.assignedPapers}/4</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedReviewers.some(r => r.id === reviewer.id)}
                          onChange={() => toggleReviewerSelection(reviewer)}
                          className="h-5 w-5 text-blue-600 rounded"
                        />
                      </div>
                    ))
                  }
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setAssigning(false);
                      setSelectedReviewers([]);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={assignReviewers}
                    disabled={selectedReviewers.length !== 2}
                    className={`px-4 py-2 rounded-md ${
                      selectedReviewers.length === 2 ? 
                      'bg-blue-500 text-white hover:bg-blue-600' : 
                      'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Xác nhận phân công
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paper Details Modal */}
        {selectedPaper && !assigning && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Chi tiết bài báo</h3>
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
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{selectedPaper.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">ID: {selectedPaper.id}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Thông tin chung</h5>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">Tác giả:</span> {selectedPaper.authors}</p>
                      <p><span className="text-gray-600">Lĩnh vực:</span> {selectedPaper.field}</p>
                      <p><span className="text-gray-600">Ngày nộp:</span> {selectedPaper.date}</p>
                      <p><span className="text-gray-600">Trạng thái:</span> {selectedPaper.status}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Tác vụ</h5>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Tải xuống bài báo
                      </button>
                      <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Xem kết quả phản biện
                      </button>
                      <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                        Kiểm tra chỉnh sửa
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="font-medium text-gray-700 mb-2">Tóm tắt</h5>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700">Nội dung tóm tắt bài báo sẽ được hiển thị tại đây...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}