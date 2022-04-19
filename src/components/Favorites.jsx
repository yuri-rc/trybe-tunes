import React from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      favoriteSongs: [],
      // checked: false,
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
        <MusicCard
          key={ index }
          trackName={ track.trackName }
          previewUrl={ track.previewUrl }
          trackId={ Number(track.trackId) }
          track={ track }
          index={ index }
          onClick={ this.onClick }
        />
      ));
    }
  }

  render() {
    const { loaded } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loaded ? this.setFavorites() : <Loading />}
      </div>
    );
  }
}

export default Favorites;
