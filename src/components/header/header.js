import React, {useState, useEffect} from "react";
import {db} from '../../firebase'
import {Button} from "@material-ui/core";
import './header.css'
import auth from "../../services/auth.service";
import toastfy from "../../utils/toastfy/toastfy";
import {useHistory} from "react-router-dom";
import { getDoc, doc} from "firebase/firestore"
import { getAuth } from "firebase/auth";

export default function Header() {

    const history = useHistory();
    const [loggedUserData, setLoggedUserData] = useState({})

    function logout() {
        auth.logout()
            .then(() => {
                // Sign-out successful.
                history.push("/login");
                toastfy.onLogout("You Logged Out!");
            })
            .catch((error) => {
                // An error happened.
                toastfy.onError();
                console.log(error);
            });
    }

    useEffect(() => {
        auth.isAuthenticated();
        setTimeout(() => {getLoggedUserData().then(e => console.log("e?",e));}, 1000)
    }, []);

    async function getLoggedUserData() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user !== null) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setLoggedUserData(docSnap.data())
                console.log("The user's data was retrived successfully.");
                return docSnap.data();
            } else {
                console.log("User's not found.");
            }

        } else {
            console.log("Opsie")
        }
    }

    return (
        <header>
            <span className="logo">Secret Tavern</span>

            <div class="header-user-info">
                <img src={loggedUserData.image} class="header-user-pic"></img>
                <h3 class="header-user-name">{loggedUserData.firstName} {loggedUserData.lastName}</h3>
                <Button className={"btn-logout"} variant="outlined" color="primary" onClick={logout}>
                    Log Out
                </Button>
            </div>

        </header>
    )
}
