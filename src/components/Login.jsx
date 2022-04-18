import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  render() {
    const { onChange, onClick, disable } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <input
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
