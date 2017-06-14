import React, { Component } from "react";
import { groupRef } from "../firebase.js";

export default class StorageSelect extends Component {
    constructor() {
        super();
        this.state = {
            storageName: ""
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
        const storage = {
            storageName: this.state.storageName,
            items: false
        };
        this.props.add(storage);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="storageName" value={this.state.storageName} onChange={this.handleChange} type="text" autoFocus required />
                    <button>Add</button>
                </form>
                <button onClick={this.props.close}>Cancel</button>
            </div>
        );
    }
}