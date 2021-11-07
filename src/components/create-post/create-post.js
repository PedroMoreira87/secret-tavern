import React, {useState, useEffect} from "react";
import "./create-post.css";
import {TextField, Input, Button} from "@material-ui/core";
import { db } from "../../firebase"
import { doc, setDoc, updateDoc, addDoc, collection} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import avatar from '../../assets/avatar.svg'

var image

function CreatePost(props) {

    const [postText, setPostText] = useState("");
    var uid = ""

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            // setImageURL(URL.createObjectURL(event.target.files));
            image = event.target.files[0];
            
        }
    }

    async function submitPost() {
    
        createPost();
    }

    async function getUserID() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            uid = user.uid;
            console.log("USUARIO LOGADO:", uid)
          } else {
            console.log("USUARIO DESLOGADO!")
          }
        })
    }

    async function createPost() {

        getUserID().then(async () => { 

            console.log("UID:", uid, "!")

            const docRef = await addDoc(collection(db, "users", uid, "posts"), {
                text: postText,
                likes: 0,
                shares: 0
            });
            
            console.log("Document written with ID: ", docRef.id);

            var uploadedFile = image;
            const storage = getStorage();

            if(uploadedFile !== undefined) {
                const storageRef = ref(storage, `posts/${docRef.id}`);
                await uploadBytes(storageRef, uploadedFile).then((snapshot) => {
                    console.log('Uploaded a blob or file!');

                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        updateDoc(docRef, {
                            attach: downloadURL
                        })
                    });
                });
            }

        }).catch( (error) => {console.log(error)})
        
    }

    return (
        <div class="create-post" style={props.display ? {display: "block"} : {display: "none"}} onClick={(e) => {e.stopPropagation()}}>
            <div class="create-post-content">

                <h2>CREATE NEW POST</h2>

                <TextField
                    variant="outlined"
                    label="Post Text"
                    multiline
                    rows={10}
                    defaultValue=""
                    fullWidth
                    onChange={(e) => { setPostText(e.target.value) }}
                />

                <div class="create-post-buttons">
                    <label htmlFor="contained-button-file">
                        <input onChange={onImageChange} class="invisible" accept="image/*" id="contained-button-file" multiple type="file"/>
                        <Button variant="outlined" color="primary" component="span"> Add Image </Button>
                    </label>

                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={ () => {submitPost(props.user)} }
                    > 
                        Submit 
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default CreatePost;
