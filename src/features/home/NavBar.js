import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import BannerMidd from './BannerMidd';
import * as VALUES from '../../constants';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feed: true,
      searchEngine: false,
      searchwords: null,
    };
    this.searchArticlesMotor = this.searchArticlesMotor.bind(this);
  }

  routerMethod = async destiny => {
    if (destiny.includes('profile')) {
      var user_destiny_id = destiny.split('/');
      await this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: user_destiny_id[2] });
      await this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: user_destiny_id[2] });
    }
    destiny === '/feed/main' &&
      window.location.href.includes('feed') &&
      (await this.props.actions.getArticles({
        token: VALUES.DEEP_TOKEN,
        param: 'main',
        id: this.props.user || null,
      }));
    window.scrollTo(0, 0);
    this.props.history.push(destiny);
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
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
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

  render() {
    return (
      <div className="home-nav-bar sticky-top">
        <BannerMidd />
        <nav className="navbar navbar-expand-lg navbar-light blue-background brand-link-nav">
          <a onClick={() => this.routerMethod('/feed/main')} className="navbar-brand a-link">
            <b>NEDDLY</b>
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
                  <button
                    type="button"
                    className="width-button"
                    onClick={() => this.searchArticlesMotorFromNav()}
                  >
                    Buscar
                  </button>
                </div>
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
                        this.routerMethod('/editor/' + this.props.user);
                      }}
                      className="nav-link a-link"
                    >
                      Escribir articulo
                    </a>
                  </li>
                  <li className="nav-item active diss-in-desktop">
                    <a
                      onClick={() => {
                        this.routerMethod('/profile/' + this.props.user);
                      }}
                      className="nav-link a-link"
                    >
                      Mi perfil
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
            <form className="form-inline my-2 my-lg-0 disappear-on-mobile">
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
                      onClick={() => {
                        this.routerMethod('/editor/' + this.props.user);
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
                        this.routerMethod('/profile/' + this.props.user);
                      }}
                      className="nav-link a-link"
                    >
                      Mi perfil
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
            </form>
          </div>
        </nav>
        {/*this.state.searchEngine && this.props.categories && (
          <SearchEngine
            categories={this.props.categories}
            searchArticlesMotor={this.searchArticlesMotor}
            history={this.props.history}
          />
        )*/}
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
