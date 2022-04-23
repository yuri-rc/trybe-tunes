import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: null,
      collectionName: null,
      artworkUrl100: null,
      fullObject: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getMusicsAPI();
  }

  getMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
      artworkUrl100: musics[0].artworkUrl100,
      fullObject: musics,
      loaded: true,
    });
  };

  renderTracks = () => {
    const { fullObject } = this.state;
    const trackObject = fullObject.slice(1);
    return trackObject.map((track, index) => (
      <MusicCard
        key={ index }
        trackName={ track.trackName }
        previewUrl={ track.previewUrl }
        trackId={ track.trackId }
        track={ track }
        index={ index }
      />
    ));
  }

  render() {
    const { artistName, collectionName, artworkUrl100, loaded } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loaded ? (
          <div className="album-content">
            <section className="album-section">
              <img src={ artworkUrl100 } alt="" />
              <h1 data-testid="album-name">{ collectionName }</h1>
              <h2 data-testid="artist-name">{ artistName }</h2>
            </section>
            <section className="render-component">
              {this.renderTracks()}
            </section>
          </div>
        )
          : <Loading /> }
        {/* <div>{loaded ? this.renderTracks() : <Loading />}</div> */}
      </div>
    );
  }
}

// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
Album.propTypes = {
  match: PropTypes.exact({
    params: PropTypes.exact({ id: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,

  }).isRequired,
};

export default Album;
