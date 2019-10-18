import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Modal from 'react-awesome-modal';
import history from '../../common/history';

export class BigNews extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  routerMethod = destiny => {
    history.push(destiny);
    window.scrollTo(0, 0);
  };

  followUser = (id, action) => {
    let data = {
      idFollower: '122',
      idFollowed: id,
      do: action,
    };
    this.props.actions.followUser(data);
  };

  handleModal = (action, id) => {
    action && this.props.actions.getWriter(id);
    this.setState({
      visible: action,
    });
  };

  buildNewsMain = () => {
    return (
      <div className="big-news-1">
        <div className="big-news-user-info">
          <ul>
            <li>
              <img
                onClick={() => this.handleModal(true, this.props.articles.data[0].user.id)}
                className="user-img-style"
                alt=""
                src={this.props.articles.data[0].user.profile_img_url}
              />
            </li>
            <li>
              <a
                className="user-name-popup-news"
                onClick={() => this.handleModal(true, this.props.articles.data[0].user.id)}
              >
                {this.props.articles.data[0].user.username}
              </a>
            </li>
          </ul>
          <p className="user-detail">
            {this.props.articles.data[0].user.profession +
              ' | ' +
              this.props.articles.data[0].created_at}
          </p>
          <p
            onClick={() => this.followUser(this.props.articles.data[0].user.id, true)}
            className="follow-button"
          >
            Seguir
          </p>
        </div>
        <div
          onClick={() => this.routerMethod('news/34200112')}
          className="big-news-header"
          style={{
            backgroundImage: `url(${this.props.articles.data[0].img_url})`,
          }}
        >
          <div className="floating-div-header">
            <p>{this.props.articles.data[0].category.name}</p>
          </div>
        </div>
        <div className="big-news-content-big">
          <h4 onClick={() => this.routerMethod('news/34200112')}>
            {this.props.articles.data[0].title}
          </h4>
        </div>
      </div>
    );
  };

  buildNewsSecondary = () => {
    return (
      <div className="big-news-2">
        <div className="big-news-user-info">
          <ul>
            <li>
              <img
                onClick={() => this.handleModal(true, this.props.articles.data[1].user.id)}
                className="user-img-style"
                alt=""
                src={this.props.articles.data[1].user.profile_img_url}
              />
            </li>
            <li className="user-name-popup-news">
              <a
                className="user-name-popup-news"
                onClick={() => this.handleModal(true, this.props.articles.data[1].user.id)}
              >
                {this.props.articles.data[1].user.username}
              </a>
            </li>
          </ul>
          <p className="user-detail">
            {this.props.articles.data[1].user.profession +
              ' | ' +
              this.props.articles.data[1].created_at}
          </p>
          <p
            onClick={() => this.followUser(this.props.articles.data[0].user.id, true)}
            className="follow-button"
          >
            Seguir
          </p>
        </div>
        <div
          onClick={() => this.routerMethod('news/34200112')}
          className="big-news-header"
          style={{
            backgroundImage: `url(${this.props.articles.data[1].img_url})`,
          }}
        >
          <div className="floating-div-header">
            <p>{this.props.articles.data[1].category.name}</p>
          </div>
        </div>
        <div className="big-news-content">
          <h4 onClick={() => this.routerMethod('news/34200112')}>
            {this.props.articles.data[1].title}
          </h4>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="home-big-news">
        <div className="news-space">
          <div className="container news-container">
            <div className="row">
              {this.buildNewsMain()}
              {this.buildNewsSecondary()}
            </div>
          </div>
        </div>
        <Modal
          visible={this.state.visible}
          width="300px"
          height="300px"
          borderRadius="0px"
          effect="fadeInDown"
          onClickAway={() => this.handleModal(false)}
        >
          {typeof this.props.home.writer !== 'undefined' && (
            <div className="user-popup-content">
              <a className="close-modal-header" onClick={() => this.handleModal(false)}>
                X
              </a>
              <div className="user-popup-header-img">
                <div
                  onClick={() => this.routerMethod('profile/' + this.props.home.writer.data.id)}
                  style={{
                    backgroundImage: `url(${this.props.home.writer.data.profile_img_url})`,
                  }}
                  className="user-profile-picture-popup"
                ></div>
              </div>
              <div className="user-data-header-popup">
                <h4 onClick={() => this.routerMethod('profile/' + this.props.home.writer.data.id)}>
                  {this.props.home.writer.data.username}
                </h4>
                <p>
                  {this.props.home.writer.data.profession +
                    ' - ' +
                    this.props.home.writer.data.state.name}
                </p>
                <p
                  onClick={() => this.followUser(this.props.articles.data[0].user.id, true)}
                  className="follow-button"
                >
                  Seguir
                </p>
              </div>
            </div>
          )}
        </Modal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BigNews);
