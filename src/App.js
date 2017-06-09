import React, { Component } from "react";
import {
    BrowserRouter as Router,
    NavLink as Link,
    Route
} from "react-router-dom";
import firebase, { auth, database, dbRef } from "./firebase.js";
import "./App.css";

// Auth Providers
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Components
class MainMenu extends Component {
    render() {
        return (
            <h2>Fridge App</h2>
        );
    }
}

class LoginPage extends Component {
    render() {
        return (
            <div>
                <h1>Fridge App</h1>
                <p>Welcome. To get started, go here to learn more about what Fridge App is.</p>
                <div>
                    <button onClick={ () => this.props.clickHandler(googleProvider) }>Login With Google</button>
                </div>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: false
        };
        this.login = this.login.bind(this);
    }

    login(provider) {
        auth.signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.setState({
                user: user
            });
        });
    }

    render() {
        const checkLogin = () => {
            // console.log(this.state.user);
            if (this.state.user) {
                return (
                    <MainMenu />
                );
            } else {
                return (
                    <LoginPage clickHandler={this.login} />
                );
            }
        };
        return (
            <main className="App">
                {this.state.loading ? <h1>Loading</h1> : checkLogin() }
            </main>
        );
    }
}

export default App;
