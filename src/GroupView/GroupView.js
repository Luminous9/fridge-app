import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import Storage from "../Storage/Storage.js";
import StorageSelect from "../StorageSelect/StorageSelect.js";

export default class GroupView extends Component {
    constructor() {
        super();
        this.state = {
            activeStorage: null
        };
        this.setActiveStorage = this.setActiveStorage.bind(this);
    }

    setActiveStorage(storageId) {
        this.setState({
            activeStorage: storageId
        });
    }

    render() {
        const getStorages = () => {
            const storages = this.props.storages;
            if (storages.length > 0) {
                let currentStorage;
                if (this.state.activeStorage === null) {
                    currentStorage = this.props.storages[0];
                } else {
                    currentStorage = storages.filter((storage) => {
                        return this.state.activeStorage === storage.id
                    })[0];
                }
                return (
                    <Storage
                        user={this.props.user}
                        storage={currentStorage}
                        group={this.props.activeGroup}
                    />
                );
            } else {
                return <p>No storages to display</p>;
            }
        };
        return (
            <div>
                <StorageSelect
                    storages={this.props.storages}
                    group={this.props.activeGroup}
                    setActiveStorage={this.setActiveStorage}
                />
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