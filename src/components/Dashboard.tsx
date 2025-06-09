'use client';

import { useState, useEffect } from 'react';
import { getConferenceById, getArticlesByConference, getAvailableReviewers, assignReviewers, getConferencesByOrganizer, getReviewsByPaper } from '@/axios/api';
import { Conference } from '@/types/conference';
import { Article } from '@/types/article';
import { Reviewer } from '@/types/reviewer';
import moment from 'moment';

export default function Dashboard() {
  const [papers, setPapers] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [conference, setConference] = useState<Conference | null>(null);
  const [loadingConference, setLoadingConference] = useState(true);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [loadingReviewers, setLoadingReviewers] = useState(true);
  const [assigningError, setAssigningError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const mapbtc = parseInt(localStorage.getItem('userId') || '0');
      console.log("User ID from localStorage:", mapbtc);
      const conf1Data = await getConferencesByOrganizer(mapbtc);
      const maht = conf1Data.length > 0 ? conf1Data[0].maht : null;
      console.log("Selected maht:", maht);

      const confData = await getConferenceById(maht);
      console.log("Conference data:", confData);
      setConference(confData);

      if (confData && confData.maht) {
        const articles = await getArticlesByConference(confData.maht);
        console.log("Articles data:", articles);

        // Kiểm tra phiếu nhận xét cho từng bài báo
        const mappedPapers = await Promise.all(articles.map(async (article) => {
          const reviewsData = await getReviewsByPaper(article.mabaibao);
          const hasReviews = reviewsData.length > 0;

          return {
            id: article.mabaibao,
            title: article.tenbaibao,
            status: hasReviews ? 'Đã phản biện' : (article.status === 'dang_cho_phan_cong' ? 'Đang chờ phân công' : 'Đã giao cho 2 phản biện'),
            date: moment().format('YYYY-MM-DD'),
            authors: article.tacgia.map((author) => author.hoten).join(', '),
            field: article.linhvuc || 'Chưa xác định',
            tomtat: article.tomtat || 'Chưa có tóm tắt',
          };
        }));

        setPapers(mappedPapers);
      }
      setLoadingConference(false);
      setLoadingPapers(false);

      const reviewerData = await getAvailableReviewers();
      console.log("Reviewer data:", reviewerData);
      const mappedReviewers = reviewerData.map((reviewer) => ({
        id: reviewer.id,
        name: reviewer.hoten,
        field: reviewer.linhvuc || 'Chưa xác định',
        assignedPapers: reviewer.assignedPapers
      }));
      setReviewers(mappedReviewers);
      setLoadingReviewers(false);
    };
    fetchData();
  }, []);

  const assignReviewersHandler = async () => {
    if (selectedReviewers.length !== 2) {
      alert('Vui lòng chọn đúng 2 phản biện cho mỗi bài báo');
      return;
    }

    try {
      setAssigningError(null);
      const reviewerIds = selectedReviewers.map(reviewer => reviewer.id);
      const mabaibao = selectedPaper.id;
      const mapbtc = conference?.mabtc;

      if (!mapbtc) {
        throw new Error('Không tìm thấy mã ban tổ chức');
      }

      await assignReviewers(mabaibao, reviewerIds, mapbtc);

      const updatedPapers = papers.map(paper =>
        paper.id === selectedPaper.id
          ? { ...paper, status: 'Đã giao cho 2 phản biện' }
          : paper
      );
      setPapers(updatedPapers);

      const updatedReviewers = reviewers.map(reviewer => {
        if (reviewerIds.includes(reviewer.id)) {
          return { ...reviewer, assignedPapers: reviewer.assignedPapers + 1 };
        }
        return reviewer;
      });
      setReviewers(updatedReviewers);

      setAssigning(false);
      setSelectedPaper(null);
      setSelectedReviewers([]);
      alert('Phân công phản biện thành công!');

      const reviewerData = await getAvailableReviewers();
      const mappedReviewers = reviewerData.map((reviewer) => ({
        id: reviewer.id,
        name: reviewer.hoten,
        field: reviewer.linhvuc || 'Chưa xác định',
        assignedPapers: reviewer.assignedPapers
      }));
      setReviewers(mappedReviewers);
    } catch (error) {
      console.error('Error assigning reviewers:', error);
      setAssigningError(error.message || 'Lỗi khi phân công phản biện');
    }
  };

  const viewPaperDetails = (paper) => {
    setSelectedPaper(paper);
  };

  const viewPaperReviews = async (paper) => {
    setSelectedPaper(paper);
    setLoadingReviews(true);
    setShowReviewsModal(true);

    try {
      const reviewsData = await getReviewsByPaper(paper.id);
      console.log("Reviews data for paper:", reviewsData);
      setReviews(reviewsData);

      // Cập nhật trạng thái bài báo nếu có phiếu nhận xét
      if (reviewsData.length > 0) {
        const updatedPapers = papers.map(p =>
          p.id === paper.id ? { ...p, status: 'Đã phản biện' } : p
        );
        setPapers(updatedPapers);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Conference Info */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          {loadingConference ? (
            <p className="text-center text-gray-500">Đang tải thông tin hội thảo...</p>
          ) : conference ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{conference.tenhoithao}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Thời gian</h3>
                  <p className="text-gray-600">{moment(conference.ngaytochuc).format('DD/MM/YYYY')} {conference.thoigian}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Địa điểm</h3>
                  <p className="text-gray-600">{conference.diachi}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Hình thức</h3>
                  <p className="text-green-600 font-medium">{conference.hinhthuctochuc}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">Không tìm thấy thông tin hội thảo</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Tổng số bài báo</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{loadingPapers ? '...' : papers.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Bài chờ phân công</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {loadingPapers ? '...' : papers.filter(p => p.status.includes('chờ phân công')).length}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Phản biện đã phân công</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {loadingPapers ? '...' : papers.filter(p => p.status.includes('giao cho')).length}
            </p>
          </div>
        </div>

        {/* Papers List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Danh sách bài báo</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {loadingPapers ? (
              <p className="px-6 py-4 text-gray-500">Đang tải danh sách bài báo...</p>
            ) : papers.length === 0 ? (
              <p className="px-6 py-4 text-red-500">Không có bài báo nào trong hội thảo này</p>
            ) : (
              papers.map((paper) => (
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
                        paper.status.includes('Đã phản biện') ? 'bg-purple-100 text-purple-800' :
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
              ))
            )}
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
                {loadingReviewers ? (
                  <p className="text-gray-500">Đang tải danh sách phản biện...</p>
                ) : reviewers.length === 0 ? (
                  <p className="text-red-500">Không có phản biện nào phù hợp</p>
                ) : (
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
                )}
                {assigningError && (
                  <p className="text-red-500 mb-4">{assigningError}</p>
                )}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setAssigning(false);
                      setSelectedReviewers([]);
                      setAssigningError(null);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    onClick={assignReviewersHandler}
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
        {selectedPaper && !assigning && !showReviewsModal && (
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
                    <h5 className="font-medium text-gray-900 mb-2">Thông tin chung</h5>
                    <div className="space-y-2">
                      <p><span className="text-gray-800">Tác giả:</span> <span className="text-gray-900 font-semibold">{selectedPaper.authors}</span></p>
                      <p><span className="text-gray-800">Lĩnh vực:</span> <span className="text-gray-900 font-semibold">{selectedPaper.field}</span></p>
                      <p><span className="text-gray-800">Ngày nộp:</span> <span className="text-gray-900 font-semibold">{selectedPaper.date}</span></p>
                      <p><span className="text-gray-800">Trạng thái:</span> <span className="text-gray-900 font-semibold">{selectedPaper.status}</span></p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Tác vụ</h5>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Tải xuống bài báo
                      </button>
                      <button 
                        onClick={() => viewPaperReviews(selectedPaper)}
                        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
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
                    <p className="text-gray-700">{selectedPaper.tomtat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Modal */}
        {showReviewsModal && selectedPaper && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Kết quả phản biện: {selectedPaper.title}</h3>
                <button 
                  onClick={() => {
                    setShowReviewsModal(false);
                    setReviews([]);
                  }}
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
                          <h4 className="text-md font-medium text-gray-900">Phiếu nhận xét #{review.maphieuncx}</h4>
                          <p className="text-sm text-gray-500">
                            Ngày nhận xét: {moment(review.ngaynhanxet).format('DD/MM/YYYY HH:mm:ss')}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p><span className="font-medium text-gray-700">Người nhận xét:</span> <span className="text-gray-900 font-semibold">{review.ten_nguoi_phan_bien}</span></p>
                          <p><span className="font-medium text-gray-700">Nội dung:</span> <span className="text-gray-900 font-semibold">{review.noidung}</span></p>
                          <p><span className="font-medium text-gray-700">Kết quả:</span> <span className={`font-semibold ${review.ketqua === 'Chấp nhận' ? 'text-green-600' : review.ketqua === 'Từ chối' ? 'text-red-600' : 'text-yellow-600'}`}>{review.ketqua}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setShowReviewsModal(false);
                      setReviews([]);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Đóng
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