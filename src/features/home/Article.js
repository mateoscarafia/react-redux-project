import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Modal from 'react-awesome-modal';
import 'react-notifications/lib/notifications.css';
import ReactHtmlParser from 'react-html-parser';
import * as VALUES from '../../constants';
/*import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
} from 'react-share';*/

//Components
import NavBar from './NavBar';
import Comments from './Comments';
import Footer from './Footer';

const jwt = require('jsonwebtoken');

export class Article extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      login: false,
      id: null,
    };
  }

  componentWillMount() {
    //If user is logged
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
      }
      if (user) {
        this.setState({
          login: true,
          id: user.id,
          article_likes: null,
        });
      }
    }
    this.props.match.params.id &&
      this.props.actions.getArticle({ token: VALUES.DEEP_TOKEN, id: this.props.match.params.id });
    this.props.match.params.id &&
      this.props.actions.getRelated({ token: VALUES.DEEP_TOKEN, id: this.props.match.params.id });
    this.props.actions.getCategories();
  }

  componentDidMount() {
    this.props.actions.postViews();
  }

  componentWillReceiveProps(nextProps) {
    this.props.home.userLikePending && NotificationManager.info('Te gusta el articulo');
    this.props.home.userLikePending &&
      !nextProps.home.userLikeError &&
      this.setState({
        article_likes: this.props.home.uniquearticle.data[0].total_likes + 1,
      });
    this.props.home.reportArticlePending && NotificationManager.info('Denunciaste el articulo');
  }

  routerMethod = async (destiny, id) => {
    window.scrollTo(0, 0);
    if (id) {
      await this.props.actions.getArticle({ token: VALUES.DEEP_TOKEN, id: id });
      await this.props.actions.getComments({ news_id: id, token: VALUES.DEEP_TOKEN });
    }
    this.props.history.push(destiny);
  };

  handleModal = (action, id) => {
    if (action) {
      var user = this.props.home.related.data.find(function(item) {
        return item.user_id === id ? item : null;
      });
      this.setState({
        visible: action,
        username: user.username,
        profession: user.profession,
        profile_img_url: user.profile_img_url,
        userid: user.user_id,
      });
    } else {
      this.setState({
        visible: action,
      });
    }
  };

  followUser = (id, action) => {
    let data = {
      idFollower: '122',
      idFollowed: id,
      do: action,
    };
    this.props.actions.followUser(data);
  };

  likeArticle = (id, action) => {
    if (this.state.id) {
      let data = {
        news_id: this.props.match.params.id,
        token: localStorage.getItem('token-app-auth-current'),
      };
      this.props.actions.userLike(data);
    } else {
      NotificationManager.info('Solo logueado puedes dar like');
    }
  };

  articleDivInfoVisible = div => {
    document.getElementById(div).style.opacity = 0.7;
  };

  articleDivInfoInvisible = div => {
    document.getElementById(div).style.opacity = 0;
  };

  buildNews = () => {
    return this.props.home.related.data.map(item => {
      if (item.id !== parseInt(this.props.match.params.id, 10)) {
        return (
          <div
            key={item.title + '-' + item.id}
            className="design-120-60"
            onMouseEnter={() =>
              this.articleDivInfoVisible(
                'news-hover-' + item.id,
              )
            }
            onMouseLeave={() =>
              this.articleDivInfoInvisible(
                'news-hover-' + item.id,
              )
            }
          >
            <div
              className="img-div"
              onClick={() => this.routerMethod('../news/' + item.id, item.id)}
              style={{
                backgroundImage: `url(${'http://' +
                  VALUES.BD_ORIGIN +
                  ':3000/network_images/' +
                  item.img_url})`,
              }}
            ></div>
            <div
              className="wrapper-news-div-hover"
              onClick={() => this.routerMethod('../news/' + item.id, item.id)}
              id={'news-hover-' + item.id}
            >
              <p>{item.username}</p>
              <h1>{item.title.length > 80 ? item.title.substring(0, 80) + '...' : item.title}</h1>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  goToErrorLanding = () => {
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/errorlanding');
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

  render() {
    if (this.props.home.getArticleError || this.props.home.getCategoriesError) {
      this.goToErrorLanding();
      return null;
    } else {
      return (
        <div className="home-article">
          {typeof this.props.home.categories !== 'undefined' && (
            <NavBar
              login={this.state.login}
              history={this.props.history}
              categories={this.props.home.categories}
              user={this.state.id}
            />
          )}
          {(this.props.home.getArticlePending || !this.props.home.uniquearticle) && (
            <div
              id="spinner-div-for-news-id-container-home-waiting"
              className="spinner-div-for-news-home-when-no-content-article"
            >
              <img
                alt="edit"
                width="60"
                className="edit-pen-user-profile-style"
                src={require('../../images/spinner.gif')}
              />
            </div>
          )}
          {!this.props.home.getArticlePending && this.props.home.uniquearticle && (
            <div className="home-article-content">
              <div className="home-article-header-content">
                {this.props.home.uniquearticle.data[0].user_id === this.state.id && (
                  <button
                    type="button"
                    onClick={() =>
                      this.routerMethod('../editarticle/' + this.props.match.params.id, null)
                    }
                    className="btn btn-primary button-absolute-top-right"
                  >
                    Editar articulo
                  </button>
                )}
                <div className="row">
                  <div className="col-lg-1 col-md-3 col-sm-6 col-xs-6">
                    <div
                      className="img-div-article-news-header"
                      onClick={() =>
                        this.routerMethod(
                          '../profile/' + this.props.home.uniquearticle.data[0].user_id,
                          null,
                        )
                      }
                      style={{
                        backgroundImage: `url(${'http://' +
                          VALUES.BD_ORIGIN +
                          ':3000/network_images/' +
                          this.props.home.uniquearticle.data[0].profile_img_url})`,
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <p
                      onClick={() =>
                        this.routerMethod(
                          '../profile/' + this.props.home.uniquearticle.data[0].user_id,
                        )
                      }
                      className="article-header-username-main"
                    >
                      {this.props.home.uniquearticle.data[0].username}
                    </p>
                    <p
                      onClick={() =>
                        this.routerMethod(
                          '../profile/' + this.props.home.uniquearticle.data[0].user_id,
                          null,
                        )
                      }
                      className="article-header-username-main-subdata"
                    >
                      {this.props.home.uniquearticle.data[0].profession}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${'http://' +
                    VALUES.BD_ORIGIN +
                    ':3000/network_images/' +
                    this.props.home.uniquearticle.data[0].img_url})`,
                }}
                className="single-article-image-show-div"
              >
                <h5 className="date-article-font">
                  {this.props.home.uniquearticle &&
                    this.convertDate(
                      new Date(this.props.home.uniquearticle.data[0].created_at).toString(),
                    )}
                </h5>
              </div>
              <div className="article-content-text-show-div">
                <h1>{this.props.home.uniquearticle.data[0].title}</h1>
                <h4 className="subtitle-article">
                  {this.props.home.uniquearticle.data[0].subtitle}
                </h4>
                <div className="single-article-text-font-style">
                  {ReactHtmlParser(this.props.home.uniquearticle.data[0].content)}
                </div>
                <br />
                <div className="review-article-user-div">
                  <p
                    onClick={() => this.likeArticle(this.props.match.params.id, true)}
                    className="review-article-user"
                  >
                    <img
                      alt="edit"
                      style={{ width: '40px' }}
                      className="edit-pen-user-profile-style"
                      src={require('../../images/like.PNG')}
                    />
                  </p>
                  <p className="review-article-user-num">
                    +{this.state.article_likes || this.props.home.uniquearticle.data[0].total_likes}
                  </p>
                </div>
              </div>
            </div>
          )}
          {this.props.home.uniquearticle && (
            <Comments
              history={this.props.history}
              user_id={this.state.id}
              news_id={this.props.home.uniquearticle.data[0].id}
            />
          )}
          <div className="similar-articles-article">
            <p style={{fontSize:'12px'}}>Relacionados</p>
            <div className="row">{this.props.home.related && this.buildNews()}</div>
          </div>
          <Footer />
          <Modal
            visible={this.state.visible}
            width="300px"
            height="300px"
            borderRadius="0px"
            effect="fadeInDown"
            onClickAway={() => this.handleModal(false)}
          >
            <div className="user-popup-content">
              <a className="close-modal-header" onClick={() => this.handleModal(false)}>
                X
              </a>
              <div className="user-popup-header-img">
                <div
                  onClick={() => this.routerMethod('../profile/' + this.state.userid, null)}
                  style={{
                    backgroundImage: `url(${'http://' +
                      VALUES.BD_ORIGIN +
                      ':3000/network_images/' +
                      this.state.profile_img_url})`,
                  }}
                  className="user-profile-picture-popup"
                ></div>
              </div>
              <div className="user-data-header-popup">
                <h4 onClick={() => this.routerMethod('../profile/' + this.state.userid, null)}>
                  {this.state.username}
                </h4>
                <p>{this.state.profession}</p>
                <p
                  onClick={() => this.followUser(this.state.userid, true)}
                  className="follow-button"
                >
                  Seguir
                </p>
              </div>
            </div>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);
