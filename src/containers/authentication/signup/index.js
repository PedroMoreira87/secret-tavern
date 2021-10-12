import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";

import {Link, useHistory} from "react-router-dom";
import {db} from '../../../firebase'
import {collection, addDoc} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import {onSignUp, onError} from "../../../components/toastfy";

function SignUp() {

    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');

    function signUp() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "users"), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    birthday: birthday,
                    gender: gender
                });
                onSignUp();
                history.push("/home");
                console.log("Document written with ID: ", docRef.id);
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
            <div class="signup-box">

                <h1> Sign Up Screen</h1>

                <div class="signup-box-inputs">
                    <TextField
                        type="text"
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined"
                        className={"input1"}
                    />

                    <TextField
                        type="text"
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        className={"input1"}
                    />

                    <TextField
                        type="email"
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

                    <TextField
                        type="date"
                        onChange={(e) => {
                            setBirthday(e.target.value)
                        }}
                        id="outlined-basic"
                        label="Birthday"
                        variant="outlined"
                        className={"input1"}
                    />

                    <TextField
                        type="text"
                        onChange={(e) => {
                            setGender(e.target.value)
                        }}
                        id="outlined-basic"
                        label="Gender"
                        variant="outlined"
                        className={"input1"}
                    />

                </div>

                <div class="signup-box-buttons">
                    <Link to={"/login"} className={"button-margin"}>
                        <Button variant="outlined" color="primary">Back</Button>
                    </Link>
                    <Button variant="outlined" color="primary" onClick={signUp}>Sign Up</Button>
                </div>
            </div>
        </div>
    )

}

export default SignUp;
