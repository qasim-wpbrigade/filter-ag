import React, { Component } from "react";

export default class W3C_Edit extends Component {
    render() {
        return (
            <div>
                <h2>W3C Save</h2>
                <button>save</button>
                <br />
                <br />
                <div className="flex">
                    <p>Id:</p>
                    <input
                        type="number"
                        name="sid"
                        id="sid"
                        value={this.props.state.sid}
                    />
                </div>
                <div className="flex">
                    <p>Name:</p>
                    <input
                        type="text"
                        name="sname"
                        id="sname"
                        value={this.props.state.sname}
                    />
                </div>
            </div>
        );
    }
}
