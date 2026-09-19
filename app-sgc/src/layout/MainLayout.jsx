import Footer from "../components/Footer";
import Sidebar2 from "../components/Sidebar2";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar a la izquierda */}
      <Sidebar2 />

      {/* Contenedor derecho flex para empujar el Footer abajo */}
      <div className="flex flex-col flex-1 justify-between min-h-screen bg-slate-300 border-[18px] border-blue-950">
        <main className="p-6 flex-1">
          {children}
        </main>

        {/* Footer fijo globalmente */}
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;