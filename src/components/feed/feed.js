import React, {useState, useEffect} from "react";
import {db} from '../../firebase'
import Post from "../../components/post";
import "./feed.css";
import { collection, getDoc, getDocs, doc } from "firebase/firestore"
import CreatePost from "../create-post/create-post"
import {Button} from "@material-ui/core";
import { getAuth } from "firebase/auth";

var lista = []

export default function Feed() {
    const [loggedUserData, setLoggedUserData] = useState({})
    const [posts, setPosts] = useState([])
    const [isVisible, setVisible] = useState(false)

    useEffect(() => {
        getLoggedUserData();
        fetchUsers();
    }, [])
    
    function postAppear(e) {
        setVisible(true);
        e.stopPropagation();
    }

    const fetchUsers = async() => {
        const usersSnapshot = await getDocs(collection(db, "users"));
        let list = []
        usersSnapshot.forEach(async (userDoc) => {
            
            const postsSnapshot = await getDocs(collection(db, "users", userDoc.id, "posts"));
            postsSnapshot.forEach(async (postDoc) => {
                console.log("USER: ", userDoc.data());  
                console.log(" POST: ", postDoc.data());
                list.unshift({ ... postDoc.data(), userData: userDoc.data() });
                setPosts(list)
                console.log(posts)
            })

        });
    }


    async function getLoggedUserData() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setLoggedUserData(docSnap)
                //console.log("The user's data was retrived successfully.");
                return docSnap;
            } else {
                //console.log("User's not found.");
            }

            const uid = user.uid;
        } else {
            //console.log("There's no user logged")
        }
    }

    async function getLoggedUserDoc() {
        const auth = getAuth();
        const user = user.currentUser;
        console.log("EU SOU O USUARIO", user.uid)
        if (user !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap;
            } else {
                console.log("User's not found.");
            }
        } else {
            console.log("There's no user logged")
        }
    }

    return (

        <div class="feed-content" onClick={ () => setVisible(false) }>

            <Button variant="outlined" color="primary" onClick={ postAppear } >Create New Post</Button>

            <CreatePost display={isVisible} user={ loggedUserData }/>

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
