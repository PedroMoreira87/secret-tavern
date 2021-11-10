import React, {useState} from "react";
import './profile.css'
import avatar from '../../assets/avatar.svg'
import {Button, Input} from "@material-ui/core";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {getAuth} from "firebase/auth";

let image;

export default function Profile() {

    const [imageURL, setImageURL] = useState(avatar);

    const onImageChange = async (event) => {
        const auth = getAuth();
        let userUID;
        await auth.onAuthStateChanged((userCredential) => {
            userUID = userCredential.uid;
            console.log(userUID);
        })
        if (event.target.files && event.target.files[0]) {
            setImageURL(URL.createObjectURL(event.target.files[0]));
            image = event.target.files[0];
        }
        const uploadedFile = image;
        // Setting cover
        // Create a root reference
        const storage = getStorage();
        // Create a reference
        const storageRef = ref(storage, `users/${userUID}/cover/${userUID}`);
        uploadBytes(storageRef, uploadedFile).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        })
    }

    return (
        <div className={'profile-content'}>
            <div>
                <div>
                    <img src={imageURL} alt="" className={'profile-background'}/>
                </div>
                <label htmlFor="contained-button-file">
                    <Input class={"invisible"} accept="image/*" id="contained-button-file" multiple type="file"
                           onChange={onImageChange}/>
                    <Button variant="outlined" color="primary" component="span"> Upload </Button>
                </label>
            </div>
        </div>
    )
}
