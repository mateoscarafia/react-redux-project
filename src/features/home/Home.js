import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap-4-react';
import * as actions from './redux/actions';
import Modal from 'react-awesome-modal';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as VALUES from '../../constants';

//Components
import NavBar from './NavBar';
import News from './News';
import BigNews from './BigNews';
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
    };
  }

  async componentWillMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        await this.props.actions.getCategories();
        await this.props.actions.getArticles({
          token: VALUES.DEEP_TOKEN,
          param: this.props.match.params.info,
          id: null,
        });
        this.setState({
          login: false,
        });
      }
      if (user) {
        let data = { token: localStorage.getItem('token-app-auth-current'), id: user.id };
        await this.props.actions.getCategories();
        await this.props.actions.getArticles({
          token: VALUES.DEEP_TOKEN,
          param: this.props.match.params.info,
          id: user.id,
        });
        await this.props.actions.getUser(data);
        this.setState({
          login: true,
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

  async componentWillReceiveProps(nextProps) {
    this.props.home.followUserPending &&
      !nextProps.followUserPending &&
      NotificationManager.info('Sigues al usuario');
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

  render() {
    let params = this.props.match.params.info;
    return (
      <div className="home-home">
        {typeof this.props.home.categories !== 'undefined' && (
          <NavBar
            login={this.state.login}
            history={this.props.history}
            categories={this.props.home.categories}
            user={this.state.id}
          />
        )}
        <div className="container margin-top-cont">
          <div className="row">
            {this.props.home.user && this.state.login && !this.state.userProfile && (
              <div className="user-content">
                {typeof this.props.home.user !== 'undefined' && (
                  <div className="user-content-index">
                    <div
                      onClick={() =>
                        this.routerMethod('../../profile/' + this.props.home.user.data[0].id)
                      }
                      style={{
                        backgroundImage: `url(${this.props.home.user.data[0].profile_img_url})`,
                      }}
                      className="user-profile-picture"
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
                )}
                {this.state.userProfile && (
                  <button className="open-editor-button" onClick={() => this.handleProfile(false)}>
                    VOLVER
                  </button>
                )}
                {this.props.home.user && (
                  <button
                    className="open-editor-button"
                    onClick={() =>
                      this.routerMethod('../editor/' + this.props.home.user.data[0].id)
                    }
                  >
                    {'ESCRIBIR ARTICULO'}
                  </button>
                )}
              </div>
            )}
            {this.state.feed && (
              <div
                className={this.state.login ? 'news-content-index' : 'news-content-index-fullwidth'}
              >
                {typeof this.props.home.articles !== 'undefined' && params === 'main' && (
                  <BigNews articles={this.props.home.articles} />
                )}
                {this.props.home.articles && (
                  <News
                    routeparams={params}
                    id={this.state.id}
                    articles={this.props.home.articles}
                    isSimilar={false}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <Footer/>
        <Modal
          visible={this.state.visible}
          width="50%"
          height="50%"
          borderRadius="0px"
          effect="fadeInDown"
          onClickAway={() => this.handleModal(false)}
        >
          <div className="modal-header">
            <a className="close-modal-header" onClick={() => this.handleModal(false)}>
              X
            </a>
          </div>
        </Modal>
        <NotificationContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
