import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import UnitEntryList from './components/UnitEntryList/UnitEntryList';
import UnitEntry from './components/UnitEntryList/UnitEntry/UnitEntry';

window.Entries= [{
  id: 1,
  price: 14.99,
  units: 2,
  description: "SIlk Almond Milk 6 pack",
  location: "Sobeys"
}, {
  id: 2,
  price: 17.23,
  units: 8,
  location: "Super Store"
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: window.Entries
    };
  }
  // handleAdd = (e) => {
  //   const entries = this.state.entries;
  //   const newID = ids.length
  //     ? (ids.reduce(function (a, next) {
  //       return Math.max(a, next);
  //     }) + 1)
  //     : 1;

  //   this.setState((prevState) => ({
  //     ids: [...prevState.ids, newID]
  //   }));
  // }

  handleDone = (entry) => {
    this.setState((prevState, props) => {
      let entries = prevState.entries;
      let existing = entries.find(x => x.id === entry.id);
      if (!existing) {
        entries.push(entry);
      }
      return {
        entries: entry
      };
    });
  }

  find = (id) => {
    console.log('Finding Entry');
    return this.state.entries.find(x => x.id === parseInt(id));
  }

  render() {
    const entries = this.state.entries;
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <h1 className="App-title text-white">ppu-compare</h1>
            </Link>
          </header>

          <Route exact path="/" render={({ match, history }) => (
            <UnitEntryList entries={entries} match={match} history={history} />
          )} />
          <Route path="/Entry/:id?" render={({ match, history }) => (
            <UnitEntry {...this.find(match.params.id)} history={history}  />
          )} />
        </div>
      </Router>
    );
  }
}


export default App;