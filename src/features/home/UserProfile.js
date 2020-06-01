import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ReactPlayer from 'react-player'

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
      imagePreviewUrlPublicity: null,
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
      filePublicity: null,
      myPublicity: false,
      publicity_active: null,
      publicity_link: null,
      publicity_img: null,
      show_publicity_banner: true,
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleImageChangeP = this._handleImageChangeP.bind(this);
    this._handleImageChangePublicity = this._handleImageChangePublicity.bind(this);
  }

  rotate = () => {
    let articles = [];
    if (
      this.props.home.userarticles &&
      this.props.home.userarticles.data &&
      this.props.home.userarticles.data[0]
    ) {
      articles = [...this.props.home.userarticles.data];
    }
    for (const prop in articles) {
      if (
        document.getElementById('id-article-unique-key-' + articles[prop].id) &&
        articles[prop].rotate_img
      ) {
        document.getElementById('id-article-unique-key-' + articles[prop].id).style.transform =
          'rotate(' + articles[prop].rotate_img + 'deg)';
      }
    }
  };

  routerMethod = async (destiny, id) => {
    if (destiny.includes('profile')) {
      this.props.actions.getUserProfile({ token: VALUES.DEEP_TOKEN, id: id });
      this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: id });
    }
    if (destiny.includes('news')) {
      this.props.actions.getComments({ news_id: id, token: VALUES.DEEP_TOKEN });
    }
    id &&
      this.setState({
        openMyFollowers: false,
        openMyFollowings: false,
        openMyReaders: false,
      });
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

  goAway = () => {
    if (this.props.home.userProfile.data[0].publicity_link !== 'null') {
      window.open(this.props.home.userProfile.data[0].publicity_link, '_blank');
    }
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

  publicityVisible = () => {
    setTimeout(() => {
      if (document.getElementById('pop-up-id-publicity')) {
        document.getElementById('pop-up-id-publicity').style.opacity = 1;
      }
    }, 2000);
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
                backgroundImage: `url(${VALUES.STORAGE_URL + item.profile_img_url})`,
              }}
              className="mailbox-pic-header-background-image"
            ></div>
            <p
              onClick={() => this.routerMethod('../profile/' + item.id, item.id)}
              className="username-name-message"
            >
              {item.username.length > 20 ? item.username.substring(0, 20) + '...' : item.username}
            </p>
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
                backgroundImage: `url(${VALUES.STORAGE_URL + item.profile_img_url})`,
              }}
              className="mailbox-pic-header-background-image"
            ></div>
            <p
              onClick={() => this.routerMethod('../profile/' + item.id, item.id)}
              className="username-name-message"
            >
              {item.username.length > 20 ? item.username.substring(0, 20) + '...' : item.username}
            </p>
            <hr className="hr-white-invisible" />
            <br />
          </div>
        );
      });
    }
  };

  buildReaders = () => {
    if (!this.props.home.mynewsvisits.data[0]) {
      return <p className="smaller-meta-data">- Sin lectores, por el momento -</p>;
    } else {
      return this.props.home.mynewsvisits.data.map(item => {
        return (
          <div key={Math.random()} className="my-readers">
            <p
              className="my-readers-user"
              onClick={() => this.routerMethod('../profile/' + item.id, item.id)}
            >
              {item.username.length > 20
                ? item.username.substring(0, 20) + '... '
                : item.username + ' '}
              -{this.convertDate(new Date(parseInt(item.created_at, 10)).toString())}
            </p>
            <p className="my-readers-title">
              {item.title.length > 80 ? item.title.substring(0, 80) + '...' : item.title}
            </p>
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

  _handleImageChangePublicity(e) {
    e.preventDefault();
    let readerPublicity = new FileReader();
    let filePublicity = e.target.files[0];
    readerPublicity.onloadend = () => {
      this.setState({
        filePublicity: filePublicity,
        imagePreviewUrlPublicity: readerPublicity.result,
      });
    };
    readerPublicity.readAsDataURL(filePublicity);
  }

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

  handleModalPublicity = action => {
    this.setState({
      myPublicity: action,
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
        window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
      }
      if (user) {
        !this.props.home.user && this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: user.id });
        this.setState({
          login: true,
          id: user.id,
          isProfile: user.id === parseInt(id, 10),
        });
        //user.id !== parseInt(id, 10) && this.props.actions.postVisit(id);
        this.props.actions.getFollowing({ token: localStorage.getItem('token-app-auth-current') });
        this.props.actions.getFollowers({ token: localStorage.getItem('token-app-auth-current') });
        this.props.actions.searchUsers({ token: localStorage.getItem('token-app-auth-current') });
      }
    }
    //For every user
    id && this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: id });
    id && this.props.actions.getUserProfile({ token: VALUES.DEEP_TOKEN, id: id });
    !this.props.home.categories && this.props.actions.getCategories();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updatePassword = async () => {
    this.state.password2 &&
      this.state.password2.length < 6 &&
      NotificationManager.info('La contraseña debe tener al menos 6 caracteres');
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

    if (this.state.file && this.state.file.size > 20000000) {
      NotificationManager.info('Lo sentimos, la foto de perfil es muy pesada (20 mb max)');
      document.getElementById('cambiar-user-data-id').style.display = 'inline';
      document.getElementById('cambiar-user-data-id-spinner').style.display = 'none';
    } else if (this.state.fileP && this.state.fileP.size > 20000000) {
      NotificationManager.info('Lo sentimos, la foto de portada es muy pesada (20 mb max)');
      document.getElementById('cambiar-user-data-id').style.display = 'inline';
      document.getElementById('cambiar-user-data-id-spinner').style.display = 'none';
    } else {
      var res = { data: { filename: null } };
      var resP = { data: { filename: null } };

      if (this.state.file) {
        const data = new FormData();
        data.append('file', this.state.file);
        var secret_key = await this.safetyNet();
        res = await axios.post(VALUES.BACKEND_URL + 'file-upload', data, {
          headers: {
            secret_key: secret_key,
          },
        });
      }

      if (this.state.fileP) {
        const dataP = new FormData();
        dataP.append('file', this.state.fileP);
        var secret_keyP = await this.safetyNet();
        resP = await axios.post(VALUES.BACKEND_URL + 'file-upload', dataP, {
          headers: {
            secret_key: secret_keyP,
          },
        });
      }

      let dataUpdate = {
        token: localStorage.getItem('token-app-auth-current'),
        profile_img_url: res.data.filename || this.props.home.userProfile.data[0].profile_img_url,
        banner_img_url: resP.data.filename || this.props.home.userProfile.data[0].banner_img_url,
        username: (this.state.username || this.props.home.userProfile.data[0].username)
          .replace(/"/g, '\\"')
          .replace(/'/g, '\\"')
          .replace(/`/g, '\\"'),
        profession: (this.state.profession || this.props.home.userProfile.data[0].profession)
          .replace(/"/g, '\\"')
          .replace(/'/g, '\\"')
          .replace(/`/g, '\\"'),
        aboutme: (this.state.about_me || this.props.home.userProfile.data[0].about_me)
          .replace(/"/g, '\\"')
          .replace(/'/g, '\\"')
          .replace(/`/g, '\\"'),
      };
      await this.props.actions.editUser(dataUpdate);
      this.setState({
        file: null,
        fileP: null,
      });
    }
  };

  sendPublicity = async () => {
    document.getElementById('cambiar-user-data-id-publicity').style.display = 'none';
    document.getElementById('cambiar-user-data-id-spinner-publicity').style.display = 'inline';
    if (this.state.filePublicity && this.state.filePublicity.size > 20000000) {
      NotificationManager.info('Lo sentimos, la foto es muy pesada (20 mb max)');
      document.getElementById('cambiar-user-data-id-publicity').style.display = 'inline';
      document.getElementById('cambiar-user-data-id-spinner-publicity').style.display = 'none';
    } else {
      var res = { data: { filename: null } };
      if (this.state.filePublicity) {
        const data = new FormData();
        data.append('file', this.state.filePublicity);
        var secret_key = await this.safetyNet();
        res = await axios.post(VALUES.BACKEND_URL + 'file-upload', data, {
          headers: {
            secret_key: secret_key,
          },
        });
      }
      let dataUpdate = {
        token: localStorage.getItem('token-app-auth-current'),
        publicity_img: res.data.filename || this.props.home.userProfile.data[0].publicity_img,
        publicity_link: this.state.publicity_link || this.props.home.userProfile.data[0].publicity_link,
        publicity_active:
          this.state.publicity_active === '1'
            ? 1
            : this.state.publicity_active === '0'
              ? 0
              : this.props.home.userProfile.data[0].publicity_active,
      };
      this.props.actions.addPublicity(dataUpdate);
      this.setState({
        filePublicity: null,
      });
    }
  };

  logoutUser = () => {
    if (window.confirm('¿Seguro que desea cerrar sesion?')){
    localStorage.removeItem('token-app-auth-current');
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.home.editUserPending && nextProps.home.editeduser) {
      NotificationManager.info('Datos guardados');
      this.props.actions.getUserProfile({ token: VALUES.DEEP_TOKEN, id: this.state.id });
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
    if (this.props.home.addPublicityPending && nextProps.home.publicity) {
      NotificationManager.info('Datos guardados');
      this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: this.state.id });
      this.setState({
        myPublicity: false,
      });
    }
    if (this.props.home.addPublicityPending && nextProps.home.addPublicityError) {
      document.getElementById('cambiar-user-data-id-spinner-publicity').style.display = 'none';
      document.getElementById('cambiar-user-data-id-publicity').style.display = 'inline';
      NotificationManager.info('Ups, algo fue mal.');
    }
    if (this.props.home.editUserPending && nextProps.home.editUserError) {
      document.getElementById('cambiar-user-data-id-spinner').style.display = 'none';
      document.getElementById('cambiar-user-data-id').style.display = 'inline';
      NotificationManager.info('Ups, algo fue mal. Revise los datos');
    }
    if (this.props.home.changePassPending && nextProps.home.changePassError) {
      document.getElementById('cambiar-pwd-id-spinner').style.display = 'none';
      document.getElementById('cambiar-pwd-id').style.display = 'inline';
      NotificationManager.info('Ups, algo fue mal. Revise los datos');
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
          className="design-120-60-user-profile"
        >
          {item.is_video !== 1 ? (
            <div
              id={'id-article-unique-key-' + item.id}
              className="img-div"
              onClick={() => this.routerMethod('../news/' + item.id, item.user_id)}
              style={{
                backgroundImage: `url(${VALUES.STORAGE_URL + item.img_url})`,
              }}
            ></div>
          ) : (
              <div
                className="img-div"
                onClick={() => this.routerMethod('../news/' + item.id, item.user_id)}
              >
                <img
                    alt="video"
                    className="play-video-style-div"
                    src={require('../../images/play_video.png')}
                  />
                <ReactPlayer style={{ height: '70%', width: '100%' }} url={VALUES.STORAGE_URL + item.img_url} />
              </div>
            )}
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
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  removeTokenAndKill = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  render() {
    try {
      var userLogged = this.props.home.userProfile
        ? localStorage.getItem('token-app-auth-current')
          ? jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY)
          : null
        : null;
      var $imagePreview,
        $imagePreviewP,
        $imagePreviewPublicity = null;
      if (this.props.home.userProfile) {
        var imagePreviewUrl =
          this.state.imagePreviewUrl ||
          VALUES.STORAGE_URL + this.props.home.userProfile.data[0].profile_img_url;
        var imagePreviewUrlP =
          this.state.imagePreviewUrlP ||
          VALUES.STORAGE_URL + this.props.home.userProfile.data[0].banner_img_url;
        var imagePreviewUrlPublicity =
          this.state.imagePreviewUrlPublicity ||
          VALUES.STORAGE_URL +
          (this.props.home.userProfile.data[0].publicity_img !== 'null'
            ? this.props.home.userProfile.data[0].publicity_img
            : 'default-user-banner.PNG');
        if (imagePreviewUrl) {
          $imagePreview = <img alt="img-preview" src={imagePreviewUrl} />;
        }
        if (imagePreviewUrlP) {
          $imagePreviewP = <img alt="img-preview" src={imagePreviewUrlP} />;
        }
        if (imagePreviewUrlPublicity) {
          $imagePreviewPublicity = <img alt="img-preview" src={imagePreviewUrlPublicity} />;
        }
      }
    } catch (err) {
      this.goToErrorLanding();
      return null;
    }
    if (this.props.home.getUserError || this.props.home.getCategoriesError) {
      this.goToErrorLanding();
      return null;
    } else if (this.props.home.categories && !this.props.home.categories.data[0]) {
      this.goToErrorLanding();
    } else if (this.props.home.userProfile && !this.props.home.userProfile.data[0]) {
      this.goToErrorLanding();
      return null;
    } else if (
      this.props.home.userProfile &&
      this.props.home.userProfile.data[0] &&
      this.props.home.userProfile.data[0].username === 'blocked-user-woordi-secure-integrity'
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
              rotate_img_profile={this.props.home.user && this.props.home.user.data[0] && this.props.home.user.data[0].rotate_img_profile}
              img_url={this.props.home.user &&
                this.props.home.user.data[0] && this.props.home.user.data[0].profile_img_url}
              username={null}
            />
          )}
          <div className="user-profile-wrapper">
            {(this.props.home.getUserProfilePending) && (
              <div
                id="spinner-div-for-news-id-container-home-waiting"
                className="spinner-div-for-news-home-when-no-content-user-spin"
              >
                <img
                  alt="edit"
                  width="35"
                  className="edit-pen-user-profile-style less-margin-for-spinner-logo"
                  src={require('../../images/logo.png')}
                />
                <div className="loader"></div>
              </div>
            )}
            {!this.props.home.getUserProfilePending && this.props.home.userProfile && (
              <UserHeader
                profileComp={true}
                isProfile={this.state.isProfile}
                user={this.props.home.userProfile.data[0]}
                user_id={this.props.match.params.id}
              />
            )}
          </div>
          <div className="profile-wrapper-content">
            {!this.props.home.getUserProfilePending && this.props.home.userProfile && (
              <div className="about-me-user-profile">
                <h4 style={{ margin: '0' }}>
                  {this.props.home.userProfile.data[0].username}
                  {this.props.home.userProfile.data[0].id === this.state.id && (
                    <img
                      alt="edit"
                      title="Editar mi perfil"
                      width="22px"
                      style={{ opacity: 0.8 }}
                      onClick={() => this.handleModal(true)}
                      className="edit-pen-user-profile-style"
                      src={require('../../images/edit-pen.PNG')}
                    />
                  )}
                  {this.props.home.userProfile.data[0].id === this.state.id && (
                    <img
                      alt="Publicidad"
                      title="Mi publicidad"
                      width="22px"
                      style={{ opacity: 0.8 }}
                      onClick={() => this.handleModalPublicity(true)}
                      className="edit-pen-user-profile-style"
                      src={require('../../images/money.png')}
                    />
                  )}
                </h4>
                <img
                  alt="Popularidad, según cantidad de seguidores."
                  title="Popularidad, según cantidad de seguidores."
                  width="100px"
                  style={{ marginTop: '0px', marginBottom: '10px' }}
                  src={
                    this.props.home.userProfile.data[0].followers < 1
                      ? require('../../images/0-star.JPG')
                      : this.props.home.userProfile.data[0].followers > 0 &&
                        this.props.home.userProfile.data[0].followers <= 10
                        ? require('../../images/1-star.JPG')
                        : this.props.home.userProfile.data[0].followers > 10 &&
                          this.props.home.userProfile.data[0].followers <= 30
                          ? require('../../images/2-star.JPG')
                          : this.props.home.userProfile.data[0].followers > 30 &&
                            this.props.home.userProfile.data[0].followers <= 150
                            ? require('../../images/3-star.JPG')
                            : this.props.home.userProfile.data[0].followers > 150 &&
                              this.props.home.userProfile.data[0].followers <= 300
                              ? require('../../images/4-star.JPG')
                              : this.props.home.userProfile.data[0].followers > 300
                                ? require('../../images/5-star.JPG')
                                : null
                  }
                />
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
                  {this.props.home.userProfile.data[0].followers + ' - '}
                  <span
                    className="span-hover-follows-inte"
                    onClick={() =>
                      this.openMyFollowing(userLogged ? userLogged.id : 'nothing-here')
                    }
                  >
                    {' '}
                    Siguiendo:{' '}
                  </span>
                  {this.props.home.userProfile.data[0].following +
                    ' - Artículos: ' +
                    this.props.home.userProfile.data[0].num_articles}
                </h5>
                {this.props.home.userProfile.data[0].id === this.state.id && (
                  <p onClick={() => this.openMyReaders()} className="who-reads-my-news">
                    Mis lectores
                  </p>
                )}
                <p className="my-description-user-profile-div-p">
                  {this.props.home.userProfile.data[0].about_me}
                </p>
              </div>
            )}
            <div className="user-profile-wrapper-content">
              <p className="user-profile-wrapper-content-title">
                {!this.props.home.getUserProfilePending &&
                  this.props.home.userProfile &&
                  !this.state.isProfile &&
                  'Artículos de ' + this.props.home.userProfile.data[0].username}
                {this.state.isProfile && 'Tus artículos'}
              </p>
              <div className="row">
                {this.props.home.getNewsPending &&
                  <div className='spinner-article-waiting-user-profile'><img
                    alt="edit"
                    width="25"
                    className="edit-pen-user-profile-style"
                    src={require('../../images/spinner.gif')}
                  /></div>
                }
                {!this.props.home.getNewsPending && this.props.home.userarticles &&
                  this.props.home.userarticles.data[0] &&
                  this.buildNews()}
              </div>
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
              <p className="title-for-popup"><b>Seguidores</b></p>
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
              <p className="title-for-popup"><b>Siguiendo</b></p>
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
          {this.props.home.userProfile &&
            this.state.myPublicity &&
            this.props.home.userProfile.data[0].id === this.state.id && (
              <div className="edit-user-modal-absolute">
                <div className="modal-header-edit-user">
                  <a
                    className="close-modal-header-edit-user"
                    onClick={() => this.handleModalPublicity(false)}
                  >
                    X
                  </a>
                </div>
                <div className="form-modal-edit-user">
                  <h4>Mi publicidad</h4>
                  <hr />
                  <label>¡En Woordi podes gestionar tu propia publicidad!</label>
                  <label>
                    Vos manejas el contenido de tu perfil y ahora tambien su publicidad. La
                    publicidad consiste en un Banner que se mostrará
                    <b> sólo en tus artículos y en tu perfil.</b> Vos generas el contenido, vos te
                    llevas las ganancias de su tráfico.
                  </label>
                  <label>
                    <b>¡Empeza ya!</b> Contáctate con algún negocio, empresa o comercio que le
                    interese publicitar sus productos junto a tu contenido. Subi la imagen para el
                    banner, definí el link del sitio publicitado y ¡listo!
                  </label>
                  <label>Para tu Banner, te recomendamos usar una imagen de 600x200!</label>
                  <hr />
                  <form>
                    <div style={{ width: '100%' }} className="upload-image-form-editor">
                      <label className="custom-file-upload">
                        <input
                          onChange={this._handleImageChangePublicity}
                          type="file"
                          className="inputfile"
                        />
                        Cambiar foto publicidad
                      </label>
                      <div style={{ width: '100%' }} className="show-image-preview-text-editor">
                        {$imagePreviewPublicity}
                      </div>
                    </div>
                    <br />
                    <div className="form-group">
                      <label>
                        Link publicidad
                        <br />
                        Sitio a donde será re-dirigido el usuario al hacer click en la publicidad
                      </label>
                      <input
                        type="text"
                        name="publicity_link"
                        value={
                          this.state.publicity_link !== null
                            ? this.state.publicity_link
                            : this.props.home.userProfile.data[0].publicity_link !== 'null'
                              ? this.props.home.userProfile.data[0].publicity_link
                              : ''
                        }
                        className="form-control"
                        onChange={this.handleChange}
                        id="publicity_link"
                        placeholder="Ej: https://www.google.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Activar publicidad</label>
                      <select
                        className="form-control"
                        onChange={this.handleChange}
                        style={{ width: '200px', marginBottom: '10px', fontSize: '12px' }}
                        name="publicity_active"
                        value={
                          this.state.publicity_active ||
                          this.props.home.userProfile.data[0].publicity_active
                        }
                      >
                        <option value={1}>SI</option>
                        <option value={0}>NO</option>
                      </select>
                    </div>
                    <div style={{marginTop:-20}} className="div-edit-user-button-save-change">
                      <button
                        onClick={() => this.sendPublicity()}
                        type="button"
                        id="cambiar-user-data-id-publicity"
                        className="btn btn-success edit-user-button-form"
                      >
                        Guardar cambios
                      </button>
                      <button
                        type="button"
                        id="cambiar-user-data-id-spinner-publicity"
                        className="btn btn-success edit-user-button-form spinner"
                      >
                        <img
                          alt="edit"
                          width="15"
                          className="edit-pen-user-profile-style"
                          src={require('../../images/spinner.gif')}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          {this.props.home.userProfile &&
            this.state.editUser &&
            this.props.home.userProfile.data[0].id === this.state.id && (
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
                            : this.props.home.userProfile.data[0].username
                        }
                        className="form-control"
                        onChange={this.handleChange}
                        id="username"
                        placeholder="Nombre completo"
                      />
                    </div>
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
                            : this.props.home.userProfile.data[0].profession
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
                            : this.props.home.userProfile.data[0].about_me
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
                          width="17"
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
                          width="17"
                          className="edit-pen-user-profile-style"
                          src={require('../../images/spinner.gif')}
                        />
                      </button>
                    </div>
                    <hr />
                    <div className="div-edit-user-button-save-change">
                      <button
                        onClick={() => this.logoutUser()}
                        type="button"
                        className="btn btn-primary edit-user-button-form-white-black-butt"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                    <hr />
                  </form>
                </div>
              </div>
            )}
          {!this.props.home.getUserProfilePending &&
            this.props.home.userProfile &&
            this.props.home.userProfile.data[0] &&
            this.props.home.userProfile.data[0].publicity_active &&
            this.state.show_publicity_banner ? (
              <div
                style={{
                  backgroundColor: '#f5f5f5',
                  backgroundImage: `url(${VALUES.STORAGE_URL +
                    this.props.home.userProfile.data[0].publicity_img})`,
                }}
                id="pop-up-id-publicity"
                className="publicity-pop-up"
              >
                <div onClick={() => this.goAway()} style={{ width: '90%', height: '100%' }}></div>
                <p
                  onClick={() =>
                    this.setState({
                      show_publicity_banner: false,
                    })
                  }
                >
                  x
              </p>
                {this.publicityVisible()}
              </div>
            ) : null}
          {this.rotate()}
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
