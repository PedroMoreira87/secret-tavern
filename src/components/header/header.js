import React, {useEffect} from "react";
import {Button} from "@material-ui/core";
import './header.css'
import auth from "../../shared/auth.service";
import toastfy from "../toastfy/toastfy";
import {useHistory} from "react-router-dom";

export default function Header() {

    const history = useHistory();

    function logout() {
        auth.logout()
            .then(() => {
                // Sign-out successful.
                history.push("/login");
                toastfy.onLogout();
            })
            .catch((error) => {
                // An error happened.
                toastfy.onError();
                console.log(error);
            });
    }

    useEffect(() => {
        auth.isAuthenticated();
    });

    return (
        <header>
            <span className="logo">LOGO</span>

            <Button className={"btn-logout"} variant="outlined" color="primary" onClick={logout}>
                Log Out
            </Button>

        </header>
    )
}
