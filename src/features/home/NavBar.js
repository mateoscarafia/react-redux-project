import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import BannerMidd from './BannerMidd';
import SearchEngine from './SearchEngine';
import * as VALUES from '../../constants';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feed: true,
      searchEngine: false,
    };
    this.searchArticlesMotor = this.searchArticlesMotor.bind(this);
  }

  routerMethod = async destiny => {
    if (destiny.includes('profile')) {
      var user_destiny_id = destiny.split('/')
      await this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: user_destiny_id[2] });
      await this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: user_destiny_id[2] });
    }
    destiny === '/feed/main' &&
      (await this.props.actions.getArticles({
        token: VALUES.DEEP_TOKEN,
        param: 'main',
        id: this.props.user || null,
      }));
      this.props.history.push(destiny);
  };

  async handleNews(news_id, news_name) {
    await this.props.actions.getArticles({ token: VALUES.DEEP_TOKEN, param: news_id });
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
          className="dropdown-item"
        >
          {item.name}
        </a>
      ) : null;
    });
  };

  logoutUser = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace('http://'+VALUES.BD_ORIGIN+':6075/feed/main');
  };

  searchArticlesMotor = async searchword => {
    window.scrollTo(0, 0);
    await this.props.actions.getArticles({
      token: VALUES.DEEP_TOKEN,
      param: '-engine-' + searchword,
    });
    this.openSearchEngine;
    this.props.history.push('/feed/-engine-' + searchword);
  };

  openSearchEngine() {
    this.setState({
      searchEngine: !this.state.searchEngine,
    });
  }

  render() {
    return (
      <div className="home-nav-bar sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light blue-background">
          <a onClick={() => this.routerMethod('/feed/main')} className="navbar-brand a-link">
            <b>NEDDLY</b>
          </a>
          <button
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
              {this.buildList(0)}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle a-link"
                  href=""
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Más
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.buildList(1)}
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a
                    onClick={() => {
                      this.openSearchEngine();
                    }}
                    className="nav-link a-link search-article-navbar-button"
                  >
                    <span className="glyphicon glyphicon-search"></span>
                    {!this.state.searchEngine ? 'Buscar' : 'Esconder buscador'}
                  </a>
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
                      Escribir articulo
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
        {this.state.searchEngine && this.props.categories && (
          <SearchEngine
            categories={this.props.categories}
            searchArticlesMotor={this.searchArticlesMotor}
            history={this.props.history}
          />
        )}
        <BannerMidd />
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
