import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import Storage from "../Storage/Storage.js";
import StorageSelect from "../StorageSelect/StorageSelect.js";
import ItemDetails from "../ItemDetails/ItemDetails.js";
import styles from "./GroupView.css";

export default class GroupView extends Component {
    constructor() {
        super();
        this.state = {
            activeStorage: null,
            activeItem: null
        };
        this.setActiveStorage = this.setActiveStorage.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);
    }

    setActiveStorage(storageId) {
        this.setState({
            activeStorage: storageId
        });
    }

    setActiveItem(item) {
        this.setState({
            activeItem: item
        })
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
                    if (!currentStorage) {
                        currentStorage = this.props.storages[0];
                    }
                }
                return (
                    <Storage
                        user={this.props.user}
                        storage={currentStorage}
                        group={this.props.activeGroup}
                        setActiveItem={this.setActiveItem}
                        setActiveStorage={this.setActiveStorage}
                    />
                );
            } else {
                return <p className={styles.message}>No storages to display</p>;
            }
        };
        return (
            <div className={styles.GroupView}>
                <StorageSelect
                    storages={this.props.storages}
                    group={this.props.activeGroup}
                    setActiveStorage={this.setActiveStorage}
                />
                {
                    this.props.activeGroup === false ?
                        <p className={styles.message}>You don't have any groups yet.</p>
                        :
                        getStorages()
                }
                <ItemDetails
                    item={this.state.activeItem}
                    setActiveItem={this.setActiveItem}
                    group={this.props.activeGroup}
                    storage={this.state.activeStorage}
                />
            </div>
        );
    }

    componentDidMount() {
        const storages = this.props.storages;
        if (storages.length > 0) {
            let currentStorage;
            if (this.state.activeStorage === null) {
                currentStorage = this.props.storages[0];
                this.setActiveStorage(currentStorage.id);
            }
        }
    }
}