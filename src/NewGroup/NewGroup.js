import React, { Component } from "react";

export default class NewGroup extends Component {
    constructor() {
        super();
        this.state = {
            newGroupName: "",
            message: "",
            showMessage: false,
            groups: []
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
                    groupName: this.state.newGroupName,
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
        this.state.groups.forEach((group) => {
            if (group.name === newName) {
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="newGroupName" value={this.state.new} onChange={this.newGroupNameChange} type="text" autoFocus/>
                    {this.state.showMessage ? <p>{this.state.message}</p> : null}
                    <button>Add</button>
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