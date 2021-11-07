import React from "react";
import PostHeader from "../post/post-header";
import PostContent from "../post/post-content";
import PostFooter from "../post/post-footer";
import './index.css';


export default function Post(props) {
    return (
        <div class="post">
            <div class="post-body">
                <PostHeader
                    first_name={props.first_name}
                    last_name={props.last_name}
                    image_link={props.image_link}
                />
                <PostContent 
                    text={props.text} 
                    type={props.type}
                />
                <PostFooter/>
            </div>
        </div>
    )
}
