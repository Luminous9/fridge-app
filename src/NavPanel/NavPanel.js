import React, { Component } from "react";
import { userRef } from "../firebase.js";
import styles from "./NavPanel.css";

export default class NavPanel extends Component {
    constructor() {
        super();
        this.changeGroup = this.changeGroup.bind(this);
    }

    changeGroup(groupId) {
        userRef.child(this.props.user.uid).update({
            activeGroup: groupId
        });
    }

    render() {
        return (
            <div className={styles.NavPanel}>
                <div className={styles.user}>
                    <p className={styles.name}>{this.props.user.displayName}</p>
                    <button onClick={() => this.props.logout()}>Logout</button>
                </div>
                <h1 className={styles.heading}>What's In My Fridge?</h1>
                <div className={styles.groups}>
                    {
                        this.props.groups.map((group) => {
                            return (
                                <button key={group.id} onClick={() => {this.changeGroup(group.id);}}>
                                    {group.groupName}
                                </button>
                            );
                        })
                    }
                    <button onClick={this.props.showGroupMenu}>New Group</button>
                </div>
            </div>
        );
    }
}