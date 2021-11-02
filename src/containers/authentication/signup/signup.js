import React, {useState} from "react";
import {Button, Card, CardContent, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {db} from '../../../firebase'
import {collection, addDoc} from "firebase/firestore";
import './signup.css'
import toastfy from "../../../utils/toastfy/toastfy";
import auth from '../../../services/auth.service';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function Signup() {

    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');

    const isFieldEmpty = (field) => {
        return field === "";
    }

    var wasSignUpTried = false;

    const error = (field) => {
        return field === "";
    }

    function checkForEmptyFields() {
        return (!isFieldEmpty(firstName) && !isFieldEmpty(lastName) && !isFieldEmpty(email) && !isFieldEmpty(password) && !isFieldEmpty(birthday) && !isFieldEmpty(gender))
    }

    function signup() {
        if(checkForEmptyFields()) {
            console.log("LOGADO!")    
            auth.signup(email, password)
            .then(async () => {
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "users"), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    birthday: birthday,
                    gender: gender
                });
                toastfy.onSignup();
                history.push("/login");
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                const errorMessage = error.message;
                toastfy.onError();
                console.log(errorMessage);
            });
        } else {
            console.log("TODOS OS CAMPOS PRECISAM SER PREENCHIDOS!")
        }
    }

    return (
        <div class="signup-content">
            <div class="signup-box">

                <h1>Sign Up</h1>

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
                        required
                        error={error(firstName)}
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
                        required
                        error={error(lastName)}
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
                        required
                        error={error(email)}
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
                        required
                        error={error(password)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Birthday"
                            value={birthday}
                            onChange={(newValue) => {
                                setBirthday(newValue);
                            }}
                            renderInput={(params) => <TextField required id="outlined-basic" variant="outlined" className={"input1"} {...params } />}
                        />
                    </LocalizationProvider>


                    <TextField
                        type="text"
                        onChange={(e) => {
                            setGender(e.target.value)
                        }}
                        id="outlined-basic"
                        label="Gender"
                        variant="outlined"
                        className={"input1"}
                        required
                        error={error(gender)}
                    />

                </div>

                <div class="signup-box-buttons">
                    <Button variant="outlined" color="primary" component={Link} to={'/login'}>Back</Button>

                    <Button variant="outlined" color="primary" onClick={signup}>Sign Up</Button>
                </div>
            </div>
        </div>
    )

}
