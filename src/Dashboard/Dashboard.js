import React, { Component } from "react";
import firebase, { userRef, groupRef } from "../firebase.js";
import NewGroup from "../NewGroup/NewGroup.js";
import NavPanel from "../NavPanel/NavPanel.js";
import GroupView from "../GroupView/GroupView.js";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
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
        const userGroupsRef = userRef.child(userId).child("groups");
        groupRef.push(newGroup).then((snapshot) => {
            let newKey = snapshot.key;
            groupRef.child(newKey).child("metaData").update({
                id: newKey
            });
            userRef.child(userId).update({ activeGroup: newKey });
            userGroupsRef.update({ [newKey]: true });

            groupRef.child(newKey).child("storages").push({
                storageName: "Main Fridge"
            });
        });
    }

    render() {
        console.log("dashboard render: " + this.props.storages);
        return (
            <div>
                <h2>Fridge App</h2>
                {this.state.newGroupMenu ?
                    <NewGroup submit={this.addNewGroup} groups={this.state.groups} close={this.closeGroupMenu} /> : null
                }
                <NavPanel
                    username={this.props.currentUser.displayName} groups={this.state.groups}
                    logout={this.props.logout}
                    showGroupMenu={this.showGroupMenu}
                />
                <GroupView
                    user={this.props.currentUser}
                    activeGroup={this.props.activeGroup}
                    storages={this.props.storages}
                />
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            user: this.props.currentUser
        });

        const userId = this.props.currentUser.uid;
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
}