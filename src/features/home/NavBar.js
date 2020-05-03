import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import BannerMidd from './BannerMidd';
import * as VALUES from '../../constants';

const jwt = require('jsonwebtoken');

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feed: true,
      searchEngine: false,
      searchwords: null,
      openMyNotifications: false
    };
    this.searchArticlesMotor = this.searchArticlesMotor.bind(this);
  }

  routerMethod = async destiny => {
    if (!this.props.home.getArticlesPending) {
      if (destiny.includes('profile')) {
        try {
          var user = await jwt.verify(
            localStorage.getItem('token-app-auth-current'),
            VALUES.API_KEY,
          );
          await this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: user.id });
          await this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: user.id });
          destiny = destiny + user.id;
        } catch (err) { }
      }
      if (destiny.includes('editor')) {
        var user_edit = await jwt.verify(
          localStorage.getItem('token-app-auth-current'),
          VALUES.API_KEY,
        );
        await this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: user_edit.id });
        destiny = destiny + user_edit.id;
      }
      if (destiny === '/feed/main' && window.location.href.includes('feed')) {
        await this.props.actions.getArticles({
          token: localStorage.getItem('token-app-auth-current') || VALUES.DEEP_TOKEN,
          param: 'main',
          id: this.props.user || null,
        });
      }
      window.scrollTo(0, 0);
      this.props.history.push(destiny);
    }
  };

  async handleNews(news_id, news_name) {
    window.screen.width < 800 && document.getElementById('navbar-toggler-id-for-clicking').click();
    window.location.href.includes('feed') &&
      (await this.props.actions.getArticles({ token: VALUES.DEEP_TOKEN, param: news_id }));
    window.scrollTo(0, 0);
    this.props.history.push('/feed/' + news_name);
  }

  buildList = num => {
    return this.props.categories.data.map((item, index) => {
      return !num && index < 7 ? (
        <li className="nav-item" key={item.name}>
          <a className="nav-link a-link" onClick={() => this.handleNews(item.id, item.name)}>
            {item.name}
          </a>
        </li>
      ) : num && index > 6 ? (
        <a
          key={item.name}
          onClick={() => this.handleNews(item.id, item.name)}
          className="dropdown-item drop-down-list-items-desktop"
        >
          {item.name}
        </a>
      ) : null;
    });
  };

  logoutUser = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchArticlesMotor = async () => {
    if (this.state.searchwords) {
      let searchword = this.state.searchwords
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-');
      searchword = searchword === '' ? 'M4T30' : searchword;
      window.scrollTo(0, 0);
      await this.props.actions.getArticles({
        token: VALUES.DEEP_TOKEN,
        param: '-engine-' + searchword,
      });
      this.openSearchEngine();
      this.props.history.push('/feed/-engine-' + searchword);
    }
  };

  searchArticlesMotorFromNav = async () => {
    if (this.state.searchwords) {
      let search = this.state.searchwords
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-');
      search = search === '' ? 'empty' : search;
      window.scrollTo(0, 0);
      document.getElementById('navbar-toggler-id-for-clicking').click();
      await this.props.actions.getArticles({
        token: VALUES.DEEP_TOKEN,
        param: '-engine-' + search,
      });
      this.props.history.push('/feed/-engine-' + search);
    }
  };

  openSearchEngine() {
    this.setState({
      searchEngine: !this.state.searchEngine,
    });
  }

  componentWillMount() {
    this.setState({
      userLoggedId: localStorage.getItem('token-app-auth-current') && jwt.verify(
        localStorage.getItem('token-app-auth-current'),
        VALUES.API_KEY,
      )
    });
    !this.props.home.notifications && localStorage.getItem('token-app-auth-current') && this.props.actions.getNotifications({
      token: localStorage.getItem('token-app-auth-current')
    });
  }

  render() {
    let hasNotifications = []
    hasNotifications = this.props.home.notifications && this.props.home.notifications.data[0] && this.props.home.notifications.data.map((item) => {
      if (item.notif_data.includes("Me Gusta") && !item.notif_data.split('||')[1].includes(document.cookie.replace(/ /g, '-').substring(0, 48))) {
        return 999
      } else if (item.notif_data.includes("Comentario") && parseInt(item.notif_data.split('||')[2], 10) !== this.state.userLoggedId.id) {
        return 999
      } else if (item.notif_data.includes("Visita") && !item.notif_data.split('||')[1].includes(document.cookie.replace(/ /g, '-').substring(0, 48))) {
        return 999
      } else {
        return null
      }
    });

    return (
      <div className="home-nav-bar sticky-top">
        <BannerMidd />
        <nav className="navbar navbar-expand-lg navbar-light blue-background brand-link-nav">
          <a onClick={() => this.routerMethod('/feed/main')} className="navbar-brand a-link">
            <img alt="edit" width="30" src={require('../../images/logo.png')} />
          </a>
          <button
            id="navbar-toggler-id-for-clicking"
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active diss-in-desktop search-input-menu">
                <div className="search-form-nav-float">
                  <input
                    type="text"
                    className="width-input"
                    id="searchwords"
                    name="searchwords"
                    onChange={this.handleChange}
                    placeholder="Buscar.."
                  />
                  <p className="width-button" onClick={() => this.searchArticlesMotorFromNav()}>
                    Buscar
                  </p>
                </div>
              </li>
              <li
                style={{ padding: '0px' }}
                className="nav-item active diss-in-desktop search-input-menu"
              >
                <b>TOP categorias</b>
              </li>
              {this.buildList(0)}
              <li className="nav-item dropdown diss-mobile-menu-dropdown">
                <a
                  className="nav-link dropdown-toggle a-link"
                  href=""
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.buildList(1)}
                </div>
              </li>
              {!this.props.login && (
                <div>
                  <li className="nav-item active">
                    <a
                      onClick={() => {
                        this.routerMethod('/login');
                      }}
                      className="nav-link a-link diss-in-desktop border-top-white"
                    >
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={() => {
                        this.routerMethod('/register');
                      }}
                      className="nav-link a-link diss-in-desktop"
                    >
                      Registrate
                    </a>
                  </li>
                </div>
              )}
              {this.props.login && (
                <div>
                  <li className="nav-item active border-top-white diss-in-desktop">
                    <a
                      onClick={() => {
                        this.routerMethod('/editor/');
                      }}
                      className="nav-link a-link"
                    >
                      Escribir articulo
                    </a>
                  </li>
                  <li className="nav-item active diss-in-desktop">
                    <a
                      onClick={() => {
                        this.routerMethod('/profile/');
                      }}
                      className="nav-link a-link"
                    >
                      {this.props.username ? this.props.username : 'Mi perfil'}
                    </a>
                  </li>
                  <li className="nav-item active diss-in-desktop">
                    <a onClick={this.logoutUser} className="nav-link a-link">
                      Logout
                    </a>
                  </li>
                </div>
              )}
            </ul>
            <div className="form-inline my-2 my-lg-0 disappear-on-mobile">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <div className="search-div-bar-floating" id="123456">
                    <div className="row">
                      <input
                        type="text"
                        name="searchwords"
                        onChange={this.handleChange}
                        placeholder="Buscar.."
                        className="form-control"
                        id="searchwords"
                      />
                      <img
                        onClick={() => this.searchArticlesMotor()}
                        title="Buscar artículo"
                        alt="edit"
                        width="25"
                        src={require('../../images/search.png')}
                      />
                    </div>
                  </div>
                </li>
              </ul>
              {this.props.login ? (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a
                      onClick={async () => {
                        this.setState({
                          openMyNotifications: !this.state.openMyNotifications,
                        });
                        this.props.actions.badRequest();
                        this.props.home.notifications && this.props.home.notifications.data && this.props.actions.checkNotification({
                          token: localStorage.getItem('token-app-auth-current'),
                          notifications: this.props.home.notifications.data
                        });
                      }}
                      className={!this.props.home.badRequestError && this.props.home.notifications && this.props.home.notifications.data[0] && hasNotifications && hasNotifications[0] ?
                        "nav-link a-link search-article-navbar-button not-red-circle"
                        : "nav-link a-link search-article-navbar-button"}
                    >
                      <img
                        title="Mis notificaciones"
                        alt="Notificaciones"
                        style={{ opacity: 0.4, marginTop: 1 }}
                        width="22"
                        src={require('../../images/notification.png')}
                      />
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a
                      onClick={() => {
                        this.routerMethod('/editor/');
                      }}
                      className="nav-link a-link search-article-navbar-button"
                    >
                      <img
                        title="Escribir artículo"
                        alt="edit"
                        style={{ opacity: 0.4 }}
                        width="25"
                        src={require('../../images/write.png')}
                      />
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a
                      onClick={() => {
                        this.routerMethod('/profile/');
                      }}
                      className="nav-link a-link"
                    >
                      {this.props.username ? this.props.username : 'Mi perfil'}
                    </a>
                  </li>
                  <li className="nav-item active">
                    <a onClick={this.logoutUser} className="nav-link a-link">
                      Logout
                    </a>
                  </li>
                </ul>
              ) : (
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a
                        onClick={() => {
                          this.routerMethod('/login');
                        }}
                        className="nav-link a-link"
                      >
                        Login
                    </a>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick={() => {
                          this.routerMethod('/register');
                        }}
                        className="nav-link a-link"
                      >
                        Registrate
                    </a>
                    </li>
                  </ul>
                )}
            </div>
          </div>
        </nav>
        {/*this.state.searchEngine && this.props.categories && (
          <SearchEngine
            categories={this.props.categories}
            searchArticlesMotor={this.searchArticlesMotor}
            history={this.props.history}
          />
        )*/}
        {this.state.openMyNotifications && (
          <div className="notifications-div">
            {/*this.props.home.getNewsVisitsPending && (
                <p className="smaller-meta-d
                ata">Loading...</p>
              )*/}
            <div className="followers-header-edit-user">
              <a
                className="close-modal-header-edit-follower"
                onClick={() => {
                  this.setState({
                    openMyNotifications: !this.state.openMyNotifications,
                  })
                }}
              >
                X
                </a>
              <br />
            </div>
            <p className="smaller-meta-data">
              <b>Notificaciones</b>
            </p>
            <div key={Math.random()} className="my-readers">
              {(!hasNotifications || (hasNotifications && !hasNotifications[0])) ? <div className="my-readers-user-div-empty" style={{ position: 'relative', marginBottom: 10 }}>
                <p
                  className="my-readers-user"
                  key={Math.random()}
                >
                  {/*- Sin notificaciones -*/}
                    </p>
              </div> : null}
              {this.props.home.notifications && this.props.home.notifications.data[0] &&
                this.props.home.notifications.data.map((item) => {
                  if (item.notif_data.includes("Me Gusta") && !item.notif_data.split('||')[1].includes(document.cookie.replace(/ /g, '-').substring(0, 48))) {
                    return (
                      <div className="my-readers-user-div" style={{ position: 'relative', paddingLeft: 25, marginBottom: 10 }}>
                        <img
                          style={{ position: 'absolute', top: 0, left: 0 }}
                          title="Mis notificaciones"
                          alt="Notificaciones"
                          width="20"
                          src={require('../../images/likeNot.PNG')}
                        />
                        <p
                          className="my-readers-user"
                          onClick={() => { window.location.replace(VALUES.FRONTEND_URL + 'news/' + item.news_id); }}
                          key={Math.random()}
                        >
                          A alguien Le Gusta a tu <b>artículo</b> <i>{item.title}</i>
                        </p>
                      </div>
                    )
                  } else if (item.notif_data.includes("Comentario") && parseInt(item.notif_data.split('||')[2], 10) !== this.state.userLoggedId.id) {
                    return (
                      <div className="my-readers-user-div" style={{ position: 'relative', paddingLeft: 25, marginBottom: 10 }}>
                        <img
                          style={{ position: 'absolute', top: 0, left: 0 }}
                          title="Mis notificaciones"
                          alt="Notificaciones"
                          width="20"
                          src={require('../../images/commNot.PNG')}
                        />
                        <p
                          className="my-readers-user"
                          onClick={() => { window.location.replace(VALUES.FRONTEND_URL + 'news/' + item.news_id); }}
                          key={Math.random()}
                        >
                          Comentaron tu <b>artículo</b> <i>{item.title}</i> - "{item.notif_data.split('||')[1]}"
                      </p>
                      </div>
                    )
                  } else if (item.notif_data.includes("Visita") && !item.notif_data.split('||')[1].includes(document.cookie.replace(/ /g, '-').substring(0, 48))) {
                    return (
                      <div className="my-readers-user-div" style={{ position: 'relative', paddingLeft: 25, marginBottom: 10 }}>
                        <img
                          style={{ position: 'absolute', top: 0, left: 0, marginTop: 2 }}
                          title="Mis notificaciones"
                          alt="Notificaciones"
                          width="20"
                          src={require('../../images/readNot.PNG')}
                        />
                        <p
                          className="my-readers-user"
                          onClick={() => { window.location.replace(VALUES.FRONTEND_URL + 'news/' + item.news_id); }}
                          key={Math.random()}
                        >
                          Alguien visitó tu <b>artículo</b> <i>{item.title}</i>
                        </p>
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </div>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
