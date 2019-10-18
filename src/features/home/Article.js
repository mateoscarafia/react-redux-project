import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//Components
import NavBar from './NavBar';
import UserHeader from './UserHeader';
import News from './News';

export class Article extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.actions.getArticle(id);
    this.props.actions.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    this.props.home.userLikePending &&
      !nextProps.userLikePending &&
      NotificationManager.info('Te gusta el articulo');
    this.props.home.reportArticlePending &&
      !nextProps.reportArticlePending &&
      NotificationManager.info('Denunciaste el articulo');
  }

  likeArticle = (id, action) => {
    let data = {
      idFollower: '122',
      idFollowed: id,
      do: action,
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

  render() {
    return (
      <div className="home-article">
        {typeof this.props.home.categories !== 'undefined' && (
          <NavBar history={this.props.history} categories={this.props.home.categories} />
        )}
        {typeof this.props.home.uniquearticle !== 'undefined' && (
          <div className="home-article-content">
            <div className="home-article-header-content">
              <UserHeader />
            </div>
            <h1>{this.props.home.uniquearticle.data.article.title}</h1>
            <h4 className="subtitle-article">
              {this.props.home.uniquearticle.data.article.subtitle}
            </h4>
            <p>{this.props.home.uniquearticle.data.article.text}</p>
            <br />
            <div className="review-article-user-div">
              <p
                onClick={() => this.likeArticle(this.props.home.uniquearticle.data.id, true)}
                className="review-article-user"
              >
                Me gusta
              </p>
              <p className="review-article-user-num">+234</p>
            </div>
            <div className="review-article-user-div-second">
              <p
                onClick={() => this.reportArticle(this.props.home.uniquearticle.data.id, true)}
                className="review-article-user"
              >
                Denunciar
              </p>
            </div>
          </div>
        )}

        <div className="similar-articles-article">
          <p>Relacionados</p>
          {typeof this.props.home.uniquearticle !== 'undefined' && (
            <News articles={this.props.home.uniquearticle.data} isSimilar={true} />
          )}
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
