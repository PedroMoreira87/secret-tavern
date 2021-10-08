import {BrowserRouter, Route, Switch} from "react-router-dom";
import Start from "./containers/start";
import Home from "./containers/home";
import Contact from "./containers/contact";
import About from "./containers/about";
import NotFound from "./containers/not-found";
import Login from "./containers/authentication/login";
import SignUp from "./containers/authentication/signup";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path={"/"} component={Start}/>
                <Route exact={true} path={"/home"} component={Home}/>
                <Route exact={true} path={"/contact"} component={Contact}/>
                <Route exact={true} path={"/about"} component={About}/>
                <Route exact={true} path={"/login"} component={Login}/>
                <Route exact={true} path={"/signup"} component={SignUp}/>
                <Route exact={true} path={"/*"} component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
