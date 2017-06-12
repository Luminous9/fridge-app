import React, { Component } from "react";
import {
    BrowserRouter as Router,
    NavLink as Link,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import { auth, userRef } from "../firebase.js";
import "./App.css";
import Dashboard from "../Dashboard/Dashboard.js";
import LoginPage from "../LoginPage/LoginPage.js";
import Loading from "../Loading/Loading.js";


class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            activeGroup: null,
            loading: true
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(provider) {
        auth.signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.setState({
                user: user,
                loading: true
            });
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error: " + errorCode);
            console.log("Error Message: " + errorMessage);
        });
    }

    logout() {
        auth.signOut().then(() => {

            this.setState({
                user: null
            });
        });
    }

    render() {
        const loadPage = () => {
            if (this.state.user) {
                return <Dashboard logout={this.logout} currentUser={this.state.user} activeGroup={this.state.activeGroup} />;
            } else {
                return <LoginPage login={this.login} />;
            }
        };
        return (
            <Router>
                <main className="App">
                    <Switch>
                        <Route exact path="/" render={() => (
                            this.state.loading ?
                                (
                                    <Loading />
                                ) : (
                                    loadPage()
                                )
                        )} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                userRef.child(user.uid).once("value", (snapshot) => {
                    if (!snapshot.val()) {
                        userRef.child(user.uid).set(
                            {
                                name: user.displayName,
                                activeGroup: false
                            }
                        );
                    }
                    userRef.child(user.uid).child("activeGroup").on("value", (snapshot) => {
                        this.setState({
                            user: user,
                            loading: false,
                            activeGroup: snapshot.val()
                        });
                    });
                });

            } else {
                this.setState({
                    user: null,
                    loading: false
                });
            }
        });
    }

}

export default App;
