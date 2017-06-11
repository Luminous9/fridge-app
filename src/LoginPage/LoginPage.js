import React, { Component } from "react";
import firebase from "firebase";

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    "prompt": "select_account"
});

export default class LoginPage extends Component {
    render() {
        return (
            <div>
                <h1>Fridge App</h1>
                <p>Welcome. To get started, go here to learn more about what Fridge App is.</p>
                <div>
                    <button onClick={() => this.props.login(googleProvider)}>Login With Google</button>
                </div>
            </div>
        );
    }
}