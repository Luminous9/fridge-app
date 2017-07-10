import React, { Component } from "react";
import {
    BrowserRouter as Router,
    NavLink as Link,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import { auth, userRef, groupRef } from "../firebase.js";
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
            groups: [],
            loading: true,
            storages: []
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.loadingTimeout = this.loadingTimeout.bind(this);
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

    loadingTimeout() {
        const that = this;
        setTimeout(function () {
            if (that.state.loading === true) {
                that.setState({
                    loading: false
                })
                alert("Connection Failed");
            }
        }, 10000);
    }

    render() {
        const loadPage = () => {
            if (this.state.user) {
                return (
                    <Dashboard
                        logout={this.logout}
                        currentUser={this.state.user}
                        activeGroup={this.state.activeGroup}
                        groups={this.state.groups}
                        storages={this.state.storages}
                    />
                );
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
                this.loadingTimeout();

                userRef.child(user.uid).once("value", (snapshot) => {
                    if (!snapshot.val()) {
                        userRef.child(user.uid).set(
                            {
                                name: user.displayName,
                                activeGroup: false
                            }
                        );
                    }
                    userRef.child(user.uid).child("activeGroup").on("value", (activeGroupSnap) => {
                        const oldActiveGroup = this.state.activeGroup;
                        const newActiveGroup = activeGroupSnap.val();

                        if (oldActiveGroup) {
                            groupRef.child(oldActiveGroup).child("storages").off();
                        }
                        if (newActiveGroup) {
                            groupRef.child(newActiveGroup).child("storages").on("value", (snapshot) => {
                                const dbStorages = snapshot.val();
                                if (dbStorages) {
                                    let newStorages = [];
                                    for (var storage in dbStorages) {
                                        newStorages.push(dbStorages[storage]);
                                    }
                                    this.setState({
                                        storages: newStorages
                                    });
                                }
                            });
                        }

                        this.setState({
                            activeGroup: newActiveGroup
                        });
                    });

                    const userGroupsRef = userRef.child(user.uid).child("groups");
                    userGroupsRef.on("value", (snapshot) => {
                        let newGroups = [];
                        let that = this;
                        const userGroups = snapshot.val();
                        if (userGroups) {
                            Promise.all(
                                Object.keys(userGroups).map((groupId) => {
                                    return groupRef.child(groupId).child("metaData").once("value");
                                })
                            ).then((res) => {
                                res.forEach((snapshot) => {
                                    newGroups.push(snapshot.val());
                                });
                                that.setState({
                                    user: user,
                                    loading: false,
                                    groups: newGroups
                                });
                            });
                        } else {
                            this.setState({
                                user: user,
                                loading: false
                            });
                        }
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
