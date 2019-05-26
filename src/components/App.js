import React, { Component } from 'react';
import '../styles/App.css';
import Navbar from './Navbar';
import Main from './Main';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    )
  }
}