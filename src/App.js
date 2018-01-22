import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
// Components.
import UnitEntryList from './components/UnitEntryList/UnitEntryList';
import UnitEntry from './components/UnitEntry/UnitEntry';
import AppHeader from './components/AppHeader/AppHeader';
// Utilities
import DataSource from './utilities/DataSource';
// Styles
import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Router basename="/ppu-compare">
        <div className="App">
          <AppHeader title="Pricey" />
          <Container fluid className="App-content justify-content-center">
            <Row className="justify-content-center">
              <Col xs={12} sm={12} md={10} lg={8} xl={6}>

                <Route exact path="/" render={({ match, history }) => {
                  const entries = DataSource.getEntries();
                  return !!entries.length ? (
                    <UnitEntryList entries={entries} match={match} history={history} />
                  ) : <Redirect to="/Entry/" />
                }} />
                <Route path="/Entry/:id?" render={({ match, history }) => {
                  let entry = DataSource.getEntry(match.params.id);
                  return (
                    <UnitEntry {...entry } history={history} />
                  )
                }} />

              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}


export default App;