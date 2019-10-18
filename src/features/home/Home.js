import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap-4-react';
import * as actions from './redux/actions';
import Modal from 'react-awesome-modal';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

//Components
import NavBar from './NavBar';
import News from './News';
import BigNews from './BigNews';
import TextEditor from './TextEditor';

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
      openEditor: false,
      userProfile: false,
      notification: false,
      notMessage: '',
    };
  }

  async componentWillMount() {
    await this.props.actions.getCategories();
    await this.props.actions.getArticles();
    await this.props.actions.getSecArticles();
    await this.props.actions.getPromoted();
    await this.props.actions.getUser(6767676);
  }

  componentWillReceiveProps(nextProps) {
    this.props.home.followUserPending &&
      !nextProps.followUserPending &&
      NotificationManager.info('Sigues al usuario.');
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
    return (
      <div className="home-home">
        {typeof this.props.home.categories !== 'undefined' && (
          <NavBar history={this.props.history} categories={this.props.home.categories} />
        )}
        <div className="container margin-top-cont">
          <div className="row">
            {this.state.login && !this.state.userProfile && (
              <div className="user-content">
                {typeof this.props.home.user !== 'undefined' && (
                  <div className="user-content-index">
                    <div
                      onClick={() => this.routerMethod('/profile/4141514')}
                      style={{
                        backgroundImage: `url(${this.props.home.user.data.profile_img_url})`,
                      }}
                      className="user-profile-picture"
                    ></div>
                    <p
                      onClick={() => this.routerMethod('/profile/4141514')}
                      className="user-profile-name"
                    >
                      {this.props.home.user.data.username}
                    </p>
                    <p className="user-profile-title">{this.props.home.user.data.profession}</p>
                    <div className="user-profile-content-detail">
                      <table>
                        <tbody>
                          <tr>
                            <td>Me Gustas</td>
                            <td className="td-float-right">{this.props.home.user.data.likes}</td>
                          </tr>
                          <tr>
                            <td>Seguidores</td>
                            <td className="td-float-right">
                              {this.props.home.user.data.followers}
                            </td>
                          </tr>
                          <tr>
                            <td>Articulos</td>
                            <td className="td-float-right">
                              {this.props.home.user.data.num_articles}
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
                <button
                  className="open-editor-button"
                  onClick={() => this.routerMethod('/editor/4141514')}
                >
                  {'NUEVA PUBLICACIÓN'}
                </button>
              </div>
            )}
            {this.state.userProfile && <div className="user-profile-info"></div>}
            {this.state.feed && (
              <div
                className={this.state.login ? 'news-content-index' : 'news-content-index-fullwidth'}
              >
                {typeof this.props.home.promoted !== 'undefined' && (
                  <BigNews articles={this.props.home.promoted} />
                )}
                {typeof this.props.home.secarticles !== 'undefined' && (
                  <News articles={this.props.home.secarticles} isSimilar={false}/>
                )}
              </div>
            )}
          </div>
        </div>
        {this.state.openEditor && (
          <div className="news-content-index">
            <TextEditor />
          </div>
        )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
