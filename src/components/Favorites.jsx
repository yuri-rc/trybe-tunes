import React from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import './Favorites.css';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    this.setState({
      loaded: false,
    }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ loaded: true, favoriteSongs });
    });
  }

  onClick = async ({ target: { id } }) => {
    const { favoriteSongs } = this.state;
    const song = favoriteSongs.filter((q) => q.trackId === Number(id));
    await removeSong(song);
    this.setState({
      loaded: false,
    }, async () => {
      this.setState({ loaded: true, favoriteSongs: await getFavoriteSongs() });
    });
  }

  setFavorites = () => {
    const { favoriteSongs } = this.state;
    if (favoriteSongs.length > 0) {
      return favoriteSongs.map((track, index) => (
        <div
          key={ index }
          className="favorite-music"
        >
          <img src={ track.artworkUrl100 } alt="" />
          <MusicCard
            trackName={ track.trackName }
            previewUrl={ track.previewUrl }
            trackId={ Number(track.trackId) }
            track={ track }
            index={ index }
            onClick={ this.onClick }
          />
        </div>
      ));
    }
  }

  render() {
    const { loaded } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1 className="favorite-h1">Músicas favoritas:</h1>
        <section className="favorites-component">
          {loaded ? this.setFavorites() : <Loading />}
        </section>
      </div>
    );
  }
}

export default Favorites;
