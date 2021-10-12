import React from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const onError = () => {
    toast.error("Error", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
}

const onLogOut = () => {
    toast.error("You Logged Out!", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
}

const onLogin = () => {
    toast.success("You Signed In!", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
}

const onSignUp = () => {
    toast.success("You Signed Up!", {
        theme: "dark",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export {onSignUp, onLogin, onLogOut, onError};
