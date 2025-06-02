import AuthorSidebar from '@/components/author/AuthorSidebar'

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <AuthorSidebar />
      <div className="flex-1 p-8 ml-0">
        
        {children}
      </div>
    </div>
  )
}