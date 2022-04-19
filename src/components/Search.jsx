import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searched: '',
      searchObject: '',
      disable: true,
      clicked: false,
      loaded: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.buildSearch = this.buildSearch.bind(this);
  }

  onChange = ({ target: { value } }) => {
    this.setState({ disable: value.length < 2, search: value });
  }

  onClick = () => {
    const { search } = this.state;
    this.setState({
      loaded: false,
      clicked: true,
      searched: search,
    }, async () => {
      const searchObject = await searchAlbumsAPI(search);
      this.setState({ search: '', loaded: true, searchObject });
    });
  }

  buildSearch = () => {
    const { searched, searchObject } = this.state;
    const searcjRequest = (
      <>
        <h1>{`Resultado de álbuns de: ${searched}`}</h1>
        {searchObject.map((album, index) => {
          const { collectionId } = album;
          return (
            <div key={ index }>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                <div>
                  <img src={ album.artworkUrl100 } alt="" />
                  <p>{ album.collectionName }</p>
                  <p>{ album.artistName }</p>
                </div>
              </Link>
            </div>
          );
        })}
      </>
    );
    const albumNotFound = (
      <h1>Nenhum álbum foi encontrado</h1>
    );
    return searchObject.length === 0 ? albumNotFound : searcjRequest;
  }

  render() {
    const { disable, search, loaded, clicked } = this.state;
    const condition = loaded ? this.buildSearch() : <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ this.onChange }
          value={ search }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ disable }
          onClick={ this.onClick }
        >
          Pesquisar
        </button>
        {clicked ? condition : null}
      </div>
    );
  }
}

export default Search;
