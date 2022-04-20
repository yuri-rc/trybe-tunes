import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import logo from '../images/LOGO_POSITIVA 1.svg';

class Login extends React.Component {
  render() {
    const { onChange, onClick, disable } = this.props;
    return (
      <div className="component" data-testid="page-login">
        <img src={ logo } alt="trybetynes logo" />
        <form>
          <input
            placeholder="Nome"
            onChange={ onChange }
            type="text"
            data-testid="login-name-input"
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ onClick }
            disabled={ disable }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default Login;
