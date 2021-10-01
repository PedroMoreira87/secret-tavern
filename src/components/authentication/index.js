import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    onError = () => toast.error("Error", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

    onSignOut = () => toast.error("You Signed Out!", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

    async signOut() {
        const auth = getAuth();
        await signOut(auth).then(() => {
            // Sign-out successful.
            this.onSignOut();
        }).catch((error) => {
            // An error happened.
            this.onError();
            console.log(error);
        });
    }

    onSignIn = () => toast.success("You Signed In!", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

    signIn() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                this.onSignIn();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                this.onError();
                console.log(errorMessage);
            });
    }

    componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                const user = userCredential.user;
                console.log(user);
            }
        })
    }

    render() {

        return (
            <div>
                <h1>Here is the LOGIN</h1>
                <h1> Login Screen</h1>
                {/*<Link to={"home"} className={"button-margin"}>*/}
                {/*    */}
                {/*</Link>*/}
                <Button variant="outlined" color="primary" onClick={this.signIn}>Sign In</Button>

                <Link to={"sign-up"} className={"button-margin"}>
                    <Button variant="outlined" color="primary">Sign Up</Button>
                </Link>

                <br/>
                <Button variant="outlined" color="primary" onClick={this.signOut}>Sign Out</Button>

                <br/>
                <input type="text" placeholder="Email"
                       onChange={(e) => this.setState({email: e.target.value})}/>
                <br/>
                <input type="password" placeholder="Password"
                       onChange={(e) => this.setState({password: e.target.value})}/>
            </div>
        )
    }
}

export default Authentication;
