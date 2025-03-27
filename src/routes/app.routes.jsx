import { HashRouter, Routes } from "react-router-dom";
import AuthRoutes from "../pages/auth/routes/auth.routes.tsx";
import DashboardRoutes from "../pages/dashboard/routes/dashboard.routes.tsx";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        {AuthRoutes()}
        {DashboardRoutes()}
      </Routes>
    </HashRouter>
  );
}
