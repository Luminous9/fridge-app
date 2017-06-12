import React, { Component } from "react";

export default class NavPanel extends Component {
    render() {
        return (
            <div>
                <p>Signed in as: {this.props.username}</p>
                <button onClick={() => this.props.logout()}>Logout</button>
                <div className="groups">
                    {
                        this.props.groups.map((group) => {
                            return (
                                <div key={group.id}>
                                    <p>{group.groupName}</p>
                                    <p>{group.people}</p>
                                </div>
                            );
                        })
                    }
                    <button onClick={this.props.showGroupMenu}>New Group</button>
                </div>
            </div>
        );
    }
}