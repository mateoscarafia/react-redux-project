import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Modal from 'react-awesome-modal';
import history from '../../common/history';

export class News extends Component {
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

  handleModal = (action, id) => {
    action && this.props.actions.getWriter(id);
    this.setState({
      visible: action,
    });
  };

  followUser = (id, action) => {
    let data = {
      idFollower: '122',
      idFollowed: id,
      do: action,
    };
    this.props.actions.followUser(data);
  };

  routerMethod = destiny => {
    history.push(this.props.isSimilar ? '../'+destiny : destiny);
    window.scrollTo(0, 0);
  };

  buildNews = () => {
    return this.props.articles.data.map(item => {
      return (
        <div key={item.title} className="news-conts">
          <div className="header-div">
            <p onClick={() => this.handleModal(true, item.user.id)} className="three-dots">
              ...
            </p>
          </div>
          <div
            className="img-div"
            onClick={() => this.routerMethod('news/34200112')}
            style={{
              backgroundImage: `url(${item.img_url})`,
            }}
          ></div>
          <div className="p-div">
            <p onClick={() => this.routerMethod('news/34200112')}>{item.title}</p>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="home-news">
        <div className="news-space">
          <div className="container news-container">
            <div className="row">{this.buildNews()}</div>
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
)(News);
