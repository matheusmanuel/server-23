import { BrowserRouter, Routes } from "react-router-dom";
import AuthRoutes from "../pages/auth/routes/auth.routes";
import DashboardRoutes from "../pages/dashboard/routes/dashboard.routes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {AuthRoutes()}
        {DashboardRoutes()}
      </Routes>
    </BrowserRouter>
  );
}