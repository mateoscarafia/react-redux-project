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
const axios = require('axios');

export class UserProfile extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isProfile: false,
      login: false,
      id: null,
      imagePreviewUrl: null,
      imagePreviewUrlP: null,
      editUser: false,
      username: null,
      profession: null,
      about_me: null,
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleImageChangeP = this._handleImageChangeP.bind(this);
  }

  routerMethod = destiny => {
    this.props.history.push(destiny);
    window.scrollTo(0, 0);
  };

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  _handleImageChangeP(e) {
    e.preventDefault();
    let reader = new FileReader();
    let fileP = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        fileP: fileP,
        imagePreviewUrlP: reader.result,
      });
    };
    reader.readAsDataURL(fileP);
  }

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
        localStorage.removeItem('token-app-auth-current');
        window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
      }
      if (user) {
        this.setState({
          login: true,
          id: user.id,
          isProfile: user.id === parseInt(id, 10),
        });
        user.id !== parseInt(id, 10) && this.props.actions.postVisit(id);
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

  sendUpdateUser = async () => {
    const data = new FormData();
    const dataP = new FormData();
    data.append('file', this.state.file);
    dataP.append('file', this.state.fileP);
    let res = await axios.post('http://' + VALUES.BD_ORIGIN + ':3000/file-upload', data, {});
    let resP = await axios.post('http://' + VALUES.BD_ORIGIN + ':3000/file-upload', dataP, {});
    let dataUpdate = {
      token: localStorage.getItem('token-app-auth-current'),
      profile_img_url: res.data.filename || this.props.home.user.data[0].profile_img_url,
      banner_img_url: resP.data.filename || this.props.home.user.data[0].banner_img_url,
      username: this.state.username || this.props.home.user.data[0].username,
      profession: this.state.profession || this.props.home.user.data[0].profession,
      aboutme: this.state.about_me || this.props.home.user.data[0].about_me,
    };
    this.props.actions.editUser(dataUpdate);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.home.editUserPending && nextProps.home.editeduser) {
      NotificationManager.info('Datos guardados');
      this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: this.state.id });
      this.setState({
        editUser: false,
      });
    }
    if (this.props.home.editUserPending && !nextProps.home.editeduser) {
      NotificationManager.warning('Ups, algo fue mal');
    }
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
                ':3000/network_images/' +
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
    let $imagePreview,
      $imagePreviewP = null;
    if (typeof this.props.home.user !== 'undefined') {
      let imagePreviewUrl =
        this.state.imagePreviewUrl ||
        'http://' +
          VALUES.BD_ORIGIN +
          ':3000/network_images/' +
          this.props.home.user.data[0].profile_img_url;
      let imagePreviewUrlP =
        this.state.imagePreviewUrlP ||
        'http://' +
          VALUES.BD_ORIGIN +
          ':3000/network_images/' +
          this.props.home.user.data[0].banner_img_url;
      if (imagePreviewUrl) {
        $imagePreview = <img alt="img-preview" src={imagePreviewUrl} />;
      }
      if (imagePreviewUrlP) {
        $imagePreviewP = <img alt="img-preview" src={imagePreviewUrlP} />;
      }
    }
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
        {typeof this.props.home.user !== 'undefined' &&
          this.state.editUser &&
          this.state.isProfile && (
            <div className="edit-user-modal-absolute">
              <div className="modal-header-edit-user">
                <a className="close-modal-header-edit-user" onClick={() => this.handleModal(false)}>
                  X
                </a>
              </div>
              <div className="form-modal-edit-user">
                <h4>Datos personales</h4>
                <hr />
                <form>
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      name="username"
                      value={
                        this.state.username !== null
                          ? this.state.username
                          : this.props.home.user.data[0].username
                      }
                      className="form-control"
                      onChange={this.handleChange}
                      id="username"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div class="wrapper-image-form">
                    <div class="upload-image-form-editor">
                      <label className="custom-file-upload">
                        <input
                          onChange={this._handleImageChange}
                          type="file"
                          className="inputfile"
                        />
                        Cambiar foto de perfil
                      </label>
                      <div className="show-image-preview-text-editor">{$imagePreview}</div>
                    </div>
                    <div class="upload-image-form-editor margin-left-upload-img">
                      <label className="custom-file-upload">
                        <input
                          onChange={this._handleImageChangeP}
                          type="file"
                          className="inputfile"
                        />
                        Cambiar foto de portada
                      </label>
                      <div className="show-image-preview-text-editor">{$imagePreviewP}</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Profesión</label>
                    <input
                      type="text"
                      name="profession"
                      value={
                        this.state.profession !== null
                          ? this.state.profession
                          : this.props.home.user.data[0].profession
                      }
                      onChange={this.handleChange}
                      className="form-control"
                      id="profession"
                      placeholder="Periodista, columnista.."
                    />
                  </div>
                  <div className="form-group">
                    <label>Presentación</label>
                    <textarea
                      name="about_me"
                      type="text"
                      value={
                        this.state.about_me !== null
                          ? this.state.about_me
                          : this.props.home.user.data[0].about_me
                      }
                      className="form-control"
                      onChange={this.handleChange}
                      id="about_me"
                      rows="3"
                    ></textarea>
                  </div>
                  <hr />
                  <div className="form-group">
                    <label>Cambiar contraseña</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Contraseña actual"
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Contraseña nueva"
                    />
                  </div>
                  <hr />
                  <div className="div-edit-user-button-save-change">
                  <button
                    onClick={() => this.sendUpdateUser()}
                    type="button"
                    className="btn btn-success edit-user-button-form"
                  >
                    Guardar
                  </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
