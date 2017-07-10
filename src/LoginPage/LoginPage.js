import React, { Component } from "react";
import firebase from "../firebase.js";
import styles from "./LoginPage.css";

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    "prompt": "select_account"
});

export default class LoginPage extends Component {
    render() {
        return (
            <div className={styles.LoginPage}>
                <div className={styles.wrapper}>
                    <h1 className={styles.heading}>What's In My Fridge?</h1>
                    <p className={styles.subHeading}>Never lose track of what you have in your fridge, freezer, or pantry again.</p>
                    <button onClick={() => this.props.login(googleProvider)} className={styles.button}>Login With Google</button>
                    <div className={styles.placeholder}>
                        <div className={styles.knob}></div>
                    </div>
                </div>
            </div>
        );
    }
}