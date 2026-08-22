import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout"; // O LayoutPrueba según el nombre de tu archivo layout
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Courses from "../pages/Courses";
import Enrollments from "../pages/Enrollments";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrollments" element={<Enrollments />} />
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;