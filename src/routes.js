import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./containers/home/home";
import NotFound from "./components/not-found/not-found";
import Login from "./containers/authentication/login/login";
import SignUp from "./containers/authentication/signup/signup";
import {ProtectedRoute} from "./protected.route";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} component={Login}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/signup"} component={SignUp}/>
                <ProtectedRoute exact path={"/home"} component={Home}/>
                <Route path={"/*"} component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
