"use client";
import { useEffect, useState } from 'react'
import { FileTextIcon, ClockIcon, CheckCircleIcon, MessageSquareIcon } from '@/components/icons'
import StatCard from '@/components/author/StatCard'
import { Article } from '@/types/article'

export default function AuthorDashboard() {
  const [papers, setPapers] = useState<Article[]>([]);

  useEffect(() => {
    const authorId = localStorage.getItem("userId");
    if (!authorId) {
      console.warn("No authorId found in localStorage");
      return;
    }

    const fetchPapers = async () => {
      try {
        const res = await fetch(`/api/papers/author/${authorId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        if (Array.isArray(data.data)) {
          setPapers(data.data);
        } else {
          console.error("API returned data not array:", data);
          setPapers([]);
        }
      } catch (err) {
        console.error('Error fetching papers:', err);
        setPapers([]);
      }
    }

    fetchPapers();
  }, []);

  const stats = [
    { title: "Bài đã nộp", value: papers.length, icon: <FileTextIcon className="w-6 h-6" /> },
    { title: "Đang phản biện", value: 2, icon: <ClockIcon className="w-6 h-6" /> },
    { title: "Đã chấp nhận", value: 3, icon: <CheckCircleIcon className="w-6 h-6" /> },
    { title: "Phản biện cần xem", value: 1, icon: <MessageSquareIcon className="w-6 h-6" /> }
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
        {papers.length > 0 ? (
          <ul className="space-y-3">
            {papers.map((paper, index) => (
              <li key={index} className="border-b pb-3">
                <p className="text-gray-800 font-medium">{paper.tenbaibao}</p>
                <p className="text-sm text-gray-500">Lĩnh vực: {paper.linhvuc}</p>
                <p className="text-sm text-gray-400">Tóm tắt: {paper.tomtat}</p>
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
