import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ReactHtmlParser from 'react-html-parser';
import Helmet from "react-helmet";

import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";

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
      show_publicity_banner: true,
    };
  }

  componentDidMount() {
    /*if (document.getElementById('pop-up-id-publicity')) {
      document.getElementById('pop-up-id-publicity').style.visibility = 'visible';
    }*/
  }

  publicityVisible = () => {
    setTimeout(() => {
      if (document.getElementById('pop-up-id-publicity')) {
        document.getElementById('pop-up-id-publicity').style.opacity = 1;
      }
    }, 2000);
  };

  rotateImg = () => {
    if (document.getElementById('article-div-for-rotate-img')) {
      document.getElementById('article-div-for-rotate-img').style.transform =
        'rotate(' + this.props.home.uniquearticle.data[0].rotate_img + 'deg)';
    }
  };

  componentWillMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
      }
      if (user) {
        this.setState({
          login: true,
          id: user.id,
          article_likes: null,
          visited: false,
        });
        this.postVisitReader(this.props.match.params.id);
      }
    }
    if (this.props.match.params.id) {
      this.props.actions.getArticle({ token: VALUES.DEEP_TOKEN, id: this.props.match.params.id });
      this.props.actions.getRelated({ token: VALUES.DEEP_TOKEN, id: this.props.match.params.id });
    }
    this.props.actions.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.home.userLikePending && !nextProps.home.userLikeError) {
      this.setState({
        article_likes: this.props.home.uniquearticle.data[0].total_likes + 1,
      });
      NotificationManager.info('Te gusta el articulo');
    }
    if (this.props.home.userLikePending && nextProps.home.userLikeError) {
      NotificationManager.info('Ya te gusta el articulo');
    }
    if (this.props.home.reportArticlePending && !nextProps.home.reportArticleError) {
      NotificationManager.info('Denunciaste el articulo');
    }
  }

  routerMethod = async (destiny, id) => {
    window.scrollTo(0, 0);
    if (id) {
      localStorage.getItem('token-app-auth-current') && this.postVisitReader(id);
      await this.props.actions.getArticle({ token: VALUES.DEEP_TOKEN, id: id });
      await this.props.actions.getComments({ news_id: id, token: VALUES.DEEP_TOKEN });
    }
    this.props.history.push(destiny);
  };

  handleModal = (action, id) => {
    if (action) {
      var user = this.props.home.related.data.find(function (item) {
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

  likeArticle = () => {
    let data = {
      news_id: this.props.match.params.id,
      token: localStorage.getItem('token-app-auth-current') || null,
    };
    this.props.actions.userLike(data);
  };

  articleDivInfoVisible = div => {
    document.getElementById(div).style.opacity = 0.7;
  };

  articleDivInfoInvisible = div => {
    document.getElementById(div).style.opacity = 0;
  };

  rotateRelated = () => {
    let articles = [];
    if (
      this.props.home.related &&
      this.props.home.related.data &&
      this.props.home.related.data[0]
    ) {
      articles = [...this.props.home.related.data];
    }
    for (const prop in articles) {
      if (
        document.getElementById('id-article-unique-key-related-article-' + articles[prop].id) &&
        articles[prop].rotate_img
      ) {
        document.getElementById(
          'id-article-unique-key-related-article-' + articles[prop].id,
        ).style.transform = 'rotate(' + articles[prop].rotate_img + 'deg)';
      }
    }
  };

  buildNews = () => {
    return this.props.home.related.data.map(item => {
      if (item.id !== parseInt(this.props.match.params.id, 10)) {
        return (
          <div
            key={item.title + '-' + item.id}
            className="design-120-60-related-news"
            onMouseEnter={() => this.articleDivInfoVisible('news-hover-' + item.id)}
            onMouseLeave={() => this.articleDivInfoInvisible('news-hover-' + item.id)}
          >
            {item.is_video !== 1 ? (
              <div
                id={'id-article-unique-key-related-article-' + item.id}
                className="img-div"
                onClick={() => this.routerMethod('../news/' + item.id, item.id)}
                style={{
                  backgroundImage: `url(${VALUES.STORAGE_URL + item.img_url})`,
                }}
              ></div>
            ) : (
                <div
                  className="img-div"
                  onClick={() => this.routerMethod('../news/' + item.id, item.id)}
                >
                  <img
                    alt="video"
                    className="play-video-style-div"
                    src={require('../../images/play_video.png')}
                  />
                  {window.screen.width < 800 ? (
                    <video width="100%" poster={VALUES.STORAGE_URL + item.img_url} height="200" muted>
                      <source src={VALUES.STORAGE_URL + item.img_url} type="video/mp4" />
                      <source src={VALUES.STORAGE_URL + item.img_url} type="video/webm" />
                      <source src={VALUES.STORAGE_URL + item.img_url} type="video/ogg" />
                    Your browser does not support the video tag.
                    </video>
                  ) : (
                      <video width="100%" height="200" muted>
                        <source src={VALUES.STORAGE_URL + item.img_url} type="video/mp4" />
                        <source src={VALUES.STORAGE_URL + item.img_url} type="video/webm" />
                        <source src={VALUES.STORAGE_URL + item.img_url} type="video/ogg" />
                    Your browser does not support the video tag.
                      </video>
                    )}
                </div>
              )}
            <div
              className="wrapper-news-div-hover"
              onClick={() => this.routerMethod('../news/' + item.id, item.id)}
              id={'news-hover-' + item.id}
            >
              <p>
                {item.username.length > 20 ? item.username.substring(0, 20) + '...' : item.username}
              </p>
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
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
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
            : newFormat[1] === 'Apr'
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

  rotateUserProfileImage = () => {
    if (document.getElementById('img-div-article-news-header-id-rotation')) {
      document.getElementById('img-div-article-news-header-id-rotation').style.transform =
        'rotate(' + this.props.home.uniquearticle.data[0].rotate_img_profile + 'deg)';
    }
  };

  removeTokenAndKill = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  postVisitReader = id => {
    this.props.actions.postVisit({
      token: localStorage.getItem('token-app-auth-current'),
      news_id: id,
    });
  };

  goAway = () => {
    if (this.props.home.uniquearticle.data[0].publicity_link !== 'null') {
      window.open(this.props.home.uniquearticle.data[0].publicity_link, '_blank');
    }
  };

  render() {
    this.props.home.uniquearticle && this.rotateUserProfileImage();
    if (this.props.home.getArticleError || this.props.home.getCategoriesError) {
      this.goToErrorLanding();
      return null;
    } else if (
      this.props.home.uniquearticle &&
      this.props.home.uniquearticle.data[0] &&
      this.props.home.uniquearticle.data[0].username === 'blocked-user-woordi-secure-integrity'
    ) {
      this.removeTokenAndKill();
      return null;
    } else if (this.props.home.categories && !this.props.home.categories.data[0]) {
      this.goToErrorLanding();
    } else if (this.props.home.uniquearticle && !this.props.home.uniquearticle.data[0]) {
      this.goToErrorLanding();
      return null;
    } else {
      return (
        <div className="home-article">
          {!this.props.home.getArticlePending && this.props.home.uniquearticle && (
            <Helmet>
              {/* General tags */}
              <meta name="description" content={this.props.home.uniquearticle.data[0].title + " - "
                + this.props.home.uniquearticle.data[0].subtitle || null} />
              {/* OpenGraph tags */}
              <meta name="og:url" content={'https://www.woordi.com/news/' + this.props.home.uniquearticle.data[0].id} />
              <meta name="og:title" content={this.props.home.uniquearticle.data[0].title || null} />
              <meta name="og:description" content={this.props.home.uniquearticle.data[0].subtitle || null} />
              <meta name="og:image" content={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url || null} />
              <meta name="og:type" content="website" />
              {/* Twitter Card tags */}
              <meta name="twitter:title" content={this.props.home.uniquearticle.data[0].title || null} />
              <meta name="twitter:description" content={this.props.home.uniquearticle.data[0].subtitle || null} />
              <meta name="twitter:image" content={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url || null} />
              <meta name="twitter:card" content="summary" />
            </Helmet>
          )
          }
          {this.props.home.categories && (
            <NavBar
              login={this.state.login}
              history={this.props.history}
              categories={this.props.home.categories}
              user={this.state.id}
              username={null}
            />
          )}
          {(this.props.home.getArticlePending || !this.props.home.uniquearticle) && (
            <div
              id="spinner-div-for-news-id-container-home-waiting"
              className="spinner-div-for-news-home-when-no-content-article"
            >
              <img
                alt="edit"
                width="30"
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
                    Editar
                  </button>
                )}
                <div className="row">
                  <div
                    id="img-div-article-news-header-id-rotation"
                    className="img-div-article-news-header"
                    onClick={() =>
                      this.routerMethod(
                        '../profile/' + this.props.home.uniquearticle.data[0].user_id,
                        null,
                      )
                    }
                    style={{
                      backgroundImage: `url(${VALUES.STORAGE_URL +
                        this.props.home.uniquearticle.data[0].profile_img_url})`,
                    }}
                  ></div>
                  <div style={{ marginLeft: '20px' }}>
                    <p
                      onClick={() =>
                        this.routerMethod(
                          '../profile/' + this.props.home.uniquearticle.data[0].user_id,
                          null,
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
                      <img
                        alt="Popularidad"
                        title="Popularidad"
                        width="80px"
                        style={{ marginTop: '0px', marginBottom: '10px' }}
                        src={
                          this.props.home.uniquearticle.data[0].followers < 1
                            ? require('../../images/0-star.JPG')
                            : this.props.home.uniquearticle.data[0].followers > 0 &&
                              this.props.home.uniquearticle.data[0].followers <= 10
                              ? require('../../images/1-star.JPG')
                              : this.props.home.uniquearticle.data[0].followers > 10 &&
                                this.props.home.uniquearticle.data[0].followers <= 30
                                ? require('../../images/2-star.JPG')
                                : this.props.home.uniquearticle.data[0].followers > 30 &&
                                  this.props.home.uniquearticle.data[0].followers <= 150
                                  ? require('../../images/3-star.JPG')
                                  : this.props.home.uniquearticle.data[0].followers > 150 &&
                                    this.props.home.uniquearticle.data[0].followers <= 300
                                    ? require('../../images/4-star.JPG')
                                    : this.props.home.uniquearticle.data[0].followers > 300
                                      ? require('../../images/5-star.JPG')
                                      : null
                        }
                      />
                    </p>
                  </div>
                </div>
              </div>
              {this.props.home.uniquearticle.data[0].is_video === 1 ? (
                <div className="single-article-image-show-div">
                  <h5 className="date-article-font">
                    {this.props.home.uniquearticle &&
                      this.convertDate(
                        new Date(this.props.home.uniquearticle.data[0].created_at).toString(),
                      )}
                  </h5>
                  <div>
                    {window.screen.width < 800 ? (
                      <video
                        width="100%"
                        poster={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url}
                        height="400"
                        controls
                      >
                        <source
                          src={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url}
                          type="video/mp4"
                        />
                        <source
                          src={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url}
                          type="video/webm"
                        />
                        <source
                          src={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url}
                          type="video/ogg"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                        <video width="100%" height="400" controls>
                          <source
                            src={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url}
                            type="video/mp4"
                          />
                          <source
                            src={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url}
                            type="video/webm"
                          />
                          <source
                            src={VALUES.STORAGE_URL + this.props.home.uniquearticle.data[0].img_url}
                            type="video/ogg"
                          />
                        Your browser does not support the video tag.
                        </video>
                      )}
                  </div>
                </div>
              ) : (
                  <div className="single-article-image-show-div-main">
                    <h5 className="date-article-font">
                      {this.props.home.uniquearticle &&
                        this.convertDate(
                          new Date(this.props.home.uniquearticle.data[0].created_at).toString(),
                        )}
                    </h5>
                    <div
                      id="article-div-for-rotate-img"
                      style={{
                        backgroundImage: `url(${VALUES.STORAGE_URL +
                          this.props.home.uniquearticle.data[0].img_url})`,
                      }}
                      className="single-article-image-show-div"
                    ></div>
                  </div>
                )}
              <div className="article-content-text-show-div">
                <h1>
                  {this.props.home.uniquearticle.data[0].name +
                    ' | ' +
                    this.props.home.uniquearticle.data[0].title}
                </h1>
                <h4 className="subtitle-article">
                  {this.props.home.uniquearticle.data[0].subtitle}
                </h4>
                <div className="single-article-text-font-style">
                  {ReactHtmlParser(this.props.home.uniquearticle.data[0].content)}
                </div>
                <div className="review-article-user-div">
                  <p onClick={() => this.likeArticle()} className="review-article-user">
                    <img
                      alt="edit"
                      title="Me gusta"
                      style={{ width: '35px' }}
                      className="edit-pen-user-profile-style"
                      src={require('../../images/like.PNG')}
                    />
                  </p>
                  <p className="review-article-user-num">
                    +{this.state.article_likes || this.props.home.uniquearticle.data[0].total_likes}
                  </p>
                  <p className="single-article-text-visits-cant">
                    Vistas: {this.props.home.uniquearticle.data[0].total_visits || 0}
                  </p>
                </div>
                <br />
                <div className="single-article-social-network-icons">
                  <FacebookShareButton
                    url={'https://www.woordi.com/news/' + this.props.home.uniquearticle.data[0].id}
                    quote={this.props.home.uniquearticle.data[0].title}
                    style={{ margin: '2px 5px 2px 0' }}
                  >
                    <FacebookIcon logoFillColor="white" size={25} round={true}/>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={'https://www.woordi.com/news/' + this.props.home.uniquearticle.data[0].id}
                    title={this.props.home.uniquearticle.data[0].title}
                    style={{ margin: '2px 5px 2px 0' }}
                  >
                    <TwitterIcon logoFillColor="white" size={25} round={true} />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={'https://www.woordi.com/news/' + this.props.home.uniquearticle.data[0].id}
                    title={this.props.home.uniquearticle.data[0].title}
                    summary={this.props.home.uniquearticle.data[0].subtitle}
                    source={'https://www.woordi.com'}
                    style={{ margin: '2px 5px 2px 0' }}
                  >
                    <LinkedinIcon logoFillColor="white" size={25} round={true} />
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={'https://www.woordi.com/news/' + this.props.home.uniquearticle.data[0].id}
                    title={this.props.home.uniquearticle.data[0].title}
                    style={{ margin: '2px 5px 2px 0' }}
                  >
                    <WhatsappIcon logoFillColor="white" size={25} round={true} />
                  </WhatsappShareButton>
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
            <p style={{ fontSize: '12px' }}>Relacionados recientes</p>
            {this.props.home.getRelatedError && (
              <p style={{ fontSize: '12px', marginTop: '15px' }}>Sin artículos relacionados.</p>
            )}
            <div className="row">
              {this.props.home.related && this.props.home.related.data[0] && this.buildNews()}
            </div>
          </div>
          {this.rotateImg()}
          {this.rotateRelated()}
          {!this.props.home.getArticlePending &&
            this.props.home.uniquearticle &&
            this.props.home.uniquearticle.data[0] &&
            this.props.home.uniquearticle.data[0].publicity_active &&
            this.state.show_publicity_banner ? (
              <div
                style={{
                  backgroundImage: `url(${VALUES.STORAGE_URL +
                    this.props.home.uniquearticle.data[0].publicity_img})`,
                }}
                className="publicity-pop-up"
                id="pop-up-id-publicity"
              >
                <div onClick={() => this.goAway()} style={{ width: '90%', height: '100%' }}></div>
                <p
                  onClick={() =>
                    this.setState({
                      show_publicity_banner: false,
                    })
                  }
                >
                  x
              </p>
                {this.publicityVisible()}
              </div>
            ) : null}
          <Footer />
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
