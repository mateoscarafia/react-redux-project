import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import BannerMidd from './BannerMidd';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      feed: true,
    };
  }

  routerMethod = destiny => {
    this.props.history.push(destiny);
  };

  buildList = () => {
    return this.props.categories.data.map(function(item) {
      return (
        <li className="nav-item" key={item.name}>
          <a className="nav-link a-link">{item.name}</a>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="home-nav-bar sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light blue-background">
          <a onClick={() => this.routerMethod('/feed')} className="navbar-brand a-link">
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
              {this.buildList()}
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
                  Secciones
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="">
                    Action
                  </a>
                  <a className="dropdown-item" href="">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
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
            </form>
          </div>
        </nav>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
