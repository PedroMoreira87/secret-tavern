import React from "react";
import "./create-post.css";
import {TextField, Input, Button} from "@material-ui/core";

function CreatePost(props) {
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
                />

                <div class="create-post-buttons">
                    <label htmlFor="contained-button-file">
                        <input class="invisible" accept="image/*" id="contained-button-file" multiple type="file"/>
                        <Button variant="outlined" color="primary" component="span"> Add Image </Button>
                    </label>

                    <Button variant="outlined" color="primary"> Submit </Button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;
