import React, { Component } from "react";

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
        const item = {
            name: this.state.itemName,
            type: this.state.itemType
        };
        this.props.add(item);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="itemName" value={this.state.itemName} onChange={this.handleChange} type="text" autoFocus required />
                    <select name="itemType" onChange={this.handleChange} required>
                        <option value="" disabled selected>Type</option>
                        <option value="meat">Meat</option>
                        <option value="vegies">Vegies/Fruits</option>
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