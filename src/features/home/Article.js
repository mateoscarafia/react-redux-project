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
      } catch (err) {}
      if (user) {
        this.setState({
          login: true,
          id: user.id,
          article_likes: null,
        });
      }
    }
    this.props.actions.getArticle({ token: VALUES.DEEP_TOKEN, id: this.props.match.params.id });
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
    let data = {
      news_id: this.props.match.params.id,
      user_id: this.state.id,
      token: VALUES.DEEP_TOKEN,
    };
    this.props.actions.userLike(data);
  };

  reportArticle = (id, action) => {
    let data = {
      idFollower: '122',
      idFollowed: id,
      do: action,
    };
    this.props.actions.reportArticle(data);
  };

  buildNews = () => {
    return this.props.home.related.data.map(item => {
      return (
        <div key={item.title + '-' + item.id} className="news-conts">
          <div
            className="img-div"
            onClick={() => this.routerMethod('../news/' + item.id, item.id)}
            style={{
              backgroundImage: `url(${item.img_url})`,
            }}
          >
            <div className="img-div-news-category">{item.username}</div>
          </div>
          <div className="p-div">
            <p
              className="p-div-title-text"
              onClick={() => this.routerMethod('../news/' + item.id, item.id)}
            >
              {item.title}
            </p>
          </div>
        </div>
      );
    });
  };

  render() {
    if (this.props.home.uniquearticle && !this.props.home.uniquearticle.data[0]) {
      return <h1>Sin datos</h1>;
    } else {
      return (
        <div className="home-article">
          {typeof this.props.home.categories !== 'undefined' &&
            typeof this.props.home.uniquearticle !== 'undefined' && (
              <NavBar
                login={this.state.login}
                history={this.props.history}
                categories={this.props.home.categories}
                user={this.state.id}
              />
            )}
          {typeof this.props.home.uniquearticle !== 'undefined' && (
            <div className="home-article-content">
              <div className="home-article-header-content">
                <div className="row">
                  <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12">
                    <div
                      className="img-div-article-news-header"
                      onClick={() =>
                        this.routerMethod(
                          '../profile/' + this.props.home.uniquearticle.data[0].user_id,
                          null,
                        )
                      }
                      style={{
                        backgroundImage: `url(${this.props.home.uniquearticle.data[0].profile_img_url})`,
                      }}
                    ></div>
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
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
              <h5 className="date-article-font">
                  {Date(this.props.home.uniquearticle.data[0].created_at).toString()}
                </h5>
              <div
                style={{
                  backgroundImage: `url(${'http://'+VALUES.BD_ORIGIN+':3000/article_images/'+this.props.home.uniquearticle.data[0].img_url})`,
                }}
                className="single-article-image-show-div"
              ></div>
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
                    Me gusta
                  </p>
                  <p className="review-article-user-num">
                    +{this.state.article_likes || this.props.home.uniquearticle.data[0].total_likes}
                  </p>
                </div>
                <div className="review-article-user-div-second">
                  <p
                    onClick={() => this.reportArticle(this.props.match.params.id, true)}
                    className="review-article-user"
                  >
                    Denunciar
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
            <p>Relacionados</p>
            <div className="row">
              {typeof this.props.home.related !== 'undefined' && this.buildNews()}
            </div>
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
                    backgroundImage: `url(${this.state.profile_img_url})`,
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
