import Footer from "../components/Footer";

function Courses() {
  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-5rem)] p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        <p className="text-gray-600 mt-2">Gestión de cursos del sistema.</p>
      </div>

      <Footer />
    </div>
  );
}

export default Courses;