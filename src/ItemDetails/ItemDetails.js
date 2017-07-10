import React, { Component } from "react";
import { groupRef } from "../firebase.js";
import styles from "./ItemDetails.css";

export default class ItemDetails extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={styles.ItemDetails}>
                <h3 className={styles.heading}>Item Details</h3>
                {
                    this.props.item ?
                        <div className={styles.itemInfo}>
                            <p>{this.props.item.name}</p>
                            <p>Added: {this.props.item.added}</p>
                            <p>Type: {this.props.item.type}</p>
                            <button onClick={
                                () => {
                                    this.props.setActiveItem(null);
                                    groupRef.child(this.props.group).child("storages").child(this.props.storage).child("items").child(this.props.item.id).remove();
                                }
                            }>
                                Remove
                            </button>
                        </div>
                        :
                        <p>Select an item to see more info</p>
                }
            </div>
        );
    }
}