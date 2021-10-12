import React from "react";
import PostHeader from "../post/post-header";
import PostContent from "../post/post-content";
import PostFooter from "../post/post-footer";
import './index.css';


export default function Post() {
    return (
        <div class="post">
            <div class="post-body">
                <PostHeader/>
                <PostContent/>
                <PostFooter/>
            </div>
        </div>
    )
}
