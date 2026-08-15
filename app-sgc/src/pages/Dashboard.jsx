import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { supabase } from '../config/supabase'; // Asegúrate de que esta ruta apunte a tu archivo supabase.js

function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      // 1. Contar estudiantes
      const { count: studentCount } = await supabase
        .from('Student')
        .select('*', { count: 'exact', head: true });

      // 2. Contar cursos
      const { count: courseCount } = await supabase
        .from('course')
        .select('*', { count: 'exact', head: true });

      // 3. Contar matrículas
      const { count: enrollmentCount } = await supabase
        .from('enrollment')
        .select('*', { count: 'exact', head: true });

      // Imprimir resultados en consola para verificar
      console.log('✅ Datos traídos de Supabase:', {
        Student: studentCount,
        course: courseCount,
        enrollment: enrollmentCount,
      });

      setCounts({
        students: studentCount || 0,
        courses: courseCount || 0,
        enrollments: enrollmentCount || 0,
      });

      setLoading(false);
    }

    fetchCounts();
  }, []);

  return (
    <div className="p-6">
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
  );
}

export default Dashboard;