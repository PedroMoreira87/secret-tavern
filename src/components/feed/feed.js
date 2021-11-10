import React, {useState, useEffect} from "react";
import {db} from '../../firebase'
import Post from "../../components/post";
import "./feed.css";
import { collection, collectionGroup, query, where, getDoc, getDocs, doc, orderBy } from "firebase/firestore"
import CreatePost from "../create-post/create-post"
import {Button} from "@material-ui/core";
import { getAuth } from "firebase/auth";

var postsGambi = []
var postsOrder = []

export default function Feed() {
    const [loggedUserData, setLoggedUserData] = useState({})
    const [posts, setPosts] = useState([])
    const [isVisible, setVisible] = useState(false)

    useEffect(() => {
        getLoggedUserData();
        doPosts();
    }, [])

    const doPosts = async() => {
        await fetchPosts().then(mountPosts());
    }

    const fetchPosts = async() => {

        postsOrder = []

        const postsQuery = query(collectionGroup(db, 'posts'), orderBy("date"));

        const querySnapshot = await getDocs(postsQuery);
        querySnapshot.forEach((doc) => {
            postsOrder.push(doc.id)
        });

        const usersSnapshot = await getDocs(collection(db, "users"));
        postsGambi = []
        usersSnapshot.forEach(async (userDoc) => {
            
            const postsSnapshot = await getDocs(collection(db, "users", userDoc.id, "posts"));
            postsSnapshot.forEach(async (postDoc) => {
                postsGambi.unshift({ ... postDoc.data(), id: postDoc.id, userData: userDoc.data() });
            })

        });
    }

    const getOrderedPostsList = () => {
        var orderedList = []
        for(let i = postsOrder.length-1; i >= 0 ; i--) {
            for(let j = 0; j < postsGambi.length; j++) {
                if(postsOrder[i] == postsGambi[j].id) {
                    orderedList.push(postsGambi[j]) 
                }
            }
        }
        return orderedList
    }

    const mountPosts = () => {
        var postLength = postsGambi.length;
        var handle = setInterval(() => {
            postLength = postsGambi.length
            console.log("Loading Posts...")

            if(postLength != 0) {
                let orderedPostsGambi = getOrderedPostsList(postsGambi)
                setPosts(orderedPostsGambi)
                clearInterval(handle)
            }
        }, 1000)
    }

    const renderPosts = (postData, id) => {
        return (
            <Post
                key = {id}
                profile_pic = {postData.userData.image}
                first_name = {postData.userData.firstName}
                last_name = {postData.userData.lastName}
                text = {postData.text}
                attach = {postData.attach}
                likes = {postData.likes}
                comments = {0}
                shares = {postData.shares}
                type="image"
            />
        )
    }

    async function getLoggedUserData() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setLoggedUserData(docSnap)
                console.log("The user's data was retrived successfully.");
                return docSnap;
            } else {
                console.log("User's not found.");
            }

            const uid = user.uid;
        } else {
            console.log("There's no user logged")
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

    function postAppear(e) {
        setVisible(true);
        e.stopPropagation();
    }

    return (

        <div class="feed-content" onClick={ () => setVisible(false) }>

            <div class="feed-content-posts">

                <div class="feed-content-create-post">
                    <Button className={"new-posts-button"} variant="outlined" color="primary" onClick={ postAppear }> Create New Post </Button>
                    <CreatePost display={isVisible} user={ loggedUserData }/>
                </div>
            
                <div class="feed-content-render-post">
                    { posts.map(renderPosts) }
                </div>
            </div>


        </div>
       
    )
}
