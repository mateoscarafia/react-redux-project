import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../common/history';
import * as actions from './redux/actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as VALUES from '../../constants';

const jwt = require('jsonwebtoken');

export class UserHeader extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openTelegram: false,
      message: null,
      openMailBox: false,
      degrees: null,
    };
  }

  async componentWillMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
      }
      if (user) {
        this.setState({
          id: user.id,
        });
        await this.props.actions.isFollow({
          token: localStorage.getItem('token-app-auth-current'),
          user_id_followed: this.props.user_id,
        });
      }
    }
  }

  rotateprofileImg = async () => {
    document.getElementById('float-right-rotate-img-func-id').style.display = 'none';
    var degrees = this.state.degrees
      ? this.state.degrees + 90
      : parseInt(this.props.user.rotate_img_profile, 10) + 90;
    this.setState({
      degrees: degrees,
    });
    this.props.actions
      .rotateImg({
        token: localStorage.getItem('token-app-auth-current'),
        degrees: degrees,
      })
      .then(res => {
        document.getElementById('float-right-rotate-img-func-id').style.display = 'block';
        document.getElementById('profile-image-user-on-header-profile-land').style.transform =
          'rotate(' + res.data.res + 'deg)';
      });
  };

  routerMethod = async (destiny, id) => {
    this.setState({
      openMailBox: false,
    });
    if (id) {
      await this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: id });
      await this.props.actions.isFollow({
        token: localStorage.getItem('token-app-auth-current'),
        user_id_followed: id,
      });
      this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: id });
    }
    history.push(destiny);
    window.scrollTo(0, 0);
  };

  sendMessage = async id => {
    if (this.state.message === null || this.state.message === '') {
      NotificationManager.info('Telegrama vacío');
    } else {
      await this.props.actions.postMessage({
        token: localStorage.getItem('token-app-auth-current'),
        message: this.state.message
          .replace(/"/g, '\\"')
          .replace(/'/g, '\\"')
          .replace(/`/g, '\\"'),
        user_id_reader: id,
      });
    }
  };

  followUser = async id => {
    let data = {
      user_id_followed: id,
      token: localStorage.getItem('token-app-auth-current'),
    };
    await this.props.actions.followUser(data);
    await this.props.actions.isFollow({
      token: localStorage.getItem('token-app-auth-current'),
      user_id_followed: id,
    });
  };

  openMessenger = () => {
    this.setState({
      openTelegram: !this.state.openTelegram,
    });
  };

  openMailBox = async () => {
    let data = {
      token: localStorage.getItem('token-app-auth-current'),
    };
    this.props.actions.getMessages(data);
    this.setState({
      openMailBox: !this.state.openMailBox,
    });
  };

  stopFollowUser = async id => {
    let data = {
      user_id_followed: id,
      token: localStorage.getItem('token-app-auth-current'),
    };
    await this.props.actions.stopFollow(data);
    await this.props.actions.isFollow({
      token: localStorage.getItem('token-app-auth-current'),
      user_id_followed: id,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  buildMessages = () => {
    if (!this.props.home.mymessages.data[0]) {
      return <p className="smaller-meta-data">- No tienes telegramas -</p>;
    } else {
      return this.props.home.mymessages.data.map(item => {
        return (
          <div key={item.id} className="mailbox-inner-messages-div">
            <div
              style={{
                backgroundImage: `url(${VALUES.STORAGE_URL +
                  item.profile_img_url})`,
              }}
              className="mailbox-pic-header-background-image"
            ></div>
            <p
              onClick={() =>
                this.routerMethod('../profile/' + item.user_id_writer, item.user_id_writer)
              }
              className="username-name-message"
            >
              {item.username.length > 20 ? item.username.substring(0, 20) + '...' : item.username}
            </p>
            <p className="date-message">
              - {this.convertDate(new Date(parseInt(item.created_at, 10)).toString())}
            </p>
            <br />
            <p className="message-content">{item.message}</p>
            <hr />
          </div>
        );
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.home.followUserPending && nextProps.home.follow) {
      NotificationManager.info('Sigues al usuario');
    }
    if (this.props.home.followUserPending && !nextProps.home.follow) {
      NotificationManager.info('Ups, algo fue mal');
    }
    if (this.props.home.stopFollowPending && nextProps.home.stopfollow) {
      NotificationManager.info('No sigues al usuario');
    }
    if (this.props.home.stopFollowPending && !nextProps.home.stopfollow) {
      NotificationManager.info('Ups, algo fue mal');
    }
    if (this.props.home.postMessagePending && nextProps.home.sendmessage.data === 'un dia') {
      NotificationManager.info('Solo un Telegrama por día');
    }
    if (this.props.home.postMessagePending && nextProps.home.sendmessage.data === 'ok') {
      NotificationManager.info('Telegrama enviado');
      this.openMessenger();
    }
    if (this.props.home.postMessagePending && !nextProps.home.sendmessage.data) {
      NotificationManager.info('Ups, algo fue mal');
    }
  }

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

  rotateImgWhenLoading(degrees) {
    if (document.getElementById('profile-image-user-on-header-profile-land')) {
      document.getElementById('profile-image-user-on-header-profile-land').style.transform =
        'rotate(' + degrees + 'deg)';
    }
  }

  render() {
    this.props.user.id === this.state.id && this.state.openTelegram && this.openMessenger();
    !this.state.degrees &&
      this.props.user &&
      this.rotateImgWhenLoading(this.props.user.rotate_img_profile);
    if (this.props.user) {
      return (
        <div className="home-user-header">
          <div
            style={{
              backgroundImage: `url(${VALUES.STORAGE_URL +
                this.props.user.banner_img_url})`,
            }}
            className="user-pic-header-background-image"
          ></div>
          <div className="user-name-header-title">
            <p
              onClick={() => this.routerMethod('/profile/' + this.props.user.id, null)}
              className="user-name-header-title-username"
            >
              {this.props.user.username}
            </p>
            <p className="user-name-header-title-profession">{this.props.user.profession}</p>
          </div>
          <div className="user-pic-header">
            <div
              id="profile-image-user-on-header-profile-land"
              onClick={() => this.routerMethod('/profile/' + this.props.user_id, null)}
              style={{
                backgroundImage: `url(${VALUES.STORAGE_URL +
                  this.props.user.profile_img_url})`,
              }}
              className="user-profile-picture"
            ></div>
            {this.state.id && this.props.profileComp && this.props.user.id === this.state.id && (
              <img
                onClick={() => this.rotateprofileImg()}
                alt="edit"
                title="Girar imagen"
                id="float-right-rotate-img-func-id"
                style={{ width: '25px' }}
                className="edit-pen-user-profile-style float-right-rotate-img-func"
                src={require('../../images/rotate.PNG')}
              />
            )}
          </div>
          {this.props.user.id !== this.state.id &&
            this.props.home.isfollow &&
            (this.props.home.isfollow.data[0] ? (
              <p
                onClick={() => this.stopFollowUser(this.props.user.id)}
                className="follow-button-user-header"
              >
                Dejar de seguir
              </p>
            ) : (
              <p
                onClick={() => this.followUser(this.props.user.id)}
                className="follow-button-user-header"
              >
                Seguir
              </p>
            ))}
          {this.state.id && this.props.user.id !== this.state.id && (
            <p
              alt="Enviar telegrama"
              onClick={() => this.openMessenger()}
              className="telegram-button-user-header"
            >
              <img
                onClick={() => this.openMessenger()}
                alt="edit"
                title="Escribir telegrama"
                style={{ width: '30px' }}
                src={require('../../images/telegram.png')}
              />
            </p>
          )}
          {!this.props.isTextEditor && this.props.user.id === this.state.id && (
            <p onClick={() => this.openMailBox()} className="mailbox-button-user-header">
              <img
                alt="edit"
                title="Mis telegramas"
                style={{ width: '30px' }}
                className="mailbox-pen-user-profile-style"
                src={require('../../images/mailbox.png')}
              />
            </p>
          )}
          {this.state.openTelegram && (
            <div className="telegram-div">
              <textarea
                rows="4"
                className="form-control"
                placeholder="Escribe mensaje..."
                name="message"
                onChange={this.handleChange}
                id="message-input"
              ></textarea>
              <button
                type="button"
                onClick={() => this.sendMessage(this.props.user.id)}
                className="btn btn-secondary comment-button"
              >
                Enviar telegrama
              </button>
            </div>
          )}
          {this.state.openMailBox && (
            <div className="mailbox-div">
              <div className="telegrams-header-edit-user">
                <a className="close-modal-header-edit-telegram" onClick={() => this.openMailBox()}>
                  X
                </a>
              </div>
              <p className="title-for-popup"><b>Mi buzón</b></p>
              {this.props.home.getMessagesPending && (
                <p className="smaller-meta-data">Loading...</p>
              )}
              {this.props.home.mymessages &&
                !this.props.home.getMessagesPending &&
                this.buildMessages()}
            </div>
          )}
          <NotificationContainer />
        </div>
      );
    } else {
      return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
