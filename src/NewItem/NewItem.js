import React, { Component } from "react";
import styles from "./NewItem.css";

export default class NewItem extends Component {
    constructor() {
        super();
        this.state = {
            itemName: "",
            itemType: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const date = new Date();
        const item = {
            name: this.state.itemName,
            type: this.state.itemType,
            added: date.toDateString()
        };
        this.props.add(item);
    }

    render() {
        return (
            <div className={styles.NewItem}>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="itemName">Item Name:</label>
                    <input name="itemName" value={this.state.itemName} onChange={this.handleChange} type="text" autoFocus required />
                    <select name="itemType" onChange={this.handleChange} required>
                        <option value="" disabled selected>Type</option>
                        <option value="meat">Meat</option>
                        <option value="fruits/veggies">Fruits/Veggies</option>
                        <option value="grain">Grain</option>
                        <option value="dairy">Dairy</option>
                        <option value="other">Other</option>
                    </select>
                    <button>Add</button>
                </form>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        );
    }
}