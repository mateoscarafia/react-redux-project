import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
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
              {this.props.articles.data.main_feed[prop].is_video === 1 ? (
                <div
                  className="img-div"
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
                  }
                >
                  <img
                    alt="video"
                    className="play-video-style-div"
                    src={require('../../images/play_video.png')}
                  />
                  {window.screen.width < 800 ? (
                    <video
                      poster={
                        'http://' +
                        VALUES.BD_ORIGIN +
                        ':3000/network_images/' +
                        this.props.articles.data.main_feed[prop].img_url
                      }
                      width="100%"
                      height={!this.props.id ? '250' : '200'}
                      muted
                    >
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.main_feed[prop].img_url
                        }
                        type="video/mp4"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.main_feed[prop].img_url
                        }
                        type="video/webm"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.main_feed[prop].img_url
                        }
                        type="video/ogg"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <video width="100%" height={!this.props.id ? '250' : '200'} muted>
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.main_feed[prop].img_url
                        }
                        type="video/mp4"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.main_feed[prop].img_url
                        }
                        type="video/webm"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.main_feed[prop].img_url
                        }
                        type="video/ogg"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : (
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
              )}
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
                  {this.props.articles.data.main_feed[prop].username.length > 20
                    ? this.props.articles.data.main_feed[prop].username.substring(0, 20) +
                      '... - ' +
                      this.props.articles.data.main_feed[prop].name
                    : this.props.articles.data.main_feed[prop].username +
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
              {this.props.articles.data.backup_feed[prop].is_video === 1 ? (
                <div
                  onClick={() =>
                    this.routerMethod('news/' + this.props.articles.data.backup_feed[prop].id)
                  }
                  className="img-div"
                >
                  <img
                    alt="video"
                    className="play-video-style-div"
                    src={require('../../images/play_video.png')}
                  />
                  {window.screen.width < 800 ? (
                    <video
                      poster={
                        'http://' +
                        VALUES.BD_ORIGIN +
                        ':3000/network_images/' +
                        this.props.articles.data.backup_feed[prop].img_url
                      }
                      width="100%"
                      height={!this.props.id ? '250' : '200'}
                      muted
                    >
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.backup_feed[prop].img_url
                        }
                        type="video/mp4"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.backup_feed[prop].img_url
                        }
                        type="video/webm"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.backup_feed[prop].img_url
                        }
                        type="video/ogg"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <video width="100%" height={!this.props.id ? '250' : '200'} muted>
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.backup_feed[prop].img_url
                        }
                        type="video/mp4"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.backup_feed[prop].img_url
                        }
                        type="video/webm"
                      />
                      <source
                        src={
                          'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.articles.data.backup_feed[prop].img_url
                        }
                        type="video/ogg"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : (
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
              )}
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
                  {this.props.articles.data.backup_feed[prop].username.length > 20
                    ? this.props.articles.data.backup_feed[prop].username.substring(0, 20) +
                      '... - ' +
                      this.props.articles.data.backup_feed[prop].name
                    : this.props.articles.data.backup_feed[prop].username +
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
      <div key={Math.random()} className="width-search-result-cont">
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
          {this.props.articles.data.main_feed[prop].is_video === 1 ? (
            <div
              className="img-div"
              onClick={() =>
                this.routerMethod('news/' + this.props.articles.data.main_feed[prop].id)
              }
            >
              <img
                alt="video"
                className="play-video-style-div"
                src={require('../../images/play_video.png')}
              />
              {window.screen.width < 800 ? (
                <video
                  poster={
                    'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.articles.data.main_feed[prop].img_url
                  }
                  width="100%"
                  height={!this.props.id ? '250' : '200'}
                  muted
                >
                  <source
                    src={
                      'http://' +
                      VALUES.BD_ORIGIN +
                      ':3000/network_images/' +
                      this.props.articles.data.main_feed[prop].img_url
                    }
                    type="video/mp4"
                  />
                  <source
                    src={
                      'http://' +
                      VALUES.BD_ORIGIN +
                      ':3000/network_images/' +
                      this.props.articles.data.main_feed[prop].img_url
                    }
                    type="video/webm"
                  />
                  <source
                    src={
                      'http://' +
                      VALUES.BD_ORIGIN +
                      ':3000/network_images/' +
                      this.props.articles.data.main_feed[prop].img_url
                    }
                    type="video/ogg"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <video width="100%" height={!this.props.id ? '250' : '200'} muted>
                  <source
                    src={
                      'http://' +
                      VALUES.BD_ORIGIN +
                      ':3000/network_images/' +
                      this.props.articles.data.main_feed[prop].img_url
                    }
                    type="video/mp4"
                  />
                  <source
                    src={
                      'http://' +
                      VALUES.BD_ORIGIN +
                      ':3000/network_images/' +
                      this.props.articles.data.main_feed[prop].img_url
                    }
                    type="video/webm"
                  />
                  <source
                    src={
                      'http://' +
                      VALUES.BD_ORIGIN +
                      ':3000/network_images/' +
                      this.props.articles.data.main_feed[prop].img_url
                    }
                    type="video/ogg"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ) : (
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
          )}
          <div
            className={!this.props.id ? 'wrapper-news-div-hover' : 'wrapper-news-div-hover-smaller'}
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
              {this.props.routeparams !== 'main' && this.props.articles && (
                <div className="row">{this.buildNewsSearch()}</div>
              )}
              {this.props.routeparams === 'main' && <div>{this.newsDistribution()}</div>}
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
