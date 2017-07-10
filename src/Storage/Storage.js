import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import NewItem from "../NewItem/NewItem.js";
import styles from "./Storage.css";

export default class Storage extends Component {
    constructor() {
        super();
        this.state = {
            addItemMenu: false
        };
        this.showAddItem = this.showAddItem.bind(this);
        this.closeAddItem = this.closeAddItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.deleteStorage = this.deleteStorage.bind(this);
    }

    showAddItem() {
        this.setState({
            addItemMenu: true
        });
    }

    closeAddItem() {
        this.setState({
            addItemMenu: false
        });
    }

    addNewItem(item) {
        this.closeAddItem();
        const itemsRef = groupRef.child(this.props.group).child("storages").child(this.props.storage.id).child("items");
        itemsRef.push(item).then((snapshot) => {
            itemsRef.child(snapshot.key).update({
                id: snapshot.key
            });
        });
    }

    deleteStorage() {
        this.props.setActiveStorage(null);
        groupRef.child(this.props.group).child("storages").child(this.props.storage.id).remove();
    }

    render() {
        const checkItems = () => {
            const items = this.props.storage.items;
            if (items) {
                return showItems(items);
            } else {
                return <p>So empty O.o</p>;
            }
        };
        const showItems = (items) => {
            const itemsArray = [];
            for (var item in items) {
                itemsArray.push({
                    name: items[item].name,
                    added: items[item].added,
                    type: items[item].type,
                    id: items[item].id
                });
            }
            return (itemsArray.map((item) => {
                return (
                    <button
                        key={item.id}
                        className= {item.type + " " + styles.item}
                        onClick={() => {
                            this.props.setActiveItem(item);
                        }}
                    >
                        <p>{item.name}</p>
                    </button>
                );
            }));
        };
        return (
            <div className={styles.Storage}>
                <div className={styles.header}>
                    <button onClick={this.deleteStorage}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <h2>{this.props.storage.storageName}</h2>
                    <button onClick={this.showAddItem}><i className="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                {
                    this.state.addItemMenu ?
                        <NewItem close={this.closeAddItem} add={this.addNewItem} />
                        :
                        null
                }
                <div className={styles.items} >
                    {checkItems()}
                </div>
            </div>
        );
    }
}