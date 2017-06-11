import React, { Component } from "react";
import firebase from "firebase";
import NewGroup from "../NewGroup/NewGroup.js";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            newGroupMenu: false,
            groups: []
        };
        this.showGroupMenu = this.showGroupMenu.bind(this);
        this.closeGroupMenu = this.closeGroupMenu.bind(this);
        this.addNewGroup = this.addNewGroup.bind(this);
    }

    showGroupMenu() {
        this.setState({
            newGroupMenu: true
        });
    }

    closeGroupMenu() {
        this.setState({
            newGroupMenu: false
        });
    }

    addNewGroup(newGroup) {
        this.setState({
            newGroupMenu: false
        });
        const userId = this.state.user.uid;
        const userRef = firebase.database().ref(`/users/${userId}/groups/`);
        userRef.push(newGroup);
    }

    render() {
        return (
            <div>
                <h2>Fridge App</h2>
                <button onClick={() => this.props.logout()}>Logout</button>
                <button onClick={this.showGroupMenu}>New Group</button>
                {this.state.newGroupMenu ? <NewGroup submit={this.addNewGroup} groups={this.state.groups} close={this.closeGroupMenu} /> : null}
            </div>
        );
    }

    componentWillMount() {
        this.setState({
            user: this.props.currentUser
        });
    }

    componentDidMount() {
        const userId = this.state.user.uid;
        const userRef = firebase.database().ref(`/users/${userId}/groups/`);
        userRef.on("value", (snapshot) => {
            const dbGroups = snapshot.val();
            const newGroups = [];
            for (let key in dbGroups) {
                newGroups.push({
                    key: key,
                    name: dbGroups[key].groupName
                });
            }
            this.setState({
                groups: newGroups
            });
        });
    }
}