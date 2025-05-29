export default function StatCard({
  title,
  value,
  icon
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
          {icon}
        </div>
      </div>
    </div>
  )
}