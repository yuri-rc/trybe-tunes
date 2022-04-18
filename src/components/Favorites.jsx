import React from 'react';
import Header from './Header';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
      </div>
    );
  }
}

export default Favorites;
