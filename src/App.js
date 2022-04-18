import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.renderRoutes = this.renderRoutes.bind(this);
  }

  renderRoutes() {
    return (
      <Switch>
        <Route exact path="/album/:id" render={ () => (<Album />) } />
        <Route exact path="/search" render={ () => (<Search />) } />
        <Route exact path="/favorites" render={ () => (<Favorites />) } />
        <Route exact path="/profile" render={ () => (<Profile />) } />
        <Route exact path="/profile/:edit" render={ () => (<ProfileEdit />) } />
        <Route exact path="/" render={ () => (<Login />) } />
        <Route exact component={ NotFound } />
      </Switch>
    );
  }

  render() {
    return (
      <div>
        {this.renderRoutes() }
      </div>
    );
  }
}

export default App;
