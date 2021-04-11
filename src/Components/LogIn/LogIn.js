import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Container } from '@material-ui/core';
import { useContext, useState } from 'react';
import './LogIn.css';
import "firebase/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

// firebase app initialize
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LogIn = () => {
    // old firebase
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    // Handle Blue or Get Input data
    const handleBlur = (e) => {
        let isValidFields = true;
        if (e.target.name === 'email') {
            isValidFields = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isValidFields = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(e.target.value);
        }
        if (e.target.name === 'confirmPassword') {
            isValidFields = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(e.target.value);
        }

        if (e.target.name === 'name') {
            isValidFields = e.target.value;
        }

        if (isValidFields) {
            const newLoggedInUserInfo = { ...loggedInUser };
            newLoggedInUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newLoggedInUserInfo);
        }

    }


    //          handle Google sign in 
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isSignedIn: true,
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, email, credential);
            });
    }

    //  Handle Facebook sign in 

    const handleFacebookSignIn = () => {
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isSignedIn: true,
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, email, credential);
            });
    }

    //    submit form
    const handleSubmit = (e) => {

        // create new user
        if (newUser && loggedInUser.email && loggedInUser.password === loggedInUser.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((res) => {
                    const newLoggedInUserInfo = { ...loggedInUser };
                    newLoggedInUserInfo.error = '';
                    newLoggedInUserInfo.success = true;
                    setLoggedInUser(newLoggedInUserInfo);
                    updateUserInfo(loggedInUser.name);
                    history.replace(from);
                })
                .catch((error) => {
                    const newLoggedInUserInfo = { ...loggedInUser };
                    newLoggedInUserInfo.error = error.message;
                    newLoggedInUserInfo.success = false;
                    setLoggedInUser(newLoggedInUserInfo);
                });
        }

        // user sign in or old user that who at first created account
        if (!newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((res) => {
                    const { displayName } = res.user;
                    const newLoggedInUserInfo = { ...loggedInUser };
                    newLoggedInUserInfo.error = '';
                    newLoggedInUserInfo.success = true;
                    newLoggedInUserInfo.name = displayName;
                    setLoggedInUser(newLoggedInUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newLoggedInUserInfo = { ...loggedInUser };
                    newLoggedInUserInfo.error = error.message;
                    newLoggedInUserInfo.success = false;
                    setLoggedInUser(newLoggedInUserInfo);
                });
        }

        e.preventDefault();
    }

    // Update User Profile 

    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('Updated user profile', name);
        }).catch(function (error) {
            console.log('Failed to update user profile', error);
        });
    }
    // old firebase

    return (
        <Container>
            <div align="center" className="formContainer">
                <div className='formPage' >
                    {newUser ? <h3>Create an account</h3> : <h3>Log In</h3>}
                    <form onSubmit={handleSubmit} className="form-filed"  >
                        {newUser && <input name="name" type="text" onBlur={handleBlur} required placeholder="Enter Your Name" />}
                        <br />

                        <input name="email" type="email" onBlur={handleBlur} required placeholder="Enter Your Email" />
                        <br />

                        <input name="password" onBlur={handleBlur} required type="password" placeholder="Enter Your Password" />

                        <br />

                        {newUser && <input name="confirmPassword" onBlur={handleBlur} required type="password" placeholder="Enter Your Confirm Password" />}

                        <br />

                        <input type="submit" onBlur={handleBlur} value={newUser ? 'create an account' : "Login"} className="btnColor" />
                    </form>
                    {newUser ? <span>Already have an account?</span> :
                        <span>Don't have an account?</span>
                    } {newUser ? <Link onClick={() => setNewUser(!newUser)} className = 'userLogInBtn'> Log in </Link> :
                        <Link onClick={() => setNewUser(!newUser)} className = 'userLogInBtn'> Create an account </Link>
                    }


                    {loggedInUser.success ? <p style={{ color: "green" }}>User {newUser ? "created" : "logged in"} Successfully</p> :
                        <p style={{ color: "red" }}>{loggedInUser.error}</p>
                    }
                </div>
            </div>

            <div className="button-area">
                <div className="line">
                    <hr className="lineOne" />
                    <small className="or">Or</small>
                    <hr className="lineTwo" />
                </div>

                {/* sign in with google account */}
                <button onClick={handleGoogleSignIn} className="googleBtn"> <span className="iconBox">
                    <FontAwesomeIcon className="icon" icon={faGoogle} />
                </span> <span className="btnText">Continue With Google</span> </button>
                <br /> <br />

                {/* Sign in with facebook account */}
                <button onClick={handleFacebookSignIn} className="googleBtn"> <span className="iconBox">
                    <FontAwesomeIcon className="icon" icon={faFacebookF} />
                </span> <span className="btnText">Continue With facebook</span> </button>
            </div>
        </Container>
    );
};

export default LogIn;