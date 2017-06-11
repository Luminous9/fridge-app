import React, { Component } from "react";
import firebase, { userRef, groupRef } from "../firebase.js";
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
        // const userRef = firebase.database().ref(`/users/${userId}/groups/`);
        const userGroupsRef = userRef.child(userId).child("groups");
        groupRef.push(newGroup).then((snapshot) => {
            let newKey = snapshot.key;
            groupRef.child(newKey).child("metaData").update({
                id: newKey
            });
            userGroupsRef.update({[newKey]: true});
        });
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

        const userId = this.props.currentUser.uid;
        // const userRef = firebase.database().ref(`/users/${userId}/groups/`);
        const userGroupsRef = userRef.child(userId).child("groups");
        userGroupsRef.on("value", (snapshot) => {
            let newGroups = [];
            let that = this;
            const userGroups = snapshot.val();
            if (userGroups) {
                Promise.all(
                    Object.keys(userGroups).map((groupId) => {
                        return firebase.database().ref(`groups/${groupId}/metaData`).once("value");
                    })
                ).then(function (res) {
                    res.forEach((snapshot) => {
                        newGroups.push(snapshot.val());
                    });
                    that.setState({
                        groups: newGroups
                    });
                });
            }
        });
    }

    componentDidMount() {

    }
}