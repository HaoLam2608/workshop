'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaperPlaneIcon, PlusIcon, TrashIcon } from '@/components/icons'
import {toast} from "react-toastify"
export default function NewPaperPage() {
  const router = useRouter()
  
  const [title, setTitle] = useState('')
  const [field, setField] = useState('')
  const [abstract, setAbstract] = useState('')
  const [keywords, setKeywords] = useState('')
  const [contactAuthorIndex, setContactAuthorIndex] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [authors, setAuthors] = useState([
    { id: '', affiliation: '', role: '' },
  ])

  const addAuthor = () => {
    setAuthors([...authors, { id: '', affiliation: '', role: '' }])
  }

  const removeAuthor = (index: number) => {
    if (authors.length > 1) {
      const newAuthors = [...authors]
      newAuthors.splice(index, 1)
      setAuthors(newAuthors)
    }
  }

  const handleAuthorChange = (index: number, field: string, value: string) => {
    const newAuthors = [...authors]
    newAuthors[index][field as keyof typeof newAuthors[0]] = value
    setAuthors(newAuthors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!file) {
        alert('Vui lòng chọn tệp PDF.')
        return
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('field', field)
      formData.append('abstract', abstract)
      formData.append('keywords', keywords)
      formData.append('contactAuthorIndex', contactAuthorIndex)
      formData.append('contactPhone', contactPhone)
      formData.append('file', file)
      formData.append('authors', JSON.stringify(authors))

      const res = await fetch('/api/papers', {
        method: 'POST',
        body: formData,
      })

     const data = await res.json();
      console.log(data);
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.message || 'Lỗi khi gửi bài báo' )
        throw new Error(data.message || 'Lỗi khi gửi bài báo');
      }

      toast.success("Nộp bài thành công")
      router.push('/author/papers?success=true')
    } catch (error) {
      console.error('Lỗi khi nộp bài:', error)
      alert('Có lỗi xảy ra khi nộp bài.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="text-black max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Nộp bài báo mới</h1>
        <a href="/author" className="text-sm text-indigo-600 hover:text-indigo-800">
          ← Quay lại danh sách
        </a>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin bài báo */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin bài báo</h2>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Tên bài báo</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Lĩnh vực nghiên cứu</label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Chọn lĩnh vực</option>
                  <option value="it">Công nghệ thông tin</option>
                  <option value="engineering">Kỹ thuật</option>
                  <option value="science">Khoa học tự nhiên</option>
                  <option value="economics">Kinh tế</option>
                  <option value="education">Giáo dục</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Tóm tắt bài báo</label>
                <textarea
                  rows={5}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Từ khóa</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Ví dụ: AI, machine learning, deep learning</p>
              </div>
            </div>
          </div>

          {/* Danh sách tác giả */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin tác giả</h2>

            {authors.map((author, index) => (
              <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Tác giả {index + 1}</h3>
                  {authors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAuthor(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Họ và tên</label>
                    <input
                      type="text"
                      value={author.name}
                      onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Cơ quan</label>
                    <input
                      type="text"
                      value={author.affiliation}
                      onChange={(e) => handleAuthorChange(index, 'affiliation', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Email</label>
                    <input
                      type="email"
                      value={author.email}
                      onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAuthor}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Thêm tác giả
            </button>
          </div>

          {/* Tác giả liên hệ */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">Tác giả liên hệ</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Chọn tác giả liên hệ</label>
                <select
                  value={contactAuthorIndex}
                  onChange={(e) => setContactAuthorIndex(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Chọn tác giả</option>
                  {authors.map((author, index) => (
                    <option key={index} value={index}>
                      {author.name || `Tác giả ${index + 1}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Upload file */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Tệp bài báo</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Upload bài báo (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Chỉ chấp nhận file PDF, kích thước tối đa 10MB</p>
            </div>
          </div>

          {/* Nút submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Đang xử lý...' : <>
                <PaperPlaneIcon className="w-5 h-5 mr-2" />
                Nộp bài
              </>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
