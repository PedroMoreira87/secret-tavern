import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Header from "../../components/header"
import NavBar from "../../components/nav-bar";

import './index.css';

export default function Home() {
    return (
        <div>
            <Header/>
            <NavBar/>

            <h1>Home</h1>
            <Link to={"about"} className={"button-margin"}>
                <Button variant="outlined" color="primary">About</Button>
            </Link>

            <Link to={"contact"}>
                <Button variant="outlined" color="secondary">Contact</Button>
            </Link>
        </div>
    )
}
