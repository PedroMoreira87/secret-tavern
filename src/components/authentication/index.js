import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {db} from '../../firebase'
import {collection, addDoc} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

class Authentication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            message: "",
            nome: "",
            dataNascimento: "",
            cpf: ""
        }

        this.signUp = this.signUp.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    signUp() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);

                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "user"), {
                    email: this.state.email,
                    password: this.state.password
                });
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    async signOut() {
        const auth = getAuth();
        await signOut(auth).then(() => {
            // Sign-out successful.
            this.setState({message: "Signed Out"});
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    signIn() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                const user = userCredential.user;
                console.log(user);
                this.setState({message: "Signed In"});
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Here is the LOGIN</h1>
                <h1> Login Screen : {this.state.message} </h1>
                {/*<Link to={"home"} className={"button-margin"}>*/}
                {/*    */}
                {/*</Link>*/}
                <Button variant="outlined" color="primary" onClick={this.signIn}>Sign In</Button>

                {/*<Link to={"home"} className={"button-margin"}>*/}
                {/*    */}
                {/*</Link>*/}
                <Button variant="outlined" color="primary" onClick={this.signUp}>Sign Up</Button>

                <br/>
                <Button variant="outlined" color="primary" onClick={this.signOut}>Sign Out</Button>

                <br/>
                <input type="text" placeholder="Email"
                       onChange={(e) => this.setState({email: e.target.value})}/>
                <br/>
                <input type="password" placeholder="Password"
                       onChange={(e) => this.setState({password: e.target.value})}/>
                <br/>
                <input type="text" placeholder="Nome"
                       onChange={(e) => this.setState({nome: e.target.value})}/> <br/>
                <input type="text" placeholder="CPF"
                       onChange={(e) => this.setState({cpf: e.target.value})}/> <br/>
                <input type="date" placeholder="Data de Nascimento"
                       onChange={(e) => this.setState({dataNascimento: e.target.value})}/> <br/>
            </div>
        )
    }
}

export default Authentication;
