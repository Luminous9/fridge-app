import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import NewStorage from "../NewStorage/NewStorage.js";

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
        this.setState({
            addStorageMenu: true
        });
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
            <div>
                {
                    this.props.storages.map((storage) => {
                        return (
                            <button key={storage.id} onClick={() => {this.props.setActiveStorage(storage.id);}}>{storage.storageName}</button>
                        );
                    })
                }
                <button onClick={this.showStorageMenu}>Add Storage</button>
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