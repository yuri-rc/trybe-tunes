import React from 'react';
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
        <h1>Header</h1>
        {loaded ? userName : <Loading /> }
      </header>
    );
  }
}

export default Header;
