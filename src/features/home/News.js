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

  routerMethod = destiny => {
    history.push(this.props.isSimilar ? '../../' + destiny : '../' + destiny);
    window.scrollTo(0, 0);
  };

  buildNews = (type, min, max) => {
    let data = [];
    if (type === 'main') {
      max = max === 'end' ? this.props.articles.data.main_feed.length : max;
      for (const prop in this.props.articles.data.main_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div key={Math.random()} className="news-conts">
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
              >
                <div className="img-div-news-category">
                  {this.props.articles.data.main_feed[prop].name}
                </div>
              </div>
              <div className="p-div">
                <p
                  className="p-div-title-text"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                  }
                >
                  {this.props.articles.data.main_feed[prop].title}
                </p>
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
            <div key={Math.random()} className="news-conts">
              <div
                className="img-div"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.backup_feed[prop].img_url})`,
                }}
              >
                <div className="img-div-news-category">
                  {this.props.articles.data.backup_feed[prop].name}
                </div>
              </div>
              <div className="p-div">
                <p
                  className="p-div-title-text"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                  }
                >
                  {this.props.articles.data.backup_feed[prop].title}
                </p>
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
        <p className="search-result-text">Resultados de busqueda</p>
      </div>,
    );
    for (const prop in this.props.articles.data.main_feed) {
      data.push(
        <div key={Math.random()} className="news-conts">
          <div
            className="img-div"
            onClick={() => this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)}
            style={{
              backgroundImage: `url(${'http://' +
                VALUES.BD_ORIGIN +
                ':3000/network_images/' +
                this.props.articles.data.main_feed[prop].img_url})`,
            }}
          >
            <div className="img-div-news-category">
              {this.props.articles.data.main_feed[prop].username}
            </div>
          </div>
          <div className="p-div">
            <p
              className="p-div-title-text"
              onClick={() =>
                this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
              }
            >
              {this.props.articles.data.main_feed[prop].title}
            </p>
          </div>
        </div>,
      );
    }
    return data;
  };

  buildProfileNews = (type, min, max) => {
    let data = [];
    if (type === 'main') {
      for (const prop in this.props.articles.data.main_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div key={Math.random()} className="news-conts-secondary-news">
              <div
                className="img-div-secondary-news"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.main_feed[prop].img_url})`,
                }}
              >
                <div className="img-div-news-category-secondary-news">
                  {this.props.articles.data.main_feed[prop].username}
                </div>
              </div>
              <div className="p-div-secondary-news">
                <p
                  className="p-div-title-text-secondary-news"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                  }
                >
                  {this.props.articles.data.main_feed[prop].title}
                </p>
              </div>
            </div>,
          );
        }
      }
    } else {
      for (const prop in this.props.articles.data.backup_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div key={Math.random()} className="news-conts-secondary-news">
              <div
                className="img-div-secondary-news"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.backup_feed[prop].img_url})`,
                }}
              >
                <div className="img-div-news-category-secondary-news">
                  {this.props.articles.data.backup_feed[prop].username}
                </div>
              </div>
              <div className="p-div-secondary-news">
                <p
                  className="p-div-title-text-secondary-news"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                  }
                >
                  {this.props.articles.data.backup_feed[prop].title}
                </p>
              </div>
            </div>,
          );
        }
      }
    }
    return data;
  };

  buildRecommendedNews = (type, min, max) => {
    let data = [];
    if (type === 'main') {
      for (const prop in this.props.articles.data.main_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div
              key={this.props.articles.data.main_feed[prop].id + 'recommended'}
              className="news-conts-recommended-news"
            >
              <div
                className="img-div-recommended-news"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.main_feed[prop].img_url})`,
                }}
              >
                <div className="img-div-news-category-recommended-news">
                  <p
                    onClick={() =>
                      this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                    }
                    className="tit-news-category-recommended-news"
                  >
                    {this.props.articles.data.main_feed[prop].title}
                  </p>
                </div>
              </div>
            </div>,
          );
        }
      }
    } else {
      for (const prop in this.props.articles.data.backup_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div
              key={this.props.articles.data.backup_feed[prop].id + 'recommended'}
              className="news-conts-recommended-news"
            >
              <div
                className="img-div-recommended-news"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.backup_feed[prop].img_url})`,
                }}
              >
                <div className="img-div-news-category-recommended-news">
                  <p
                    onClick={() =>
                      this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                    }
                    className="tit-news-category-recommended-news"
                  >
                    {this.props.articles.data.backup_feed[prop].title}
                  </p>
                </div>
              </div>
            </div>,
          );
        }
      }
    }
    return data;
  };

  buildMostSeenNews = (style, min, max) => {
    let data = [];
    if (style === 'main') {
      for (const prop in this.props.articles.data.main_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div
              key={this.props.articles.data.main_feed[prop].id + 'most-seen'}
              className="news-conts-mostseen-news"
            >
              <div
                className="img-div-mostseen-news"
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
              <div className="p-div-mostseen-news">
                <p
                  className="p-div-title-text-mostseen-news"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                  }
                >
                  {this.props.articles.data.main_feed[prop].title}
                </p>
                <p className="p-div-title-text-mostseen-news-username">
                  Por {this.props.articles.data.main_feed[prop].username}
                </p>
              </div>
            </div>,
          );
        }
      }
    } else {
      for (const prop in this.props.articles.data.backup_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div
              key={this.props.articles.data.backup_feed[prop].id + 'most-seen'}
              className="news-conts-mostseen-news"
            >
              <div
                className="img-div-mostseen-news"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.backup_feed[prop].img_url})`,
                }}
              ></div>
              <div className="p-div-mostseen-news">
                <p
                  className="p-div-title-text-mostseen-news"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                  }
                >
                  {this.props.articles.data.backup_feed[prop].title}
                </p>
                <p className="p-div-title-text-mostseen-news-username">
                  Por {this.props.articles.data.backup_feed[prop].username}
                </p>
              </div>
            </div>,
          );
        }
      }
    }
    return data;
  };

  buildOpinionNews = (type, min, max) => {
    let data = [];
    if (type === 'main') {
      for (const prop in this.props.articles.data.main_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div key={Math.random()} className="news-conts-opinion-news">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div
                      className="img-div-opinion-news"
                      onClick={() =>
                        this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                      }
                      style={{
                        backgroundImage: `url(${'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.main_feed[prop].profile_img_url})`,
                      }}
                    ></div>
                  </div>

                  <div className=" col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <p
                      className="p-title-text-opinion-news"
                      onClick={() =>
                        this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                      }
                    >
                      {this.props.articles.data.main_feed[prop].title}
                    </p>
                    <p
                      className="p-username-opinion-news"
                      onClick={() =>
                        this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                      }
                    >
                      {this.props.articles.data.main_feed[prop].username}
                    </p>
                  </div>
                </div>
              </div>
            </div>,
          );
        }
      }
    } else {
      for (const prop in this.props.articles.data.backup_feed) {
        if (prop >= min && prop < max) {
          data.push(
            <div key={Math.random()} className="news-conts-opinion-news">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    <div
                      className="img-div-opinion-news"
                      onClick={() =>
                        this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                      }
                      style={{
                        backgroundImage: `url(${'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.backup_feed[prop].profile_img_url})`,
                      }}
                    ></div>
                  </div>

                  <div className=" col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <p
                      className="p-title-text-opinion-news"
                      onClick={() =>
                        this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                      }
                    >
                      {this.props.articles.data.backup_feed[prop].title}
                    </p>
                    <p
                      className="p-username-opinion-news"
                      onClick={() =>
                        this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                      }
                    >
                      {this.props.articles.data.backup_feed[prop].username}
                    </p>
                  </div>
                </div>
              </div>
            </div>,
          );
        }
      }
    }
    return data;
  };

  buildMainNews = type => {
    let data = [];
    if (type === 'main') {
      for (const prop in this.props.articles.data.main_feed) {
        if (prop >= 0 && prop < 2) {
          data.push(
            <div key={Math.random()} className="news-conts-main-container">
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
              >
                <div className="img-div-news-category-main-div-info">
                  {this.props.articles.data.main_feed[prop].username}
                </div>
              </div>
              <div className="p-div">
                <p
                  className="p-div-title-text-main-text"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                  }
                >
                  {this.props.articles.data.main_feed[prop].title}
                </p>
              </div>
            </div>,
          );
        }
      }
    } else {
      for (const prop in this.props.articles.data.backup_feed) {
        if (prop >= 0 && prop < 2) {
          data.push(
            <div key={Math.random()} className="news-conts-main-container">
              <div
                className="img-div"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.backup_feed[prop].img_url})`,
                }}
              >
                <div className="img-div-news-category-main-div-info">
                  {this.props.articles.data.backup_feed[prop].username}
                </div>
              </div>
              <div className="p-div">
                <p
                  className="p-div-title-text-main-text"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                  }
                >
                  {this.props.articles.data.backup_feed[prop].title}
                </p>
              </div>
            </div>,
          );
        }
      }
    }
    return data;
  };

  checkIfArrayContainsMain(max) {
    return this.props.articles.data.main_feed[max] ? true : false;
  }
  checkIfArrayContainsBack(max) {
    return this.props.articles.data.backup_feed[max] ? true : false;
  }

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
      this.checkIfArrayContainsMain(2) &&
        contentNews.push(<div className="row margin-for-news">{this.buildMainNews('main')}</div>);
      this.checkIfArrayContainsMain(9) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('main', 2, 10)}</div>,
        );
      this.checkIfArrayContainsMain(12) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildProfileNews('main', 10, 13)}</div>,
        );
      this.checkIfArrayContainsBack(2) &&
        contentNews.push(
          <div className="most-see-news-div margin-for-news">
            <h1 className="h1-news-main-title-mostseen">Te puede interesar</h1>
            {this.buildMostSeenNews('back', 0, 3)}
          </div>,
        );
      this.checkIfArrayContainsMain(14) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildRecommendedNews('main', 13, 15)}</div>,
        );
      this.checkIfArrayContainsMain(17) &&
        contentNews.push(
          <div className="row margin-for-news">
            <h1 className="h1-news-main-title-opinion">Análisis</h1>
            {this.buildOpinionNews('main', 15, 17)}
          </div>,
        );
      this.checkIfArrayContainsMain(20) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('main', 17, 'end')}</div>,
        );
      !this.checkIfArrayContainsMain(2) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('main', 0, 'end')}</div>,
        );
      this.checkIfArrayContainsBack(2) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('back', 3, 'end')}</div>,
        );
      !this.checkIfArrayContainsBack(2) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('back', 0, 'end')}</div>,
        );
    } else if (
      this.props.articles &&
      this.props.articles.data.main_feed &&
      this.props.routeparams === 'main' &&
      !this.props.id
    ) {
      this.checkIfArrayContainsMain(2) &&
        contentNews.push(<div className="row margin-for-news">{this.buildMainNews('main')}</div>);
      this.checkIfArrayContainsMain(9) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('main', 2, 10)}</div>,
        );
      this.checkIfArrayContainsMain(12) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildProfileNews('main', 10, 13)}</div>,
        );
      this.checkIfArrayContainsMain(15) &&
        contentNews.push(
          <div className="most-see-news-div margin-for-news">
            <h1 className="h1-news-main-title-mostseen">Te puede interesar</h1>
            {this.buildMostSeenNews('main', 13, 16)}
          </div>,
        );
      this.checkIfArrayContainsMain(17) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildRecommendedNews('main', 15, 17)}</div>,
        );
      this.checkIfArrayContainsMain(19) &&
        contentNews.push(
          <div className="row margin-for-news">
            <h1 className="h1-news-main-title-opinion">Análisis</h1>
            {this.buildOpinionNews('main', 18, 20)}
          </div>,
        );
      this.checkIfArrayContainsMain(20) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('main', 20, 'end')}</div>,
        );
      !this.checkIfArrayContainsMain(2) &&
        contentNews.push(
          <div className="row margin-for-news">{this.buildNews('main', 0, 'end')}</div>,
        );
    }
    return contentNews;
  };

  render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
