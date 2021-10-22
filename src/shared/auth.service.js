import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

class Auth {
    authenticated = false;

    signup(email, password) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password);
    }

    login(email, password) {
        const auth = getAuth();
        this.authenticated = true;
        return signInWithEmailAndPassword(auth, email, password);
    }

    logout() {
        const auth = getAuth();
        return signOut(auth);
    }

    isAuthenticated() {
        const auth = getAuth();
        return auth.onAuthStateChanged((userCredential) => {
            console.log(userCredential);
        });
    }

    protectedAuth() {
        return this.authenticated;
    }
}

export default new Auth();
