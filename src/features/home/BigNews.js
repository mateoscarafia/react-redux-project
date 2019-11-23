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
      this.props.articles.data[0] && (
        <div className="big-news-1">
          <div
            onClick={() => this.routerMethod('../news/' + this.props.articles.data[0].id)}
            className="big-news-header"
            style={{
              backgroundImage: `url(${this.props.articles.data[0].img_url})`,
            }}
          >
            <div className="floating-div-header">
              <p>{this.props.articles.data[0].name}</p>
            </div>
          </div>
          <div className="big-news-content-big">
            <h4 onClick={() => this.routerMethod('../news/' + this.props.articles.data[0].id)}>
              {this.props.articles.data[0].title}
            </h4>
          </div>
        </div>
      )
    );
  };

  buildNewsSecondary = () => {
    return (
      this.props.articles.data[1] && (
        <div className="big-news-2">
          <div
            onClick={() => this.routerMethod('../news/' + this.props.articles.data[1].id)}
            className="big-news-header"
            style={{
              backgroundImage: `url(${this.props.articles.data[1].img_url})`,
            }}
          >
            <div className="floating-div-header">
              <p>{this.props.articles.data[1].name}</p>
            </div>
          </div>
          <div className="big-news-content">
            <h4 onClick={() => this.routerMethod('../news/' + this.props.articles.data[1].id)}>
              {this.props.articles.data[1].title}
            </h4>
          </div>
        </div>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(BigNews);
