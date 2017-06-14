import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import NewItem from "../NewItem/NewItem.js";

export default class Storage extends Component {
    constructor() {
        super();
        this.state = {
            addItemMenu: false
        };
        this.showAddItem = this.showAddItem.bind(this);
        this.closeAddItem = this.closeAddItem.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
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
                    id: items[item].id
                });
            }
            return (itemsArray.map((item) => {
                return (
                    <div key={item.id}>
                        <p>{item.name}</p>
                    </div>
                );
            }));
        };
        return (
            <div>
                <p>{this.props.storage.storageName}</p>
                <button onClick={this.showAddItem}>Add Item</button>
                {
                    this.state.addItemMenu ?
                        <NewItem close={this.closeAddItem} add={this.addNewItem} />
                        :
                        null
                }
                <div>
                    {checkItems()}
                </div>
            </div>
        );
    }
}