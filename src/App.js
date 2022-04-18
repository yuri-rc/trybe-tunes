import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import { createUser } from './services/userAPI';
import Loading from './components/Loading';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disable: true,
      logado: false,
      isLoading: false,
    };
    this.renderRoutes = this.renderRoutes.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange = ({ target }) => {
    const MIN_LENGTH = 3;
    this.setState({
      name: target.value,
    });
    this.setState({ disable: target.value.length < MIN_LENGTH });
  }

  onClick = () => {
    const { name } = this.state;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name });
      this.setState({
        isLoading: false,
        logado: true,
      });
    });
  }

  renderRoutes = () => {
    const { name, logado, isLoading, disable } = this.state;
    const login = (
      <Login
        name={ name }
        onChange={ this.onChange }
        onClick={ this.onClick }
        disable={ disable }
      />
    );
    return (
      <Switch>
        <Route
          exact
          path="/album/:id"
          render={ () => (
            <Album />
          ) }
        />
        <Route exact path="/search" render={ () => (<Search />) } />
        <Route exact path="/favorites" render={ () => (<Favorites />) } />
        <Route exact path="/profile" render={ () => (<Profile />) } />
        <Route
          exact
          path="/profile/:edit"
          render={ () => (
            <ProfileEdit />
          ) }
        />
        <Route
          exact
          path="/"
        >
          {isLoading ? <Loading /> : login}
          {logado ? <Redirect to="/search" />
            : null}
        </Route>
        <Route exact component={ NotFound } />
      </Switch>
    );
  }

  render() {
    // const {  } = this.state;
    return (
      <div>
        { this.renderRoutes() }
      </div>
    );
  }
}

export default App;
