import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
// Components.
import UnitEntryList from './components/UnitEntryList/UnitEntryList';
import UnitEntry from './components/UnitEntry/UnitEntry';
import AppHeader from './components/AppHeader/AppHeader';
import ProductList from './components/ProductList/ProductList';
//Apollo
import { ApolloClient, gql, graphql, ApolloProvider} from 'react-apollo';
// Utilities
import DataSource from './utils/DataSource';
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
          <AppHeader title="Pricey" />
          <Container fluid className="App-content justify-content-center">
            <Row className="justify-content-center">
              <Col xs={12} sm={12} md={10} lg={8} xl={6}>

                <Route exact path="/" render={({ match, history }) => {
                  const items = DataSource.getProducts();
                  return (<ProductList products={items} match={match} history={history} />)
                }} />

                <Route exact path="/Product/:id" render={({ match, history }) => {
                  const entries = DataSource.getEntries();
                  return (<UnitEntryList entries={entries} match={match} history={history} />)
                }} />

                <Route exact path="/Entry/:id?" render={({ match, history }) => {
                  let entry = DataSource.getEntry(match.params.id);
                  return (<UnitEntry {...entry } history={history} />)
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