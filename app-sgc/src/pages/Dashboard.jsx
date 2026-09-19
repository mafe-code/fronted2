import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { getStudents } from '../services/studentService';
import { supabase } from '../config/supabase'; 
import Footer from '../components/Footer';

function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        // 1. Obtener la lista real desde Spring Boot y contar elementos
        const studentsData = await getStudents();
        const studentCount = Array.isArray(studentsData) ? studentsData.length : 0;

        // 2. Contar cursos (se mantiene temporalmente desde Supabase)
        const { count: courseCount } = await supabase
          .from('course')
          .select('*', { count: 'exact', head: true });

        // 3. Contar matrículas (se mantiene temporalmente desde Supabase)
        const { count: enrollmentCount } = await supabase
          .from('enrollment')
          .select('*', { count: 'exact', head: true });

        setCounts({
          students: studentCount,
          courses: courseCount || 0,
          enrollments: enrollmentCount || 0,
        });
      } catch (error) {
        console.error("Error al cargar datos del Dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="p-6 flex flex-col justify-between min-h-[calc(100vh-2rem)]">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Bienvenido al Sistema de Gestión de Cursos
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <StatCard 
            title="Students" 
            total={loading ? "..." : counts.students} 
          />
          <StatCard 
            title="Courses" 
            total={loading ? "..." : counts.courses} 
          />
          <StatCard 
            title="Enrollments" 
            total={loading ? "..." : counts.enrollments} 
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;