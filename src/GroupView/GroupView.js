import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import Storage from "../Storage/Storage.js";

export default class GroupView extends Component {
    render() {
        const getStorages = () => {
            const storages = this.props.storages;
            if (storages.length > 0) {
                return (storages.map((storage) => {
                    return (
                        <Storage
                            key={storage.id}
                            user={this.props.user}
                            storage={storage}
                            group={this.props.activeGroup}
                        />
                    );
                }));
            } else {
                return <p>No storages to display</p>;
            }
        };
        return (
            <div>
                {
                    this.props.activeGroup === false ?
                        <p>You don't have any groups yet.</p>
                        :
                        getStorages()
                }
            </div>
        );
    }
}