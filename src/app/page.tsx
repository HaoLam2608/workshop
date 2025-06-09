import HeroSection from '@/components/HeroSection'
import ConferenceList from '@/components/ConferenceList'
import { UserIcon } from '@/components/icons'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConferenceList />
      <div className="fixed bottom-4 right-4">
        {/* <Link 
          href="/author/dashboard" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition flex items-center"
        >
          <UserIcon className="w-5 h-5 mr-2" />
          Truy cập trang Tác giả
        </Link> */}
      </div>
    </>
  )
}