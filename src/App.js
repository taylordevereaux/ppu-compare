import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
// Components.
import UnitEntryList from './components/UnitEntryList/UnitEntryList';
import UnitEntry from './components/UnitEntry/UnitEntry';
// Utilities
import DataSource from './utilities/DataSource';
// Styles
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header fixed-top">
            <Link to="/">
              <h1 className="App-title text-white h2 m-0">ppu-compare</h1>
            </Link>
          </header>

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