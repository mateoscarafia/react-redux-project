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
    this.state = {};
  }

  async componentWillMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
      }
      if (user) {
        this.setState({
          id: user.id,
        });
        await this.props.actions.isFollow({
          token: VALUES.DEEP_TOKEN,
          user_id_follower: user.id,
          user_id_followed: this.props.user_id,
        });
      }
    }
  }

  routerMethod = destiny => {
    history.push(destiny);
    window.scrollTo(0, 0);
  };

  followUser = (id, action) => {
    let data = {
      user_id_follower: this.state.id,
      user_id_followed: id,
      token: localStorage.getItem('token-app-auth-current'),
    };
    this.props.actions.followUser(data);
  };

  componentWillReceiveProps(nextProps) {
    this.props.home.followUserPending
      ? nextProps.home.follow
        ? NotificationManager.info('Sigues al usuario')
        : NotificationManager.warning('Ups, algo fue mal')
      : null;
  }

  render() {
    return (
      <div className="home-user-header">
        <div
          style={{
            backgroundImage: `url(${this.props.user.banner_img_url})`,
          }}
          className="user-pic-header-background-image"
        ></div>
        <div className="user-name-header-title">
          <p
            onClick={() => this.routerMethod('/profile/' + this.props.user.id)}
            className="user-name-header-title-username"
          >
            {this.props.user.username}
          </p>
          <p className="user-name-header-title-profession">{this.props.user.profession}</p>
        </div>
        <div className="user-pic-header">
          <div
            onClick={() => this.routerMethod('/profile/' + this.props.user_id)}
            style={{
              backgroundImage: `url(${this.props.user.profile_img_url})`,
            }}
            className="user-profile-picture"
          ></div>
        </div>
        {!this.props.isProfile &&
          this.props.home.isfollow &&
          (this.props.home.isfollow.data[0] ? (
            <p className="follow-button-user-header">Sigues al usuario</p>
          ) : (
            <p
              onClick={() => this.followUser(this.props.user.id)}
              className="follow-button-user-header"
            >
              Seguir
            </p>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
