import StatCard from '../components/StatCard'

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mt-1">
        Bienvenido al Sistema de Gestión de Cursos
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <StatCard title="Students" total="50" />
        <StatCard title="Courses" total="12" />
        <StatCard title="Enrollments" total="145" />
      </div>
    </div>
  )
}

export default Dashboard