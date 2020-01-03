import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Modal from 'react-awesome-modal';
import history from '../../common/history';
import * as VALUES from '../../constants';

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

  routerMethod = async destiny => {
    history.push(this.props.isSimilar ? '../../' + destiny : '../' + destiny);
    window.scrollTo(0, 0);
  };

  articleDivInfoVisible = div => {
    document.getElementById(div).style.opacity = 0.7;
  };

  articleDivInfoInvisible = div => {
    document.getElementById(div).style.opacity = 0;
  };

  buildNews = (type, min, max, design) => {
    let data = [];
    if (type === 'main') {
      max = max === 'end' ? this.props.articles.data.main_feed.length : max;
      for (const prop in this.props.articles.data.main_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div
              key={this.props.articles.data.main_feed[prop].id}
              className={!this.props.id ? design : 'design-120-60-less-height'}
              onMouseEnter={() =>
                this.articleDivInfoVisible(
                  'news-hover-' + this.props.articles.data.main_feed[prop].id,
                )
              }
              onMouseLeave={() =>
                this.articleDivInfoInvisible(
                  'news-hover-' + this.props.articles.data.main_feed[prop].id,
                )
              }
            >
              <div
                className="img-div"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.main_feed[prop].img_url})`,
                }}
              ></div>
              <div
                className={
                  !this.props.id ? 'wrapper-news-div-hover' : 'wrapper-news-div-hover-smaller'
                }
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                }
                id={'news-hover-' + this.props.articles.data.main_feed[prop].id}
              >
                <p>
                  {this.props.articles.data.main_feed[prop].username +
                    ' - ' +
                    this.props.articles.data.main_feed[prop].name}
                </p>
                <h1>
                  {this.props.articles.data.main_feed[prop].title.length > 100
                    ? this.props.articles.data.main_feed[prop].title.substring(0, 100) + '...'
                    : this.props.articles.data.main_feed[prop].title}
                </h1>
              </div>
            </div>,
          );
        }
      }
    } else {
      max = max === 'end' ? this.props.articles.data.backup_feed.length : max;
      for (const prop in this.props.articles.data.backup_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div
              key={this.props.articles.data.backup_feed[prop].id}
              className={!this.props.id ? design : 'design-120-60-less-height'}
              onMouseEnter={() =>
                this.articleDivInfoVisible(
                  'news-hover-' + this.props.articles.data.backup_feed[prop].id,
                )
              }
              onMouseLeave={() =>
                this.articleDivInfoInvisible(
                  'news-hover-' + this.props.articles.data.backup_feed[prop].id,
                )
              }
            >
              <div
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                className="img-div"
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.backup_feed[prop].img_url})`,
                }}
              ></div>
              <div
                className={
                  !this.props.id ? 'wrapper-news-div-hover' : 'wrapper-news-div-hover-smaller'
                }
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                id={'news-hover-' + this.props.articles.data.backup_feed[prop].id}
              >
                <p>
                  {this.props.articles.data.backup_feed[prop].username +
                    ' - ' +
                    this.props.articles.data.backup_feed[prop].name}
                </p>
                <h1>
                  {this.props.articles.data.backup_feed[prop].title.length > 100
                    ? this.props.articles.data.backup_feed[prop].title.substring(0, 100) + '...'
                    : this.props.articles.data.backup_feed[prop].title}
                </h1>
              </div>
            </div>,
          );
        }
      }
    }
    return data;
  };

  buildNewsSearch = () => {
    let data = [];
    data.push(
      <div className="width-search-result-cont">
        <p className="search-result-text"></p>
      </div>,
    );
    for (const prop in this.props.articles.data.main_feed) {
      data.push(
        <div
          key={this.props.articles.data.main_feed[prop].id}
          className={!this.props.id ? 'design-120-60' : 'design-120-60-less-height'}
          onMouseEnter={() =>
            this.articleDivInfoVisible('news-hover-' + this.props.articles.data.main_feed[prop].id)
          }
          onMouseLeave={() =>
            this.articleDivInfoInvisible(
              'news-hover-' + this.props.articles.data.main_feed[prop].id,
            )
          }
        >
          <div
            className="img-div"
            onClick={() =>
              this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
            }
            style={{
              backgroundImage: `url(${'http://' +
                VALUES.BD_ORIGIN +
                ':3000/network_images/' +
                this.props.articles.data.main_feed[prop].img_url})`,
            }}
          ></div>
          <div
            className={!this.props.id ? 'wrapper-news-div-hover' : 'wrapper-news-div-hover-smaller'}
            onClick={() => this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)}
            id={'news-hover-' + this.props.articles.data.main_feed[prop].id}
          >
            <p>{this.props.articles.data.main_feed[prop].username}</p>
            <h1>
              {this.props.articles.data.main_feed[prop].title.length > 100
                ? this.props.articles.data.main_feed[prop].title.substring(0, 100) + '...'
                : this.props.articles.data.main_feed[prop].title}
            </h1>
          </div>
        </div>,
      );
    }
    return this.props.articles.data.main_feed[0] ? (
      data
    ) : (
      <h5 className="no-result-tag-title">{'Sin resultados'}</h5>
    );
  };

  newsDistribution = () => {
    window.scrollTo(0, 0);
    var contentNews = [];
    if (
      this.props.articles &&
      this.props.articles.data.main_feed &&
      this.props.articles.data.backup_feed &&
      this.props.routeparams === 'main' &&
      this.props.id
    ) {
      contentNews.push(
        <div className="row" key={Math.random()}>
          {this.buildNews('main', 0, 'end', 'design-120-60')}
          {this.buildNews('back', 0, 'end', 'design-120-60')}
        </div>,
      );
    } else if (
      this.props.articles &&
      this.props.articles.data.main_feed &&
      this.props.routeparams === 'main' &&
      !this.props.id
    ) {
      contentNews.push(
        <div className="row" key={Math.random()}>
          {this.buildNews('main', 0, 'end', 'design-120-60')}
        </div>,
      );
      contentNews.push(<br key={Math.random()} />);
    }
    return contentNews;
  };

  goToErrorLanding = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
  };

  render() {
    if (this.props.home.getArticlesError) {
      this.goToErrorLanding();
      return null;
    } else {
      return (
        <div className="home-news">
          <div className="news-space">
            <div className="container news-container">
              {this.props.routeparams !== 'main' && (
                <div className="row">{this.buildNewsSearch()}</div>
              )}
              {this.props.routeparams === 'main' && <div>{this.newsDistribution()}</div>}
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
                      backgroundImage: `url(${'http://' +
                        VALUES.BD_ORIGIN +
                        ':3000/network_images/' +
                        this.props.home.writer.data.profile_img_url})`,
                    }}
                    className="user-profile-picture-popup"
                  ></div>
                </div>
                <div className="user-data-header-popup">
                  <h4
                    onClick={() => this.routerMethod('profile/' + this.props.home.writer.data.id)}
                  >
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
