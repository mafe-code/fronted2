
function StatCard({ title, total }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-1 border border-gray-100">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <span className="text-3xl font-bold text-gray-800">{total}</span>
    </div>
  )
}

export default StatCard