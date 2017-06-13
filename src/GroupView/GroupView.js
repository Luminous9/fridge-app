import React, { Component } from "react";
import { groupRef } from "../firebase.js";

export default class GroupView extends Component {
    render() {
        console.log(this.props.storages);
        const getStorages = () => {
            if (this.props.storages.length > 0) {
                return <p>{this.props.storages[0].storageName}</p>;
            } else {
                return <p>LOADING</p>;
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