import React from "react";
import './index.css'

export default function PostFooter(props) {
    return (
        <div class="post-footer">
            <div class="post-footer-info">
                <span class="likes">{props.likes} {props.likes == 0 ? <span>like</span> : <span>likes</span> } </span>
                <span class="comments">{props.comments} {props.comments == 0 ? <span>comment</span> : <span>comments</span> }</span>
                <span class="shares">{props.shares} {props.shares == 0 ? <span>share</span> : <span>shares</span> }</span>
            </div>
            <div class="post-footer-interact">
                <button class="">Like</button>
                <button class="">Comment</button>
                <button class="">Share</button>
            </div>
        </div>
    )
}
