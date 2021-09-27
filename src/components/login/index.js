import React from "react";
import NavBar from "../nav-bar";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div>
            <h1>Here is the LOGIN</h1>
            <Link to={"home"} className={"button-margin"}>
                <Button variant="outlined" color="primary" >Login</Button>
            </Link>
        </div>
    )
}

export default Login;
