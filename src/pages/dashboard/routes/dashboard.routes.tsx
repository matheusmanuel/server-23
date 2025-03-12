import { Route } from "react-router-dom";
import DevicesComponent from "../pages/devices/devices";
import NewDevices from "../pages/newDevices/newDevices";

export default function DashboardRoutes() {
  return (
    <>
      <Route path="/" Component={DevicesComponent}></Route>
      <Route path="/new" Component={NewDevices}></Route>
    </>
  );
}
