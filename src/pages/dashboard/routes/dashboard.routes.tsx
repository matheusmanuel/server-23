import { Route } from "react-router-dom";
import DevicesComponent from "../pages/devices/devices";
import NewDevices from "../pages/newDevices/newDevices";
import EditDevices from "../pages/editDevices/editDevices";
import ViewDevices from "../pages/viewDevices/viewDevices";
import DeleteDevice from "../pages/devices/components/deleteDevice/deleteDevice";

export default function DashboardRoutes() {
  return (
    <>
      <Route path="/dashboard" Component={DevicesComponent}></Route>
      <Route path="/dashboard/new" Component={NewDevices}></Route>
      <Route path="/dashboard/view/:deviceId" Component={ViewDevices}></Route>
      <Route path="/dashboard/edit/:deviceId" Component={EditDevices}></Route>
      <Route path="/dashboard/delete/:deviceId" Component={DeleteDevice}></Route>
    </>
  );
}
