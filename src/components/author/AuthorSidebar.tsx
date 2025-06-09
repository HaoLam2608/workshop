'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FileTextIcon, 
  UploadIcon, 
  ListIcon, 
  UserIcon, 
  LogOutIcon 
} from '@/components/icons'

export default function AuthorSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Quản lý bài báo',
      icon: <FileTextIcon className="w-5 h-5" />,
      href: '/author/dashboard'
    },
    {
      name: 'Nộp bài mới',
      icon: <UploadIcon className="w-5 h-5" />,
      href: '/author/papers/new'
    },
    {
      name: 'Bài đã nộp',
      icon: <ListIcon className="w-5 h-5" />,
      href: '/author/papers'
    },
    {
      name: 'Thông tin cá nhân',
      icon: <UserIcon className="w-5 h-5" />,
      href: '/author/profile'
    }
  ]

  return (
    <aside className="top-0 left-0 h-full w-72 bg-white shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-700">Tác giả</h1>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
  href={item.href}
  className={`flex items-center p-3 rounded-lg transition ${
    pathname === item.href
      ? 'bg-indigo-50 text-indigo-700 font-medium'
      : 'text-black hover:bg-gray-100'
  }`}
>
  <span className="mr-3">{item.icon}</span>
  {item.name}
</Link>

            </li>
          ))}
        </ul>
      </nav>
      
      {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition">
          <LogOutIcon className="w-5 h-5 mr-3" />
          Đăng xuất
        </button>
      </div> */}
    </aside>
  )
}