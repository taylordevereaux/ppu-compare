import React, { Component } from 'react';
import UnitEntryListItem from './UnitEntryListItem/UnitEntryListItem';
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
// import { calculatePPU } from '../../utilities/calculatePPU';
import './UnitEntryList.css';

class UnitEntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [{
                id: 1,
                price: 14.99,
                units: 123,
                description: "SIlk Almond Milk 6 pack",
                location: "Sobeys"
            },{
                id: 2,
                price: 17.23,
                units: 899,
                location: "Super Store"
            }]
        };
    }

    handleAdd = (e) => {
        const entries = this.state.entries;
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
        const entries = this.state.entries;
        return (
            <Container fluid={true} className="px-0">
                <Row className="justify-content-center">
                    <Col sm="12" md="12" lg={{ size: 8, offset: 1}} xl={{ size: 6, offset: 2}} >
                        <ListGroup>
                            {entries.map((entry) =>
                                <UnitEntryListItem key={entry.id.toString()} {...entry} onRemove={this.handleRemove} />
                                )}
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Button type="button" value="submit" color="link" onClick={this.handleAdd}>Add New Entry</Button>
                </Row>
            </Container>
        );
    }
}

export default UnitEntryList;