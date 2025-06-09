'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaperPlaneIcon, PlusIcon, TrashIcon } from '@/components/icons'
import { toast } from 'react-toastify'
import { getAllConferences, getAuthorById } from '@/axios/api'
import { Conference } from '@/types/conference'
import { Author } from '@/types/article'

export default function NewPaperPage() {
  const router = useRouter()
  const [author, setAuthor] = useState<Author | null>(null)
  const [conferences, setConferences] = useState<Conference[]>([])
  const [authors, setAuthors] = useState<
    { id: number; name: string; email: string; affiliation: string; role: string }[]
  >([])

  const [title, setTitle] = useState('')
  const [field, setField] = useState('')
  const [abstract, setAbstract] = useState('')
  const [keywords, setKeywords] = useState('')
  const [conferenceId, setConferenceId] = useState('')
  const [contactAuthorIndex, setContactAuthorIndex] = useState('0')
  const [contactPhone, setContactPhone] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorId = localStorage.getItem('userId')
      if (!authorId) {
        console.error('Không tìm thấy authorId trong localStorage')
        return
      }

      try {
        const response = await getAuthorById(Number(authorId))
        const fetchedAuthor = response
        setAuthor(fetchedAuthor)

        setAuthors([
          {
            id: fetchedAuthor?.id || 0,
            name: fetchedAuthor?.hoten || '',
            email: fetchedAuthor?.email || '',
            affiliation: fetchedAuthor?.coquan || '',
            role: 'Tác giả chính',
          },
        ])
      } catch (error) {
        console.error('Lỗi khi lấy thông tin tác giả:', error)
      }
    }

    fetchAuthor()
  }, [])

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const data = await getAllConferences()
        setConferences(data)
      } catch (err) {
        console.error('Error fetching conferences:', err)
      }
    }

    fetchConferences()
  }, [])

  const addAuthor = () => {
    setAuthors([...authors, { id: 0, name: '', email: '', affiliation: '', role: '' }])
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
      formData.append('conferenceId', conferenceId)
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

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message || 'Lỗi khi gửi bài báo')
        throw new Error(data.message || 'Lỗi khi gửi bài báo')
      }

      toast.success('Nộp bài thành công')
      router.push('/author/papers')
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
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Chọn hội thảo</label>
                <select
                  value={conferenceId}
                  onChange={(e) => setConferenceId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">-- Chọn hội thảo --</option>
                  {conferences.map((conference) => (
                    <option key={conference.maht} value={conference.maht}>
                      {conference.tenhoithao}
                    </option>
                  ))}
                </select>
              </div>

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
                  <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                  <option value="Kỹ thuật">Kỹ thuật</option>
                  <option value="Khoa học tự nhiên">Khoa học tự nhiên</option>
                  <option value="Kinh tế">Kinh tế</option>
                  <option value="Giáo dục">Giáo dục</option>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Số điện thoại liên hệ</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Chọn tệp PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Danh sách tác giả */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">Thông tin tác giả</h2>
            {authors.map((author, index) => (
              <div key={index} className="mb-6 border p-4 rounded-lg">
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={author.name}
                    onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                    className="border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={author.email}
                    onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                    className="border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Cơ quan"
                    value={author.affiliation}
                    onChange={(e) => handleAuthorChange(index, 'affiliation', e.target.value)}
                    className="border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Vai trò"
                    value={author.role}
                    onChange={(e) => handleAuthorChange(index, 'role', e.target.value)}
                    className="border px-3 py-2 rounded"
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAuthor}
              className="flex items-center text-indigo-600 hover:underline"
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Thêm tác giả
            </button>

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
      onChange={(e) => {
        const value = e.target.value;
        // Chỉ cho phép nhập số
        if (/^\d*$/.test(value)) {
          setContactPhone(value);
        }
      }}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
        contactPhone && !/^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$/.test(contactPhone)
          ? 'border-red-500'
          : 'border-gray-300'
      }`}
      required
      maxLength={11} // Giới hạn độ dài số VN
      placeholder="Ví dụ: 0912345678"
    />
    {contactPhone && !/^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$/.test(contactPhone) && (
      <p className="mt-1 text-sm text-red-600">Số điện thoại không hợp lệ</p>
    )}
  </div>
</div>
          </div>

          {/* Nút nộp */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
            >
              <PaperPlaneIcon className="w-5 h-5" />
              {isSubmitting ? 'Đang gửi...' : 'Nộp bài'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
