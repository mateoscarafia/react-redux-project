import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import history from '../../common/history';
import * as VALUES from '../../constants';
//import ReactPlayer from 'react-player'

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
              className={design}
            >
              {this.props.articles.data.main_feed[prop].is_video === 1 ? (
                <div
                  className="img-div"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                  }
                  style={{
                    backgroundImage: `url(${VALUES.STORAGE_URL +
                      this.props.articles.data.main_feed[prop].profile_img_url})`,
                  }}
                >
                  <img
                    alt="video"
                    className="play-video-style-div"
                    src={require('../../images/play_video.png')}
                  />
                </div>

              ) : (
                  <div
                    id={'id-article-unique-key-' + this.props.articles.data.main_feed[prop].id}
                    className="img-div"
                    onClick={() =>
                      this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                    }
                    style={{
                      backgroundImage: `url(${VALUES.STORAGE_URL +
                        this.props.articles.data.main_feed[prop].img_url})`,
                    }}
                  ></div>
                )}
              <div
                className={
                  !this.props.id ? 'wrapper-news-div-hover' : 'wrapper-news-div-hover'
                }
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                }
                id={'news-hover-' + this.props.articles.data.main_feed[prop].id}
              >
                <p>
                  {this.props.articles.data.main_feed[prop].username.length > 20
                    ? this.props.articles.data.main_feed[prop].name +
                    ' | ' +
                    this.props.articles.data.main_feed[prop].username.substring(0, 20) + '...'
                    : this.props.articles.data.main_feed[prop].name +
                    ' | ' +
                    this.props.articles.data.main_feed[prop].username}
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
              className={design}
            >
              {this.props.articles.data.backup_feed[prop].is_video === 1 ? (
                <div
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                  }
                  className="img-div"
                  style={{
                    backgroundImage: `url(${VALUES.STORAGE_URL +
                      this.props.articles.data.backup_feed[prop].profile_img_url})`,
                  }}
                >
                  <img
                    alt="video"
                    className="play-video-style-div"
                    src={require('../../images/play_video.png')}
                  />
                </div>
              ) : (
                  <div
                    id={'id-article-unique-key-' + this.props.articles.data.backup_feed[prop].id}
                    onClick={() =>
                      this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                    }
                    className="img-div"
                    style={{
                      backgroundImage: `url(${VALUES.STORAGE_URL +
                        this.props.articles.data.backup_feed[prop].img_url})`,
                    }}
                  ></div>
                )}
              <div
                className={
                  !this.props.id ? 'wrapper-news-div-hover' : 'wrapper-news-div-hover'
                }
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                }
                id={'news-hover-' + this.props.articles.data.backup_feed[prop].id}
              >
                <p>
                  {this.props.articles.data.backup_feed[prop].username.length > 20
                    ? this.props.articles.data.backup_feed[prop].name + ' | ' + this.props.articles.data.backup_feed[prop].username.substring(0, 20) +
                    '...'
                    : this.props.articles.data.backup_feed[prop].name +
                    ' | ' +
                    this.props.articles.data.backup_feed[prop].username}
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

  componentDidMount() {
    this.rotate();
  }

  buildNewsSearch = () => {
    let data = [];
    data.push(
      <div key={Math.random()} className="width-search-result-cont">
        <p className="search-result-text"></p>
      </div>,
    );
    for (const prop in this.props.articles.data.main_feed) {
      data.push(
        <div
          key={this.props.articles.data.main_feed[prop].id}
          className={'design-120-60'}
        >
          {this.props.articles.data.main_feed[prop].is_video === 1 ? (
            <div
              className="img-div"
              onClick={() =>
                this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
              }
              style={{
                backgroundImage: `url(${VALUES.STORAGE_URL +
                  this.props.articles.data.main_feed[prop].profile_img_url})`,
              }}
            >
              <img
                alt="video"
                className="play-video-style-div"
                src={require('../../images/play_video.png')}
              />
            </div>
          ) : (
              <div
                className="img-div"
                onClick={() =>
                  this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                }
                style={{
                  backgroundImage: `url(${VALUES.STORAGE_URL +
                    this.props.articles.data.main_feed[prop].img_url})`,
                }}
              ></div>
            )}
          <div
            className={!this.props.id ? 'wrapper-news-div-hover' : 'wrapper-news-div-hover'}
            onClick={() => this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)}
            id={'news-hover-' + this.props.articles.data.main_feed[prop].id}
          >
            <p>
              {this.props.articles.data.main_feed[prop].username.length > 80
                ? this.props.articles.data.main_feed[prop].username.substring(0, 80) + '...'
                : this.props.articles.data.main_feed[prop].username}
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
    return this.props.articles.data.main_feed ? (
      this.props.articles.data.main_feed[0] ? (
        data
      ) : (
          <h5 className="no-result-tag-title">{'Sin resultados'}</h5>
        )
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
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  rotate = () => {
    let articles = [];
    if (this.props.articles.data.backup_feed && this.props.articles.data.backup_feed[0]) {
      articles = [...this.props.articles.data.backup_feed];
    }
    if (this.props.articles.data.main_feed && this.props.articles.data.main_feed[0]) {
      articles = [articles, ...this.props.articles.data.main_feed];
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

  render() {
    if (this.props.home.getArticlesError) {
      this.goToErrorLanding();
      return null;
    } else {
      return (
        <div className="home-news">
          <div className="news-space">
            <div className="container news-container">
              {this.props.routeparams !== 'main' && this.props.articles && (
                <div className="row">{this.buildNewsSearch()}</div>
              )}
              {this.props.routeparams === 'main' && (
                <div>
                  <h5 className="no-result-tag-title-article-tit">{'Artículos recientes'}</h5>
                  {this.newsDistribution()}
                </div>
              )}
            </div>
          </div>
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
