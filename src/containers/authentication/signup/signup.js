import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {db} from '../../../firebase'
import {doc, setDoc, updateDoc} from "firebase/firestore";
import './signup.css'
import toastfy from "../../../utils/toastfy/toastfy";
import auth from '../../../services/auth.service';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import avatar from '../../../assets/avatar.svg'
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import styled from "@emotion/styled";

const Input = styled('input')({
    display: 'none',
});

let image;

export default function Signup() {

    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [imageURL, setImageURL] = useState(avatar);

    const onImageChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            //setImageURL(URL.createObjectURL(event.target.files));
            image = event.target.files[0];
        }
    }

    const isFieldEmpty = (field) => {
        return field === "";
    }

    function checkForEmptyFields() {
        return (!isFieldEmpty(firstName) && !isFieldEmpty(lastName) && !isFieldEmpty(email) && !isFieldEmpty(password) && !isFieldEmpty(birthday) && !isFieldEmpty(gender))
    }

    async function signup() {
        if (checkForEmptyFields()) {
            const uploadedFile = image;
            console.log(image)

            await auth.signup(email, password)
                .then(async (user) => {
                    let uid = user.user.uid;

                    const docRef = doc(db, "users", uid);
                    
                    await setDoc(docRef, {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        birthday: birthday,
                        gender: gender
                    });

                    // Setting avatar
                    // Create a root reference
                    const storage = getStorage();
                    // Create a reference to 'mountains.jpg'

                    if(uploadedFile !== undefined) {
                        
                        const storageRef = ref(storage, `users/${uid}`);
                        await uploadBytes(storageRef, uploadedFile).then((snapshot) => {
                            console.log('Uploaded a blob or file!');

                            getDownloadURL(snapshot.ref).then((downloadURL) => {
                                console.log(downloadURL)
                                image = downloadURL
                                updateDoc(docRef, {
                                    image: image
                                })
                            });
                            
                        });

                    } else {

                    }
                        
                    toastfy.onSignup("You Signed Up!");
                    history.push("/login");
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    toastfy.onError("Error");
                    console.log(errorMessage);
                });
        } else {
            toastfy.onError("All the fields are required");
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
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Birthday"
                            value={birthday}
                            onChange={(newValue) => {
                                setBirthday(newValue);
                            }}
                            renderInput={(params) => <TextField required id="outlined-basic" variant="outlined"
                                                                className={"input1"} {...params} error={false}/>}
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
                    />

                    <div className={'avatar-container'}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file"
                                   onChange={onImageChange}/>
                            <Button variant="outlined" color="primary" component="span"> Upload </Button>
                        </label>
                        <div className={'avatar-box'}>
                            <img className={'avatar-size'} src={imageURL} alt=''/>
                        </div>
                    </div>

                </div>

                <div class="signup-box-buttons">
                    <Button variant="outlined" color="primary" component={Link} to={'/login'}>Back</Button>

                    <Button variant="outlined" color="primary" onClick={signup}>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}
