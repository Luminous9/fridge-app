import React, { Component } from "react";
import firebase from "../firebase.js";
import styles from "./LoginPage.css";

console.log(styles);

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    "prompt": "select_account"
});

export default class LoginPage extends Component {
    render() {
        return (
            <div className={styles.LoginPage}>
                <h1>What's In My Fridge?</h1>
                <p className={styles.subHeading}>Never lose track of what you have in your fridge, freezer, or pantry again.</p>
                <div>
                    <button onClick={() => this.props.login(googleProvider)}>Login With Google</button>
                </div>
            </div>
        );
    }
}