import Sidebar2 from "../components/Sidebar2";
import Footer from "../components/Footer";

function LayoutPrueba({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Barra Lateral fija a la izquierda */}
      <Sidebar2 />

      {/* Contenedor Derecho ocupando todo el alto disponible */}
      <div className="flex-1 flex flex-col justify-between min-h-screen">
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Footer siempre al fondo */}
        <Footer />
      </div>
    </div>
  );
}

export default LayoutPrueba;