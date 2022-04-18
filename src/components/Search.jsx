import React from 'react';
import Header from './Header';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
      </div>
    );
  }
}

export default Search;
