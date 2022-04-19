import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// import { Redirect } from 'react-router-dom';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
      checked: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    const { trackId } = this.props;
    this.setState({
      loaded: false,
    }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      const isFavorite = favoriteSongs.some((song) => song.trackId === trackId);
      this.setState({ loaded: true, checked: isFavorite });
    });
  }

  addFavorite = () => {
    const { track } = this.props;
    const { checked } = this.state;
    this.setState({
      loaded: false,
    }, async () => {
      if (checked) {
        await removeSong(track);
        this.setState({ loaded: true, checked: false });
      } else {
        await addSong(track);
        this.setState({ loaded: true, checked: true });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loaded, checked } = this.state;
    return (
      <>
        {loaded ? null : <Loading />}
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.addFavorite }
            checked={ checked }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  track: PropTypes.shape({}).isRequired,
};

export default MusicCard;
