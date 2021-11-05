import React, {useState, useEffect} from "react";
import {db} from '../../firebase'
import Post from "../../components/post";
import "./feed.css";
import { collection, getDocs } from "firebase/firestore"


export default function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async() => {
        const usersSnapshot = await getDocs(collection(db, "users"));
        let list = []
        usersSnapshot.forEach(async (userDoc) => {
            const postsSnapshot = await getDocs(collection(db, "users", userDoc.id, "posts"));
            postsSnapshot.forEach(async (postDoc) => {
                console.log("USER: ", userDoc.data());  
                console.log(" POST: ", postDoc.data());
                list.unshift({ ...postDoc.data(), userData: userDoc.data() });
            })
        });

        setPosts(list)
        console.log(posts)
    }

    return (
        <div class="feed-content">
            <Post
                first_name="David"
                last_name="Siqueira"
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
