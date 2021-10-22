import React from "react";
import './index.css'

export default function PostContent(props) {

    if(props.type === "text")
        return TextPost()

    if(props.type === "image")
        return ImagePost()

    if(props.type === "video")
        return VideoPost()

    if(props.type === "live")
        return LivePost()
    
}

function TextPost() {
    return (
        <div class="post-content">
            ISSO É UM TEXTO
        </div>
    )
}

function ImagePost() {
    return (
        <div class="post-content">
            ISSO É UMA IMAGEM
        </div>
    )
}

function VideoPost() {
    return (
        <div class="post-content">
            ISSO É UM VIDEO
        </div>
    )
}

function LivePost() {
    return (
        <div class="post-content">
            ISSO É UMA LIVE
        </div>
    )
}