import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './Search.css';

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
      this.setState({ search: '', loaded: true, searchObject, disable: true });
    });
  }

  buildSearch = () => {
    const { searched, searchObject } = this.state;
    const searcjRequest = (
      <>
        <h1>{`Resultado de álbuns para: ${searched}`}</h1>
        <div className="albums-result">
          {searchObject.map((album, index) => {
            const { collectionId } = album;
            return (
              <div key={ index }>
                <Link
                  style={ { textDecoration: 'none' } }
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  <div className="card-div">
                    <img src={ album.artworkUrl100 } alt="" />
                    <p className="album-name">{album.collectionName}</p>
                    <p className="artist-name">{album.artistName}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
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
      <div className="search-component" data-testid="page-search">
        <Header />
        <section>
          <input
            placeholder="Nome do Artista"
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
        </section>
        {clicked ? condition : null}
      </div>
    );
  }
}

export default Search;
