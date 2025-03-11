import { Route } from "react-router-dom";
import DevicesComponent from "../pages/devices/devices";

export default function DashboardRoutes(){
    return(
        <Route path="/" Component={DevicesComponent}></Route>
    )
}