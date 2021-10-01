import {BrowserRouter, Route, Switch} from "react-router-dom";
import Authentication from "./components/authentication";
import Home from "./components/home";
import Contact from "./components/contact";
import About from "./components/about";
import NotFound from "./components/not-found";
import SignUp from "./components/authentication/sign-up";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path={"/"} component={Authentication}/>
                <Route exact={true} path={"/home"} component={Home}/>
                <Route exact={true} path={"/contact"} component={Contact}/>
                <Route exact={true} path={"/about"} component={About}/>
                <Route exact={true} path={"/sign-up"} component={SignUp}/>
                <Route exact={true} path={"/*"} component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
