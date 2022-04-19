import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
    const userName = <p data-testid="header-user-name">{ user.name }</p>;
    return (
      <header data-testid="header-component">
        <nav>
          {/* {setar estilo de cada link https://stackoverflow.com/questions/42630473/react-toggle-class-onclick} */}
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
        {loaded ? userName : <Loading /> }
      </header>
    );
  }
}

export default Header;
