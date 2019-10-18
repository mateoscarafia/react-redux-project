import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

//Components
import NavBar from './NavBar';
import UserHeader from './UserHeader';

export class UserProfile extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  routerMethod = destiny => {
    this.props.history.push(destiny);
    window.scrollTo(0, 0);
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.actions.fullUser(id);
    this.props.actions.getCategories();
  }

  buildNews = () => {
    return this.props.home.fulluser.data.articles.map(item => {
      return (
        <div key={Math.random()} className="news-conts">
          <div className="header-div">
            <p className="profile-news-date">{item.created_at}</p>
          </div>
          <div className="img-div">
            <img
              onClick={() => this.routerMethod('../news/34200112')}
              className="user-profile-news-style"
              alt=""
              src={item.img_url}
            />
          </div>
          <div className="p-div">
            <p onClick={() => this.routerMethod('../news/34200112')}>{item.title}</p>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="home-user-profile">
        {typeof this.props.home.categories !== 'undefined' && (
          <NavBar history={this.props.history} categories={this.props.home.categories} />
        )}
        <div className="user-profile-wrapper">
          <UserHeader isProfile={true}/>
        </div>
        <div className="profile-wrapper-content">
          {typeof this.props.home.fulluser !== 'undefined' && (
            <div className="about-me-user-profile">
              <h4>Presentación</h4>
              <p>{this.props.home.fulluser.data.user.about_me}</p>
            </div>
          )}
          <div className="user-profile-wrapper-content">
            <p className="user-profile-wrapper-content-title">Publicaciones</p>
            <hr />
            <div className="row">
              {typeof this.props.home.fulluser !== 'undefined' && this.buildNews()}
            </div>
            <hr />
          </div>
        </div>
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
)(UserProfile);
