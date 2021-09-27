import React from "react";
import {Link} from "react-router-dom";
import NavBar from "../nav-bar";
import {Button} from "@material-ui/core";
import './index.css';

function Home() {
    return (
        <div>
            <NavBar/>

            <h1>Home</h1>
                <Link to={"about"} className={"button-margin"}>
                    <Button variant="outlined" color="primary" >About</Button>
                </Link>

                <Link to={"contact"}>
                    <Button variant="outlined" color="secondary" >Contact</Button>
                </Link>
        </div>
    )
}

export default Home;
