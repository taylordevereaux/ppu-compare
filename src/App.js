import React, { Component } from 'react';
import './App.css';
import UnitEntryList from './app/UnitEntryList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ppu-compare</h1>
        </header>
        <UnitEntryList />
      </div>
    );
  }
}

export default App;
