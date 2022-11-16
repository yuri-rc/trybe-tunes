import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';
import logo from '../images/Group 1 1.svg';
import userIcon from '../images/default.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: '',
    };
    this.getUserAPI = this.getUserAPI.bind(this);
  }

  componentDidMount() {
    this.getUserAPI();
  }

  getUserAPI = async () => {
    this.setState({ user: await getUser(), loaded: true });
  };

  render() {
    const { user, loaded } = this.state;
    const selectedStyle = { backgroundColor: '#036B52', color: 'white' };
    if (!loaded) return <Loading />;
    const location = window.location.pathname;
    return (
      <header className="header-component" data-testid="header-component">
        <section className="header-section">
          <img className="logo-img" src={ logo } alt="trybetynes logo" />
          <section className="user-section">
            <img className="user-icon" src={ userIcon } alt="user icon" />
            <p data-testid="header-user-name">{ user.name }</p>
            {/* {loaded ? userName : null} */}
          </section>
        </section>
        <nav>
          {/* {setar estilo de cada link https://stackoverflow.com/questions/42630473/react-toggle-class-onclick} */}
          <Link
            data-testid="link-to-search"
            to="/search"
            style={ location === '/search'
              ? selectedStyle : null }
            className="link"
          >
            Search
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            style={ location === '/favorites'
              ? selectedStyle : null }
            className="link"
          >
            Favorites
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
            style={ location === '/profile' || location === '/profile/edit'
              ? selectedStyle : null }
            className="link"
          >
            <button type="button">Click</button>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
