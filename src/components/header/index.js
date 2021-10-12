import React from "react";
import {Link} from 'react-router-dom'
import {Button} from "@material-ui/core";
import './index.css'

export default function Header() {
    return (
        <header>
            <span class="logo">LOGO</span>

            <Link to={""}>
                <Button classname={"btn-logout"} variant="outlined" color="primary">Log Out</Button>
            </Link>

        </header>
    )
}
