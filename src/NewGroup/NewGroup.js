import React, { Component } from "react";
import styles from "./NewGroup.css";

export default class NewGroup extends Component {
    constructor() {
        super();
        this.state = {
            newGroupName: "",
            message: "",
            showMessage: false
        };
        this.newGroupNameChange = this.newGroupNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    newGroupNameChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.checkNameExists() === false) {
            const group = {
                metaData: {
                    groupName: this.state.newGroupName.toUpperCase(),
                    people: 1
                }
            };
            this.props.submit(group);
        } else {
            this.setState({
                message: "A group with this name already exists.",
                showMessage: true
            });
        }
    }

    checkNameExists() {
        const newName = this.state.newGroupName;
        let nameExists = false;
        this.props.groups.forEach((group) => {
            if (group.groupName === newName) {
                nameExists = true;
            }
        });
        return nameExists;
    }

    closeMenu() {
        this.props.close();
    }

    render() {
        return (
            <div className={styles.NewGroup}>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="newGroupName">Group Name:</label>
                    <input name="newGroupName" value={this.state.newGroupName} onChange={this.newGroupNameChange} type="text" placeholder="Home/Office/etc." autoFocus/>
                    <button>Add</button>
                    {this.state.showMessage ? <p>{this.state.message}</p> : null}
                    <p className={styles.tempMessage}>Joining other users' groups coming soon.</p>
                </form>
                <button onClick={this.closeMenu}>Close</button>
            </div>
        );
    }

    componentWillMount() {
        this.setState({
            groups: this.props.groups
        });
    }
}