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
            for (var item in items) {
                return (
                    <div>
                        <p>{item.name}</p>
                    </div>
                );
            }
        };
        return (
            <div>
                <p>{this.props.storage.storageName}</p>
                <button onClick={this.showAddItem}>Add Item</button>
                {
                    this.state.addItemMenu ?
                        <NewItem close={this.closeAddItem} />
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