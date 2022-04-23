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
    // const userName = <p data-testid="header-user-name">{ user.name }</p>;
    if (!loaded) return <Loading />;
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
            className="link"
          >
            Search
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="link"
          >
            Favorites
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
            className="link"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
