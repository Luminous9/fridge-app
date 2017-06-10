import React, { Component } from "react";
import {
    BrowserRouter as Router,
    NavLink as Link,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import firebase, { auth, database, dbRef } from "./firebase.js";
import "./App.css";

// Auth Providers
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Components
class Dashboard extends Component {
    render() {
        return (
            <h2>Fridge App</h2>
        );
    }

    componentWillMount() {
        console.log("Boom shackalaka");
    }
    componentDidMount() {
        console.log("the end");
    }
}

class LoginPage extends Component {
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

class NotFound extends Component {
    render() {
        return (
            <h2>We could not find the page you are looking for.</h2>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true
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

    logout() {
        auth.signOut().then(() => {
            this.setState({
                user: null
            });
        });
    }

    render() {
        return (
            <Router>
                <main className="App">
                    <Switch>
                        <Route exact path="/" render={() => (
                            this.state.user ?
                                (
                                    <Dashboard />
                                ) : (
                                    <LoginPage login={this.login} />
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
                this.setState({
                    user: user,
                    loading: false
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
