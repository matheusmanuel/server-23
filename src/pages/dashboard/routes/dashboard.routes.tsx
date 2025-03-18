import { Route } from "react-router-dom";
import DevicesComponent from "../pages/devices/devices";
import NewDevices from "../pages/newDevices/newDevices";
import EditDevices from "../pages/editDevices/editDevices";
import ViewDevices from "../pages/viewDevices/viewDevices";
import DeleteDevice from "../pages/devices/components/deleteDevice/deleteDevice";

export default function DashboardRoutes() {
  return (
    <>
      <Route path="/" Component={DevicesComponent}></Route>
      <Route path="/new" Component={NewDevices}></Route>
      <Route path="/view/:deviceId" Component={ViewDevices}></Route>
      <Route path="/edit/:deviceId" Component={EditDevices}></Route>
      <Route path="/delete/:deviceId" Component={DeleteDevice}></Route>
    </>
  );
}
