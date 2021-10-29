import React from "react";
import Post from "../../components/post";
import "./feed.css";

export default function Feed() {
    return (
        <div class="feed-content">
            <Post
                text="test1"
                type="image"
            />

            <Post
                text="test2"
                type="video"
            />

            <Post
                text="test3"
                type="live"
            />

        </div>
    )
}
