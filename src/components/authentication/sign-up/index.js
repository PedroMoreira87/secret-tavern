import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {db} from '../../../firebase'
import {collection, addDoc} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            birthday: "",
            gender: "",
        }

        this.signUp = this.signUp.bind(this);
    }

    onError = () => toast.error("Error", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    onSignUp = () => toast.success("You Signed Up!", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    signUp() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "user"), {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    birthday: this.state.birthday,
                    gender: this.state.gender
                });
                this.onSignUp();
                console.log("Document written with ID: ", docRef.id);
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

                <h1> Sign Up Screen</h1>

                <br/>
                <input type="text" placeholder="First Name"
                       onChange={(e) => this.setState({firstName: e.target.value})}/> <br/>

                <input type="text" placeholder="Last Name"
                       onChange={(e) => this.setState({lastName: e.target.value})}/> <br/>

                <input type="email" placeholder="Email"
                       onChange={(e) => this.setState({email: e.target.value})}/> <br/>

                <input type="password" placeholder="Password"
                       onChange={(e) => this.setState({password: e.target.value})}/> <br/>

                <input type="date" placeholder="Birthday"
                       onChange={(e) => this.setState({birthday: e.target.value})}/> <br/>

                <input type="text" placeholder="Gender"
                       onChange={(e) => this.setState({gender: e.target.value})}/> <br/>

                {/*<Link to={"home"} className={"button-margin"}>*/}
                {/*    */}
                {/*</Link>*/}
                <Button variant="outlined" color="primary" onClick={this.signUp}>Sign Up</Button>

                <Link to={"/"} className={"button-margin"}>
                    <Button variant="outlined" color="primary">Back</Button>
                </Link>

            </div>
        )
    }
}

export default SignUp;
