import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/home/home";
import Contact from "./components/contact/contact";
import About from "./components/about/about";
import NotFound from "./components/not-found/not-found";
import Login from "./components/authentication/login/login";
import SignUp from "./components/authentication/signup/signup";
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
