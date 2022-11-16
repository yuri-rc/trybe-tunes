import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import icon from '../images/account_circle_24px.svg';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loaded: true,
    };
  }

  componentDidMount() {
    this.getUserAPI();
  }

  getUserAPI = async () => {
    // console.log(await getUser());
    // eslint-disable-next-line no-unused-vars
    const { name, description, email, image } = await getUser();
    this.setState({
      loaded: false,
      name,
      // eslint-disable-next-line max-len
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae nam architecto, sequi aliquam fugit quibusdam rerum omnis consectetur ipsam tempora esse, eveniet quae quo? Recusandae atque libero quod voluptate nulla.',
      image: image === '' ? icon : image,
      email: 'teste@gmail.com',
    }, () => {
      this.setState({ loaded: true });
    });
  }

  render() {
    const { name, description, email, image, loaded } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loaded ? (
          <div className="profile-content">
            <section>
              <section className="image-button-section">
                <img data-testid="profile-image" src={ image } alt="" />
                <Link className="Link" to="/profile/edit">
                  Editar perfil
                </Link>
              </section>
              <section>
                <h1>Nome</h1>
                <p>{ name }</p>
              </section>
              <section>
                <h1>E-mail</h1>
                <p>{ email }</p>
              </section>
              <section>
                <h1>Descrição</h1>
                <p>{ description }</p>
              </section>
            </section>
          </div>
        ) : <Loading />}
      </div>
    );
  }
}

export default Profile;
