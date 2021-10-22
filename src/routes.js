import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./containers/home/home";
import Contact from "./containers/contact/contact";
import About from "./containers/about/about";
import NotFound from "./containers/not-found/not-found";
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
                <ProtectedRoute exact path={"/contact"} component={Contact}/>
                <ProtectedRoute exact path={"/about"} component={About}/>
                <ProtectedRoute exact path={"/home"} component={Home}/>
                <Route exact path={"/*"} component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
