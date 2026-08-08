import { Routes, Route } from "react-routers-dom";
import Dashboard from "../pages/Dashboard";

function AppRoutes(){
    return{
        <Routes>
         <Route path="/" element={<Dashboard />} />
        </Routes>
    };
}
export default  AppRoutes;