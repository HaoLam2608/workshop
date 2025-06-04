'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useState as useClientState } from 'react'

const navLinks = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Giới thiệu hệ thống', href: '/about' },
  { name: 'Danh sách hội thảo', href: '/conferences' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useClientState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const containerClass = isMounted && pathname === '/author/dashboard'
    ? 'max-w-3xl'
    : 'max-w-7xl'

  return (
    <header className={` bg-indigo-700 text-white shadow-lg`}>
      <div className={`container mx-auto px-4 py-4`}>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            HộiThảo<span className="text-indigo-200">Online</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-indigo-200 transition ${pathname === link.href ? 'font-bold underline' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Info - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {typeof window !== 'undefined' && localStorage.getItem('hoten') ? (
              <>
                <span>
                  Xin chào, <strong>{localStorage.getItem('hoten')}</strong>
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem('hoten')
                    localStorage.removeItem('userId')
                    window.location.href = '/login'
                  }}
                  className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-indigo-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-indigo-200 transition ${pathname === link.href ? 'font-bold underline' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-indigo-600 flex flex-col space-y-3">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg hover:bg-indigo-600 transition text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
