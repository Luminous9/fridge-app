import React, { Component } from "react";

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2>Fridge App</h2>
                <button onClick={() => this.props.logout()}>Logout</button>
            </div>
        );
    }
}