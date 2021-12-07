import React, { Component } from "react";

export default class W3C_Filter extends Component {
    render() {
        return (
            <div>
                <h2>W3C Filter</h2>
                {this.props.state.filterd ? (
                    <button onClick={this.props.clearFilter}>
                        clear filter
                    </button>
                ) : (
                    <button disabled>clear filter</button>
                )}
                <br />
                <br />
                <p
                    onClick={() =>
                        this.props.setState({ id: "", filtering: true })
                    }
                    className={this.props.state.id && "link"}
                >
                    Id:
                </p>
                <input
                    type="number"
                    name="id"
                    id="id"
                    value={this.props.state.id}
                    onChange={this.props.handlefilter}
                />
                <p
                    onClick={() =>
                        this.props.setState({ name: "", filtering: true })
                    }
                    className={this.props.state.name && "link"}
                >
                    Name:
                </p>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={this.props.state.name}
                    onChange={this.props.handlefilter}
                />
            </div>
        );
    }
}
