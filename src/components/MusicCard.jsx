import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
// import { Redirect } from 'react-router-dom';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: true,
    };
  }

  addFavorite = () => {
    // console.log('click');
    const { track } = this.props;
    this.setState({
      loaded: false,
    }, async () => {
      await addSong(track);
      this.setState({ loaded: true });
    });
    // console.log(await getFavoriteSongs());
  }

  render() {
    const { trackName, previewUrl, trackId, index } = this.props;
    const { loaded } = this.state;
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
        <label htmlFor={ index }>
          Favorita
          <input
            id={ index }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.addFavorite }
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
  index: PropTypes.number.isRequired,
  track: PropTypes.shape({}).isRequired,
};

export default MusicCard;
