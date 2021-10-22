import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import './login.css';
import toastfy from '../../../utils/toastfy/toastfy';
import auth from '../../../services/auth.service';

export default function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        auth.login(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                toastfy.onLogin();
                history.push("/home");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toastfy.onError();
                console.log(errorMessage);
            });
    }

    return (
        <div className="content">

            <div className="login-box">
                <h1 className="login-box-title"> Login Screen</h1>
                <div className="login-box-inputs">

                    <TextField
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        className={"input1"}
                    />

                    <TextField
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        className={"input1"}
                    />
                </div>

                <div className="login-box-buttons">

                    <Button
                        component={Link} to={'/signup'}
                        variant="outlined"
                        color="primary"
                        className={"btn-signup"}>
                        Sign Up
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={login}
                        className={"btn-signin"}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}
