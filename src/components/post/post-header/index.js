import React from "react";
import './index.css'

export default function PostHeader(props) {
    return (
        <div class="post-header">
            <div class="post-header-user">
                <div class="post-header-user-photo">PIC</div>
                <span>{props.first_name} {props.last_name}</span>
            </div>
        </div>
    )
}
