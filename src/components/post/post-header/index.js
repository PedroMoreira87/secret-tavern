import React from "react";
import './index.css'
import { storage } from "../../../firebase"
import { getStorage, ref, uploadBytes } from "firebase/storage"

const getUserPhoto = (id) => {
    
}

export default function PostHeader(props) {
    return (
        <div class="post-header">
            <div class="post-header-user">
                <div class="post-header-user-photo">
                    <img class="post-custom-pic" src={props.image_link} />
                </div>
                <span>{props.first_name} {props.last_name}</span>
            </div>
        </div>
    )
}
