import React, { Component } from "react";
import { userRef } from "../firebase.js";

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
            <div>
                <p>Signed in as: {this.props.user.displayName}</p>
                <button onClick={() => this.props.logout()}>Logout</button>
                <div className="groups">
                    {
                        this.props.groups.map((group) => {
                            return (
                                <button key={group.id} onClick={() => {this.changeGroup(group.id);}}>
                                    <p>{group.groupName}</p>
                                    <p>{group.people}</p>
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