'use client'

import { useEffect, useState } from 'react'
import { getAllConferences } from '@/axios/api'
import { Conference } from '@/types/conference'
import Link from 'next/link'
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import moment from 'moment';

export default function ConferenceList() {
  const [conferences, setConferences] = useState<Conference[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllConferences()
      setConferences(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Danh sách hội thảo đang mở
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conferences.map((conference) => (
              <div 
                key={conference.maht} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Hình ảnh hội thảo</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{conference.tenhoithao}</h3>
                  <p className="text-gray-600 mb-4">{conference.tintuc}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-500">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      <span>{moment(conference.ngaytochuc).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>{conference.thoigian}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{conference.diachi ?? 'Chưa cập nhật'}</span>
                    </div>
                  </div>

                  <Link
                    href={`/conferences/${conference.maht}`}
                    className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
