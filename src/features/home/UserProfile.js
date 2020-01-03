import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
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
      password1: null,
      password2: null,
      openMyFollowers: false,
      openMyFollowings: false,
      openMyReaders: false,
      file: null,
      fileP: null,
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleImageChangeP = this._handleImageChangeP.bind(this);
  }

  routerMethod = async (destiny, id) => {
    if (destiny.includes('profile')) {
      this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: id });
    }
    id &&
      this.setState({
        openMyFollowers: false,
        openMyFollowings: false,
        openMyReaders: false,
      });
    id && (await this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: id }));
    id &&
      (await this.props.actions.isFollow({
        token: localStorage.getItem('token-app-auth-current'),
        user_id_followed: id,
      }));
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

  openMyFollowers = async id => {
    if (parseInt(this.props.match.params.id, 10) === id) {
      this.setState({
        openMyFollowers: !this.state.openMyFollowers,
        openMyFollowings: false,
        openMyReaders: false,
      });
      !this.state.openMyFollowers &&
        (await this.props.actions.getFollowers({
          token: localStorage.getItem('token-app-auth-current'),
        }));
    }
    !id &&
      this.setState({
        openMyFollowers: !this.state.openMyFollowers,
      });
  };

  openMyFollowing = async id => {
    if (parseInt(this.props.match.params.id, 10) === id) {
      this.setState({
        openMyFollowings: !this.state.openMyFollowings,
        openMyReaders: false,
        openMyFollowers: false,
      });
      !this.state.openMyFollowings &&
        (await this.props.actions.getFollowing({
          token: localStorage.getItem('token-app-auth-current'),
        }));
    }
    !id &&
      this.setState({
        openMyFollowings: !this.state.openMyFollowings,
      });
  };

  openMyReaders = async () => {
    this.setState({
      openMyReaders: !this.state.openMyReaders,
      openMyFollowings: false,
      openMyFollowers: false,
    });
    await this.props.actions.getNewsVisits({
      token: localStorage.getItem('token-app-auth-current'),
    });
  };

  buildFollowers = () => {
    if (!this.props.home.myfollowers.data[0]) {
      return <p className="smaller-meta-data">- No tienes seguidores -</p>;
    } else {
      return this.props.home.myfollowers.data.map(item => {
        return (
          <div key={item.id} className="mailbox-inner-messages-div">
            <div
              style={{
                backgroundImage: `url(${'http://' +
                  VALUES.BD_ORIGIN +
                  ':3000/network_images/' +
                  item.profile_img_url})`,
              }}
              className="mailbox-pic-header-background-image"
            ></div>
            <p
              onClick={() => this.routerMethod('../profile/' + item.id, item.id)}
              className="username-name-message"
            >
              {item.username}
            </p>
            <p className="date-message">- {item.profession}</p>
            <hr className="hr-white-invisible" />
            <br />
          </div>
        );
      });
    }
  };

  buildFollowings = () => {
    if (!this.props.home.myfollowings.data[0]) {
      return <p className="smaller-meta-data">- No sigues a nadie -</p>;
    } else {
      return this.props.home.myfollowings.data.map(item => {
        return (
          <div key={item.id} className="mailbox-inner-messages-div">
            <div
              style={{
                backgroundImage: `url(${'http://' +
                  VALUES.BD_ORIGIN +
                  ':3000/network_images/' +
                  item.profile_img_url})`,
              }}
              className="mailbox-pic-header-background-image"
            ></div>
            <p
              onClick={() => this.routerMethod('../profile/' + item.id, item.id)}
              className="username-name-message"
            >
              {item.username}
            </p>
            <p className="date-message">- {item.profession}</p>
            <hr className="hr-white-invisible" />
            <br />
          </div>
        );
      });
    }
  };

  buildReaders = () => {
    if (!this.props.home.mynewsvisits.data[0]) {
      return <p className="smaller-meta-data">- Sin lectores, por el momento. -</p>;
    } else {
      return this.props.home.mynewsvisits.data.map(item => {
        return (
          <div key={Math.random()} className="my-readers">
            <p
              className="my-readers-user"
              onClick={() => this.routerMethod('../profile/' + item.id, item.id)}
            >
              {item.username + ' '}-
              {' ' + this.convertDate(new Date(parseInt(item.created_at, 10)).toString())}
            </p>
            <p className="my-readers-title">{item.title.substring(0, 60) + '...'}</p>
            <br />
          </div>
        );
      });
    }
  };

  convertDate = date => {
    let newFormat = date.split(' ');
    return (
      newFormat[2] +
      '/' +
      (newFormat[1] === 'Jan'
        ? '01'
        : newFormat[1] === 'Feb'
        ? '02'
        : newFormat[1] === 'Mar'
        ? '03'
        : newFormat[1] === 'Abr'
        ? '04'
        : newFormat[1] === 'May'
        ? '05'
        : newFormat[1] === 'Jun'
        ? '06'
        : newFormat[1] === 'Jul'
        ? '07'
        : newFormat[1] === 'Aug'
        ? '08'
        : newFormat[1] === 'Sep'
        ? '09'
        : newFormat[1] === 'Oct'
        ? '10'
        : newFormat[1] === 'Nov'
        ? '11'
        : '12') +
      '/' +
      newFormat[3]
    );
  };

  _handleImageChangeP(e) {
    e.preventDefault();
    let readerP = new FileReader();
    let fileP = e.target.files[0];
    readerP.onloadend = () => {
      this.setState({
        fileP: fileP,
        imagePreviewUrlP: readerP.result,
      });
    };
    readerP.readAsDataURL(fileP);
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
        this.props.actions.getFollowing({ token: localStorage.getItem('token-app-auth-current') });
        this.props.actions.getFollowers({ token: localStorage.getItem('token-app-auth-current') });
        this.props.actions.searchUsers({ token: localStorage.getItem('token-app-auth-current') });
      }
    }
    //For every user
    id && this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: id });
    id && this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: id });
    this.props.actions.getCategories();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updatePassword = async () => {
    this.state.password2 &&
      this.state.password2.length < 6 &&
      NotificationManager.warning('La contraseña debe tener al menos 6 caracteres');
    if (this.state.password1 && this.state.password2 && this.state.password2.length > 5) {
      document.getElementById('cambiar-pwd-id').style.display = 'none';
      document.getElementById('cambiar-pwd-id-spinner').style.display = 'inline';
      this.props.actions.changePass({
        token: localStorage.getItem('token-app-auth-current'),
        pwd1: this.state.password1,
        pwd2: this.state.password2,
      });
    }
  };

  safetyNet = async () => {
    try {
      let token = await this.props.actions.securityToken();
      let data = jwt.verify(token.data.token, VALUES.API_KEY);
      return data.id;
    } catch (err) {
      return null;
    }
  };

  sendUpdateUser = async () => {
    document.getElementById('cambiar-user-data-id').style.display = 'none';
    document.getElementById('cambiar-user-data-id-spinner').style.display = 'inline';
    var res = { data: { filename: null } };
    var resP = { data: { filename: null } };

    if (this.state.file) {
      const data = new FormData();
      data.append('file', this.state.file);
      var secret_key = await this.safetyNet();
      res = await axios.post('http://' + VALUES.BD_ORIGIN + ':3000/file-upload', data, {
        headers: {
          secret_key: secret_key,
        },
      });
    }

    if (this.state.fileP) {
      const dataP = new FormData();
      dataP.append('file', this.state.fileP);
      var secret_keyP = await this.safetyNet();
      resP = await axios.post('http://' + VALUES.BD_ORIGIN + ':3000/file-upload', dataP, {
        headers: {
          secret_key: secret_keyP,
        },
      });
    }

    let dataUpdate = {
      token: localStorage.getItem('token-app-auth-current'),
      profile_img_url: res.data.filename || this.props.home.user.data[0].profile_img_url,
      banner_img_url: resP.data.filename || this.props.home.user.data[0].banner_img_url,
      username: (this.state.username || this.props.home.user.data[0].username)
        .replace(/"/g, '\\"')
        .replace(/'/g, '\\"')
        .replace(/`/g, '\\"'),
      profession: (this.state.profession || this.props.home.user.data[0].profession)
        .replace(/"/g, '\\"')
        .replace(/'/g, '\\"')
        .replace(/`/g, '\\"'),
      aboutme: (this.state.about_me || this.props.home.user.data[0].about_me)
        .replace(/"/g, '\\"')
        .replace(/'/g, '\\"')
        .replace(/`/g, '\\"'),
    };
    this.props.actions.editUser(dataUpdate);
    this.setState({
      file: null,
      fileP: null,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.home.editUserPending && nextProps.home.editeduser) {
      NotificationManager.info('Datos guardados');
      this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: this.state.id });
      this.setState({
        editUser: false,
      });
    }
    if (this.props.home.changePassPending && nextProps.home.password) {
      NotificationManager.info('Contraseña actualizada');
      this.setState({
        editUser: false,
        password1: '',
        password2: '',
      });
    }
    if (this.props.home.editUserPending && nextProps.home.editUserError) {
      document.getElementById('cambiar-user-data-id-spinner').style.display = 'none';
      document.getElementById('cambiar-user-data-id').style.display = 'inline';
      NotificationManager.warning('Ups, algo fue mal. Revise los datos');
    }
    if (this.props.home.changePassPending && nextProps.home.changePassError) {
      document.getElementById('cambiar-pwd-id-spinner').style.display = 'none';
      document.getElementById('cambiar-pwd-id').style.display = 'inline';
      NotificationManager.warning('Ups, algo fue mal. Revise los datos');
    }
  }

  articleDivInfoVisible = div => {
    document.getElementById(div).style.opacity = 0.7;
  };

  articleDivInfoInvisible = div => {
    document.getElementById(div).style.opacity = 0;
  };

  buildNews = () => {
    return this.props.home.userarticles.data.map(item => {
      return (
        <div
          key={item.title + '-' + item.id}
          className="design-120-60"
          onMouseEnter={() => this.articleDivInfoVisible('news-hover-' + item.id)}
          onMouseLeave={() => this.articleDivInfoInvisible('news-hover-' + item.id)}
        >
          <div
            className="img-div"
            style={{
              backgroundImage: `url(${'http://' +
                VALUES.BD_ORIGIN +
                ':3000/network_images/' +
                item.img_url})`,
            }}
          ></div>
          <div
            className="wrapper-news-div-hover"
            onClick={() => this.routerMethod('../news/' + item.id, item.user_id)}
            id={'news-hover-' + item.id}
          >
            <p>{item.name}</p>
            <h1>{item.title.length > 80 ? item.title.substring(0, 80) + '...' : item.title}</h1>
          </div>
        </div>
      );
    });
  };

  goToErrorLanding = () => {
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
  };

  removeTokenAndKill = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
  };

  render() {
    try {
      var userLogged = this.props.home.user
        ? localStorage.getItem('token-app-auth-current')
          ? jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY)
          : null
        : null;
      var $imagePreview,
        $imagePreviewP = null;
      if (this.props.home.user) {
        var imagePreviewUrl =
          this.state.imagePreviewUrl ||
          'http://' +
            VALUES.BD_ORIGIN +
            ':3000/network_images/' +
            this.props.home.user.data[0].profile_img_url;
        var imagePreviewUrlP =
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
    } catch (err) {
      this.goToErrorLanding();
      return null;
    }
    if (this.props.home.getUserError || this.props.home.getCategoriesError) {
      this.goToErrorLanding();
      return null;
    } else if (
      this.props.home.user &&
      this.props.home.user.data[0] &&
      this.props.home.user.data[0].username === 'blocked-user-woordi-secure-integrity'
    ) {
      this.removeTokenAndKill();
      return null;
    } else {
      return (
        <div className="home-user-profile">
          {this.props.home.categories && (
            <NavBar
              login={this.state.login}
              history={this.props.history}
              categories={this.props.home.categories}
              user={this.state.id}
            />
          )}
          <div className="user-profile-wrapper">
            {(this.props.home.getUserPending || !this.props.home.user) && (
              <div
                id="spinner-div-for-news-id-container-home-waiting"
                className="spinner-div-for-news-home-when-no-content-user-spin"
              >
                <img
                  alt="edit"
                  width="40"
                  className="edit-pen-user-profile-style"
                  src={require('../../images/spinner.gif')}
                />
              </div>
            )}
            {!this.props.home.getUserPending && this.props.home.user && (
              <UserHeader
                profileComp={true}
                isProfile={this.state.isProfile}
                user={this.props.home.user.data[0]}
                user_id={this.props.match.params.id}
              />
            )}
          </div>
          <div className="profile-wrapper-content">
            {!this.props.home.getUserPending && this.props.home.user && (
              <div className="about-me-user-profile">
                <h4>
                  {this.props.home.user.data[0].username}
                  {this.props.home.user.data[0].id === this.state.id && (
                    <img
                      alt="edit"
                      title="Editar mi perfil"
                      width="25px"
                      style={{ opacity: 0.8 }}
                      onClick={() => this.handleModal(true)}
                      className="edit-pen-user-profile-style"
                      src={require('../../images/edit-pen.PNG')}
                    />
                  )}
                </h4>
                <h5 className="country-city-user-profile">
                  <span
                    className="span-hover-follows-inte"
                    onClick={() =>
                      this.openMyFollowers(userLogged ? userLogged.id : 'nothing-here')
                    }
                  >
                    {' '}
                    Seguidores:{' '}
                  </span>
                  {this.props.home.user.data[0].followers + ' - '}
                  <span
                    className="span-hover-follows-inte"
                    onClick={() =>
                      this.openMyFollowing(userLogged ? userLogged.id : 'nothing-here')
                    }
                  >
                    {' '}
                    Siguiendo:{' '}
                  </span>
                  {this.props.home.user.data[0].following +
                    ' - Artículos: ' +
                    this.props.home.user.data[0].num_articles}
                </h5>
                {this.props.home.user.data[0].id === this.state.id && (
                  <p onClick={() => this.openMyReaders()} className="who-reads-my-news">
                    Mis lectores
                  </p>
                )}
                <p>{this.props.home.user.data[0].about_me}</p>
              </div>
            )}
            <div className="user-profile-wrapper-content">
              <p className="user-profile-wrapper-content-title">
                {!this.props.home.getUserPending &&
                  this.props.home.user &&
                  !this.state.isProfile &&
                  'Artículos de ' + this.props.home.user.data[0].username}
                {this.state.isProfile && 'Tus artículos'}
              </p>
              <div className="row">{this.props.home.userarticles && this.buildNews()}</div>
            </div>
          </div>
          <Footer />
          {this.state.openMyFollowers && (
            <div className="followers-div">
              <div className="followers-header-edit-user">
                <a
                  className="close-modal-header-edit-follower"
                  onClick={() => this.openMyFollowers(null)}
                >
                  X
                </a>
                <br />
              </div>
              <p className="title-for-popup">Seguidores</p>
              {this.props.home.getFollowersPending && (
                <p className="smaller-meta-data">Loading...</p>
              )}
              {this.props.home.myfollowers &&
                !this.props.home.getFollowersPending &&
                this.buildFollowers()}
            </div>
          )}
          {this.state.openMyFollowings && (
            <div className="followers-div">
              <div className="followers-header-edit-user">
                <a
                  className="close-modal-header-edit-follower"
                  onClick={() => this.openMyFollowing(null)}
                >
                  X
                </a>
                <br />
              </div>
              <p className="title-for-popup">Siguiendo</p>
              {this.props.home.getFollowingPending && (
                <p className="smaller-meta-data">Loading...</p>
              )}
              {this.props.home.myfollowings &&
                !this.props.home.getFollowingPending &&
                this.buildFollowings()}
            </div>
          )}
          {this.state.openMyReaders && (
            <div className="followers-div">
              <div className="followers-header-edit-user">
                <a
                  className="close-modal-header-edit-follower"
                  onClick={() => this.openMyReaders()}
                >
                  X
                </a>
                <br />
              </div>
              <p className="title-for-popup">Mis lectores</p>
              {this.props.home.getNewsVisitsPending && (
                <p className="smaller-meta-data">Loading...</p>
              )}
              {this.props.home.mynewsvisits &&
                !this.props.home.getNewsVisitsPending &&
                this.buildReaders()}
            </div>
          )}
          {this.props.home.user &&
            this.state.editUser &&
            this.props.home.user.data[0].id === this.state.id && (
              <div className="edit-user-modal-absolute">
                <div className="modal-header-edit-user">
                  <a
                    className="close-modal-header-edit-user"
                    onClick={() => this.handleModal(false)}
                  >
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
                    <label> Imagenes de 10Mb max (.png .jpg .jpeg .gif)</label>
                    <div className="wrapper-image-form">
                      <div className="upload-image-form-editor">
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
                      <div className="upload-image-form-editor margin-left-upload-img">
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
                      <label>Sobre mi</label>
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
                    <div className="div-edit-user-button-save-change">
                      <button
                        onClick={() => this.sendUpdateUser()}
                        type="button"
                        id="cambiar-user-data-id"
                        className="btn btn-success edit-user-button-form"
                      >
                        Guardar datos
                      </button>
                      <button
                        type="button"
                        id="cambiar-user-data-id-spinner"
                        className="btn btn-success edit-user-button-form spinner"
                      >
                        <img
                          alt="edit"
                          width="25"
                          className="edit-pen-user-profile-style"
                          src={require('../../images/spinner.gif')}
                        />
                      </button>
                    </div>
                    <hr />
                    <label>Cambio de contraseña</label>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        value={this.state.password1 || ''}
                        onChange={this.handleChange}
                        name="password1"
                        placeholder="Contraseña actual"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        value={this.state.password2 || ''}
                        className="form-control"
                        onChange={this.handleChange}
                        name="password2"
                        placeholder="Contraseña nueva"
                      />
                    </div>
                    <div className="div-edit-user-button-save-change">
                      <button
                        onClick={() => this.updatePassword()}
                        type="button"
                        id="cambiar-pwd-id"
                        className="btn btn-primary edit-user-button-form"
                      >
                        Cambiar contraseña
                      </button>
                      <button
                        type="button"
                        id="cambiar-pwd-id-spinner"
                        className="btn btn-success edit-user-button-form spinner"
                      >
                        <img
                          alt="edit"
                          width="25"
                          className="edit-pen-user-profile-style"
                          src={require('../../images/spinner.gif')}
                        />
                      </button>
                    </div>
                    <hr />
                  </form>
                </div>
              </div>
            )}
          <NotificationContainer />
        </div>
      );
    }
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
