import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import './index.css';
import {onError, onLogOut, onLogin} from "../../../components/toastfy";

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function logOut() {
        const auth = getAuth();
        await signOut(auth).then(() => {
            // Sign-out successful.
            onLogOut();
        }).catch((error) => {
            // An error happened.
            onError();
            console.log(error);
        });
    }

    function login() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                onLogin();
                history.push("/home");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                onError();
                console.log(errorMessage);
            });
    }

    function componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                const user = userCredential.user;
                console.log(user);
            }
        })
    }

    return (
        <div class="content">

            <div class="login-box">
                <h1 class="login-box-title"> Login Screen</h1>
                <div class="login-box-inputs">

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

                <div class="login-box-buttons">
                    <Link to={"signup"}>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={"btn-signup"}>
                            Sign Up
                        </Button>
                    </Link>

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

export default Login;
