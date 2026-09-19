import NavMenu from "./NavMenu";

function Sidebar2() {
  return (
    <aside className="w-80 bg-blue-900 text-white flex flex-col justify-between p-6 min-h-screen border-r-4 border-blue-950">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Sistema de Gestión Académica
        </h1>
        <NavMenu />
      </div>

      <div className="border-t border-blue-800 pt-4">
        <p className="font-bold text-white">Admin</p>
        <p className="text-sm text-blue-200">mcorreafe@cesde.net</p>
      </div>
    </aside>
  );
}

export default Sidebar2;