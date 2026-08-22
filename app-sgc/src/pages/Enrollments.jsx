import Footer from "../components/Footer";

function Enrollments() {
  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-5rem)]">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Enrollments</h1>
        <p className="text-gray-600 mt-2">Gestión de matrículas del sistema.</p>
      </div>

      <Footer />
    </div>
  );
}

export default Enrollments;