import { Route } from "react-router-dom";
import SignUp from "../pages/sign-up/sign-up";
export default function AuthRoutes() {
    return (<Route path="" Component={SignUp}></Route>);
}
