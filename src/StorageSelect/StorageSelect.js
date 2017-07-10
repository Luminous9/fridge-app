import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import NewStorage from "../NewStorage/NewStorage.js";
import styles from "./StorageSelect.css";

export default class StorageSelect extends Component {
    constructor() {
        super();
        this.state = {
            addStorageMenu: false
        };
        this.showStorageMenu = this.showStorageMenu.bind(this);
        this.closeStorageMenu = this.closeStorageMenu.bind(this);
        this.addNewStorage = this.addNewStorage.bind(this);
    }

    showStorageMenu() {
        if (this.props.storages.length < 5) {
            this.setState({
                addStorageMenu: true
            });
        } else {
            alert("You can only have up to 4 storages per group.");
        }
    }

    closeStorageMenu() {
        this.setState({
            addStorageMenu: false
        });
    }

    addNewStorage(storage) {
        this.closeStorageMenu();
        groupRef.child(this.props.group).child("storages").push(storage).then((snapshot) => {
            groupRef.child(this.props.group).child("storages").child(snapshot.key).update({
                id: snapshot.key
            });
        });
    }

    render() {
        return (
            <div className={styles.StorageSelect}>
                <h3>Storages</h3>
                {
                    this.props.storages.map((storage) => {
                        return (
                            <button key={storage.id} onClick={() => { this.props.setActiveStorage(storage.id); }}>{storage.storageName}</button>
                        );
                    })
                }
                {
                    this.props.group ?
                        <div className={styles.addRemove}>
                            <button onClick={this.showStorageMenu}>Add Storage</button>
                            {/*<button>Remove Storage</button>*/}
                        </div>
                        :
                        null
                }
                {
                    this.state.addStorageMenu ?
                        <NewStorage close={this.closeStorageMenu} add={this.addNewStorage} />
                        :
                        null
                }
            </div>
        );
    }
}