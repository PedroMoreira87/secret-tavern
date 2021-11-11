import React, {useEffect, useState} from "react";
import './profile.css'
import avatar from '../../assets/avatar.svg'
import {Button, Input} from "@material-ui/core";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {getAuth} from "firebase/auth";
import auth from "../../services/auth.service";
import {doc, getDoc, updateDoc, collection, query, getDocs, orderBy} from "firebase/firestore";
import {db} from "../../firebase";
import Post from "../post/post";

let image;
var posts;

export default function Profile() {

    const [imageURL, setImageURL] = useState(avatar);
    const [loggedUserData, setLoggedUserData] = useState({})

    const fetchPosts = async () => {
        posts = []
        let invertedPosts = []

        const postsQuery = query(collection(db, 'users', getAuth().currentUser.uid, 'posts'), orderBy("date"));
        const querySnapshot = await getDocs(postsQuery);
        querySnapshot.forEach((doc) => {
            invertedPosts.push(doc.data())
        });
        
        invertedPosts.slice().reverse().forEach(x => posts.push(x))
    }

    const onImageChange = async (event) => {
        const auth = getAuth();
        let userUID;
        await auth.onAuthStateChanged((userCredential) => {
            userUID = userCredential.uid;
            console.log(userUID);
        })
        const docRef = doc(db, "users", userUID);
        if (event.target.files && event.target.files[0]) {
            setImageURL(URL.createObjectURL(event.target.files[0]));
            image = event.target.files[0];
        }
        const uploadedFile = image;
        // Setting cover
        // Create a root reference
        const storage = getStorage();
        // Create a reference
        const storageRef = ref(storage, `users/${userUID}/cover`);
        uploadBytes(storageRef, uploadedFile).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
                image = downloadURL
                updateDoc(docRef, {
                    cover: image
                })
            });
        })
    }

    useEffect(() => {
        auth.isAuthenticated();
        setTimeout(() => {
            getLoggedUserData().then(e => console.log("e?", e));
        }, 1000)
        fetchPosts();
    }, []);

    async function getLoggedUserData() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setLoggedUserData(docSnap.data())
                console.log("The user's data was retrieved successfully.");
                return docSnap.data();
            } else {
                console.log("User's not found.");
            }
        } else {
            console.log("Opsie")
        }
    }

    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };

    function timestampToDateString(timestamp) {
        return new Date(timestamp.seconds*1000).toLocaleDateString('pt-BR', options)
    }

    console.log("minha data",)

    const renderPosts = (postData, id) => {
        return (
            <Post
                key={id}
                profile_pic={loggedUserData.image}
                first_name={loggedUserData.firstName}
                last_name={loggedUserData.lastName}
                text={postData.text}
                attach={postData.attach}
                likes={postData.likes}
                comments={0}
                shares={postData.shares}
                type="image"
            />
        )
    }


    return (
        <div className={'profile-content'}>
            <div className={'profile-card'}>
                <div className={'profile-content-centralize'}>
                    <div className={'background-image'}>
                        <img src={loggedUserData.cover} alt="" className={'profile-background'}/>
                    </div>
                    <div className={'profile-user-data'}>
                        <div className={'profile-user-pic-name'}>
                            <img src={loggedUserData.image} className="profile-user-pic" alt={''}/>
                            <h3 className="profile-user-name">{loggedUserData.firstName} {loggedUserData.lastName}</h3>
                        </div>
                        <label htmlFor="contained-button-file">
                            <Input class={"invisible"} accept="image/*" id="contained-button-file" multiple type="file"
                                onChange={onImageChange}/>
                            <Button variant="outlined" color="primary" component="span">Upload Cover</Button>
                        </label>
                    </div>
                    <div className={'profile-user-moredata'}>
                        <div className={'profile-user-moredata-align'}>
                            <span class="user-moredata-unit">Gender: {loggedUserData.gender}</span> <br/>
                            <span class="user-moredata-unit">Birthday: {loggedUserData.birthday == undefined ? "" : timestampToDateString(loggedUserData.birthday)}</span> <br/>
                            <span class="user-moredata-unit">Email: {loggedUserData.email}</span> <br/>
                        </div>
                    </div>
                    <div className={'profile-user-posts'}>
                        <h2>{loggedUserData.firstName}'s posts:</h2>
                        {posts != undefined ? posts.map(renderPosts) : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}
