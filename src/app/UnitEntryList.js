import React, { Component } from 'react';
import UnitEntry from './UnitEntry'

class UnitEntryList extends Component {
    constructor(props) {
        super(props);
        const id = 1;
        this.state = {
            ids: [id]
        };
    }

    handleAdd = (e) => {
        const ids = this.state.ids;
        const newID = ids.length 
        ? (ids.reduce(function(a, next) {
                return Math.max(a, next);
            }) + 1)
        : 1;

        this.setState((prevState) => ({
            ids: [...prevState.ids, newID]
        }));
    }

    handleRemove = (removeId) => {
        this.setState((prevState) => ({
            ids: prevState.ids.filter((id) => { return id !== removeId })
        }));
    }

    render() {
        const ids = this.state.ids;
        return (
            <div>
                <ul className="unit-entry-list">
                    {ids.map((id) => <UnitEntry key={id.toString()} id={id} onRemove={this.handleRemove} />)}
                </ul>
                <button type="button" value="submit" onClick={this.handleAdd}>Add</button>
            </div>
        );
    }
}

export default UnitEntryList;