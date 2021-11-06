import React, {useState, useEffect} from "react";
import "./create-post.css";
import {TextField, Input, Button} from "@material-ui/core";
import { doc, setDoc } from "firebase/firestore";

function CreatePost(props) {

    const [postText, setPostText] = useState("");

    function submitPost(user) {
        console.log("User: ", user.data());
        if(postText != "") {
            console.log("is Posting: ", postText)
        } else {
            console.log("You need to write a text to submit a post.")
        }
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
                        <input class="invisible" accept="image/*" id="contained-button-file" multiple type="file"/>
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
