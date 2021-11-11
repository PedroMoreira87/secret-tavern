import React from "react";
import PostHeader from "./post-header/post-header";
import PostContent from "./post-content/post-content";
import PostFooter from "./post-footer/post-footer";
import './post.css';


export default function Post(props) {
    return (
        <div class="post">
            <div class="post-body">
                <PostHeader
                    first_name={props.first_name}
                    last_name={props.last_name}
                    profile_pic={props.profile_pic}
                />
                <PostContent
                    text={props.text}
                    type={props.type}
                    attach={props.attach}
                />
                <PostFooter
                    likes={props.likes}
                    comments={props.comments}
                    shares={props.shares}
                />
            </div>
        </div>
    )
}
