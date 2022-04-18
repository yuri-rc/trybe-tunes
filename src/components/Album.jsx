import React from 'react';
import Header from './Header';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
      </div>
    );
  }
}

export default Album;
