import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Modal from 'react-awesome-modal';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//Components
import NavBar from './NavBar';
import UserHeader from './UserHeader';
import Footer from './Footer';

const jwt = require('jsonwebtoken');

export class UserProfile extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { isProfile: false, login: false, id: null };
  }

  routerMethod = destiny => {
    this.props.history.push(destiny);
    window.scrollTo(0, 0);
  };

  handleModal = action => {
    this.setState({
      editUser: action,
    });
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    //Is user logged user profile
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        this.props.actions.getCategories();
      }
      if (user) {
        this.setState({
          login: true,
          id: user.id,
        });
        user.id === parseInt(id, 10)
          ? this.setState({
              isProfile: true,
            })
          : this.props.actions.postVisit(id);
      }
    }
    //For every user
    this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: id });
    this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: id });
    this.props.actions.getCategories();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendUpdateUser = () => {
    let data = {
      token: VALUES.DEEP_TOKEN,
      username: this.state.username !== '' ? this.state.username : null,
      profession: this.state.userprofession,
      aboutme: this.state.userpresentation,
      id: this.state.id,
    };
    this.props.actions.editUser(data);
  };

  componentWillReceiveProps(nextProps) {
    this.props.home.editUserPending
      ? nextProps.home.editeduser
        ? NotificationManager.info('Datos guardados')
        : NotificationManager.warning('Ups, algo fue mal')
      : null;
  }

  buildNews = () => {
    return this.props.home.userarticles.data.map(item => {
      return (
        <div key={item.title + '-' + item.id} className="news-conts">
          <div
            className="img-div"
            onClick={() => this.routerMethod('../news/' + item.id, item.id)}
            style={{
              backgroundImage: `url(${'http://' +
                VALUES.BD_ORIGIN +
                ':3000/article_images/' +
                item.img_url})`,
            }}
          >
            <div className="img-div-news-category">{item.name}</div>
          </div>
          <div className="p-div">
            <p
              className="p-div-title-text"
              onClick={() => this.routerMethod('../news/' + item.id, item.id)}
            >
              {item.title}
            </p>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="home-user-profile">
        {typeof this.props.home.categories !== 'undefined' &&
          typeof this.props.home.user !== 'undefined' && (
            <NavBar
              login={this.state.login}
              history={this.props.history}
              categories={this.props.home.categories}
              user={this.state.id}
            />
          )}
        <div className="user-profile-wrapper">
          {typeof this.props.home.user !== 'undefined' && (
            <UserHeader
              isProfile={this.state.isProfile}
              user={this.props.home.user.data[0]}
              user_id={this.props.match.params.id}
            />
          )}
        </div>
        <div className="profile-wrapper-content">
          {typeof this.props.home.user !== 'undefined' && (
            <div className="about-me-user-profile">
              <h4>
                {this.props.home.user.data[0].username}
                {this.state.isProfile && (
                  <img
                    alt="edit"
                    onClick={() => this.handleModal(true)}
                    className="edit-pen-user-profile-style"
                    src={require('../../images/edit-pen.PNG')}
                  />
                )}
              </h4>
              <h5 className="country-city-user-profile">
                {/*'Argentina - ' + this.props.home.fulluser.data.user.state.name*/}
              </h5>
              <p>{this.props.home.user.data[0].about_me}</p>
            </div>
          )}
          <div className="user-profile-wrapper-content">
            <p className="user-profile-wrapper-content-title">
              {typeof this.props.home.user !== 'undefined' &&
                !this.state.isProfile &&
                'Publicaciones de ' + this.props.home.user.data[0].username}
              {this.state.isProfile && 'Tus publicaciones'}
            </p>
            <div className="row">
              {typeof this.props.home.userarticles !== 'undefined' && this.buildNews()}
            </div>
          </div>
        </div>
        <Footer />
        <Modal
          visible={this.state.editUser && this.state.isProfile}
          width="500px"
          height="650px"
          borderRadius="0px"
          effect="fadeInDown"
          onClickAway={() => this.handleModal(false)}
        >
          <div className="modal-header-edit-user">
            <a className="close-modal-header-edit-user" onClick={() => this.handleModal(false)}>
              X
            </a>
          </div>
          <div className="form-modal-edit-user">
            <form>
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={this.handleChange}
                  id="username"
                  placeholder="Nombre completo"
                />
              </div>
              <div className="form-group">
                <input type="file" name="file" id="file" className="inputfile" />
                <label>Foto de perfil</label>
              </div>
              <div className="form-group">
                <label>Profesión</label>
                <input
                  type="text"
                  name="userprofession"
                  onChange={this.handleChange}
                  className="form-control"
                  id="userprofession"
                  placeholder="Periodista, columnista.."
                />
              </div>
              <div className="form-group">
                <label>Example select</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>Buenos Aires</option>
                  <option>Catamarca</option>
                  <option>Chaco</option>
                  <option>Chubut</option>
                  <option>Córdoba</option>
                  <option>Corrientes</option>
                  <option>Entre Ríos</option>
                  <option>Formosa</option>
                  <option>Jujuy</option>
                  <option>La Pampa</option>
                  <option>La Rioja</option>
                  <option>Mendoza</option>
                  <option>Misiones</option>
                  <option>Neuquén</option>
                  <option>Rio Negro</option>
                  <option>Salta</option>
                  <option>San Juan</option>
                  <option>San Luis</option>
                  <option>Santa Cruz</option>
                  <option>Santa Fe</option>
                  <option>Santiago del Estero</option>
                  <option>Tierra del Fuego</option>
                  <option>Tucumán</option>
                </select>
              </div>
              <div className="form-group">
                <label>Presentación</label>
                <textarea
                  name="userpresentation"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  id="userpresentation"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Cambiar contraseña</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Contraseña nueva"
                />
              </div>
              <button
                onClick={() => this.sendUpdateUser()}
                type="button"
                className="btn btn-success edit-user-button-form"
              >
                Guardar
              </button>
            </form>
          </div>
        </Modal>
        <NotificationContainer />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
