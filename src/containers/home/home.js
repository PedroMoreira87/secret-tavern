import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Header from "../../components/header/header"
import NavBar from "../../components/nav-bar/nav-bar";
import Post from "../../components/post";
import './home.css';

export default function Home() {
    return (
        <div>
            <Header/>
            <NavBar/>

        </div>
    )
}
