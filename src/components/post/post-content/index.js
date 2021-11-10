import React from "react";
import './index.css'

export default function PostContent(props) {

    if(props.type === "image")
        return ImagePost(props)

    if(props.type === "video")
        return VideoPost(props)

    if(props.type === "live")
        return LivePost(props)
    
}

function ImagePost(props) {
    return (
        <div class="post-content">
            <div class="post-content-text">
                {props.attach == undefined ? <h2>{props.text}</h2> : <span>{props.text}</span> }
            </div>
            
            <div class="post-content-attach">
                <img 
                    src={props.attach}
                ></img>
            </div>
        </div>
    )
}

function VideoPost(props) {
    return (
        <div class="post-content">
            <div class="post-content-text">
                <span>{props.text}</span>
            </div>

            <div class="post-content-attach">
                <span>{props.type}</span>
            </div>
        </div>
    )
}

function LivePost(props) {
    return (
        <div class="post-content">
            <div class="post-content-text">
                <span>{props.text}</span>
            </div>

            <div class="post-content-attach">
                <span>{props.type}</span>
            </div>
        </div>
    )
}