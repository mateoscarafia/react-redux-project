import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap-4-react';
import * as actions from './redux/actions';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as VALUES from '../../constants';
import ReactGA from 'react-ga';

//Components
import NavBar from './NavBar';
import News from './News';
import Footer from './Footer';

const jwt = require('jsonwebtoken');

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feed: true,
      login: true,
      userProfile: false,
      id: null,
      notification: false,
      notMessage: '',
      spinner: true,
    };
  }

  async componentWillMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
      }
      if (user) {
        let data = { token: localStorage.getItem('token-app-auth-current'), id: user.id };
        await this.props.actions.getCategories();
        await this.props.actions.getArticles({
          token: localStorage.getItem('token-app-auth-current'),
          param: this.props.match.params.info,
          id: user.id,
        });
        await this.props.actions.getUser(data);
        this.setState({
          id: user.id,
        });
      }
    } else {
      this.setState({
        login: false,
      });
      await this.props.actions.getCategories();
      await this.props.actions.getArticles({
        token: VALUES.DEEP_TOKEN,
        param: this.props.match.params.info,
        id: null,
      });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        spinner: false,
      });
    }, 1000);
    ReactGA.initialize('UA-85876206-2');
    ReactGA.pageview(window.location.href);
  }

  handleModal = action => {
    this.setState({
      visible: action,
    });
  };

  handleEditor = action => {
    this.setState({
      openEditor: action,
      feed: action ? false : true,
      userProfile: false,
    });
  };

  handleProfile = action => {
    this.setState({
      userProfile: action,
      feed: action ? false : true,
      openEditor: false,
    });
  };

  routerMethod = destiny => {
    this.props.history.push(destiny);
    window.scrollTo(0, 0);
  };

  rotateUserProfileImage = () => {
    if (document.getElementById('img-div-article-news-header-id-rotation-home')) {
      document.getElementById('img-div-article-news-header-id-rotation-home').style.transform =
        'rotate(' + this.props.home.user.data[0].rotate_img_profile + 'deg)';
    }
  };

  removeTokenAndKill = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  goToErrorLanding = () => {
    window.location.replace(VALUES.FRONTEND_URL + 'errorlanding');
  };

  render() {
    this.props.home.user && this.props.home.user.data[0] && this.rotateUserProfileImage();
    if (this.props.home.user && !this.props.home.user.data[0]) {
      this.removeTokenAndKill();
      return null;
    } else if (
      this.props.home.user &&
      this.props.home.user.data[0] &&
      this.props.home.user.data[0].username === 'blocked-user-woordi-secure-integrity'
    ) {
      this.removeTokenAndKill();
      return null;
    } else if (
      this.props.home.getUserError ||
      this.props.home.getArticlesError ||
      this.props.home.getCategoriesError
    ) {
      this.goToErrorLanding();
      return null;
    } else if (this.props.home.categories && !this.props.home.categories.data[0]) {
      this.goToErrorLanding();
      return null;
    } else if (
      this.state.id &&
      !this.props.home.categories &&
      !this.props.home.user &&
      !this.props.home.articles
    ) {
      return (
        <div
          id="spinner-div-for-news-id-container-home-waiting"
          className="spinner-div-for-news-home-when-no-content"
        >
          <img
            alt="edit"
            width="35"
            className="edit-pen-user-profile-style less-margin-for-spinner-logo"
            src={require('../../images/logo.png')}
          />
        </div>
      );
    } else if (!this.state.id && !this.props.home.categories && !this.props.home.articles) {
      return (
        <div
          id="spinner-div-for-news-id-container-home-waiting"
          className="spinner-div-for-news-home-when-no-content"
        >
          <img
            alt="edit"
            width="35"
            className="edit-pen-user-profile-style less-margin-for-spinner-logo"
            src={require('../../images/logo.png')}
          />
          <div className="loader"></div>
        </div>
      );
    } else {
      let params = this.props.match.params.info;
      return (
        <div className="home-home">
          {this.props.home.categories && (
            <NavBar
              login={this.state.login}
              history={this.props.history}
              categories={this.props.home.categories}
              user={this.state.id}
              username={null}
            />
          )}
          <div className="container margin-top-cont">
            <div className="row">
              {/*this.props.home.user && this.state.login && !this.state.userProfile && (
                <div className="user-content">
                  <div className="user-content-index">
                    <div
                      onClick={() =>
                        this.routerMethod('../../profile/' + this.props.home.user.data[0].id)
                      }
                      style={{
                        backgroundImage: `url(${VALUES.STORAGE_URL +
                          this.props.home.user.data[0].profile_img_url})`,
                      }}
                      className="user-profile-picture"
                      id="img-div-article-news-header-id-rotation-home"
                    ></div>
                    <p
                      onClick={() =>
                        this.routerMethod('../../profile/' + this.props.home.user.data[0].id)
                      }
                      className="user-profile-name"
                    >
                      {this.props.home.user.data[0].username}
                    </p>
                    <p className="user-profile-title">{this.props.home.user.data[0].profession}</p>
                    <div className="user-profile-content-detail">
                      <table>
                        <tbody>
                          <tr>
                            <td>Seguidos</td>
                            <td className="td-float-right">
                              {this.props.home.user.data[0].following}
                            </td>
                          </tr>
                          <tr>
                            <td>Seguidores</td>
                            <td className="td-float-right">
                              {this.props.home.user.data[0].followers}
                            </td>
                          </tr>
                          <tr>
                            <td>Articulos</td>
                            <td className="td-float-right">
                              {this.props.home.user.data[0].num_articles}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {this.state.userProfile && (
                    <button
                      className="open-editor-button"
                      onClick={() => this.handleProfile(false)}
                    >
                      VOLVER
                    </button>
                  )}
                </div>
                  )*/}
              <div
                className={
                  this.state.login ? 'news-content-index-fullwidth' : 'news-content-index-fullwidth'
                }
              >
                {(this.state.spinner || this.props.home.getArticlesPending) && (
                  <div
                    id="spinner-div-for-news-id-container-home-waiting"
                    className="spinner-div-for-news"
                  >
                    <img
                      alt="edit"
                      width="35"
                      className="edit-pen-user-profile-style less-margin-for-spinner-logo"
                      src={require('../../images/logo.png')}
                    />
                    <div className="loader"></div>
                  </div>
                )}
                {!this.state.spinner &&
                  !this.props.home.getArticlesPending &&
                  this.props.home.articles && (
                    <News
                      routeparams={params}
                      id={this.state.id}
                      articles={this.props.home.articles}
                      isSimilar={false}
                    />
                  )}
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
