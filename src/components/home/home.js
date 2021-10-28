import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import Header from "../header/header"
import NavBar from "../nav-bar/nav-bar";
import Post from "../../components/post/";
import './home.css';

export default function Home() {
    return (
        <div>
            <Header/>
            <NavBar/>

            <h1>Home</h1>

            <Button variant="outlined" color="primary" component={Link} to={'/about'}>
                About
            </Button>

            <Button variant="outlined" color="secondary" component={Link} to={'/contact'}>Contact</Button>

            <Post
                text="test1"
                type="image"
            />

            <Post
                text="test2"
                type="video"
            />

            <Post
                text="test3"
                type="live"
            />

        </div>
    )
}
