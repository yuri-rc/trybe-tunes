import React from 'react';
import Header from './Header';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = ({ target: { value } }) => {
    this.setState({ disable: value.length < 2 });
  };

  render() {
    const { disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ this.onChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ disable }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
