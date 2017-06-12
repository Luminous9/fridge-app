import React, { Component } from "react";

export default class GroupView extends Component {
    render() {
        const showGroup = () => {
            if (this.props.activeGroup === false) {
                return <p>You don't have any groups yet.</p>;
            } else {
                return <p>a group</p>;
            }
        };
        return (
            <div>
                {
                    (this.props.activeGroup === null) ?
                        <p>Loading...</p>
                        :
                        showGroup()
                }
            </div>
        );
    }
}