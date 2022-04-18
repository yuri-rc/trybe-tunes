import React from 'react';
import Header from './Header';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
      </div>
    );
  }
}

export default Profile;
