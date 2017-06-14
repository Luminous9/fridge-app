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
            let newGroupKey = snapshot.key;
            groupRef.child(newGroupKey).child("metaData").update({
                id: newGroupKey
            });
            userRef.child(userId).update({ activeGroup: newGroupKey });
            userGroupsRef.update({ [newGroupKey]: true });

            groupRef.child(newGroupKey).child("storages").push({
                storageName: "Main Fridge",
                items: false
            }).then((snapshot) => {
                groupRef.child(newGroupKey).child("storages").child(snapshot.key).update({
                    id: snapshot.key
                });
            });
        });
    }

    render() {
        return (
            <div>
                <h2>Fridge App</h2>
                {this.state.newGroupMenu ?
                    <NewGroup submit={this.addNewGroup} groups={this.state.groups} close={this.closeGroupMenu} /> : null
                }
                <NavPanel
                    user={this.props.currentUser}
                    groups={this.props.groups}
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
    }
}