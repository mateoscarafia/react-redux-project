import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const jwt = require('jsonwebtoken');

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      respond: ''
    };
  }

  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  deleteComment = (id, text) => {
    if (!text) {
      this.props.actions.deleteComment({
        token: localStorage.getItem('token-app-auth-current'),
        is_inner: false,
        comment_id: id,
      });
    } else {
      this.props.actions.deleteComment({
        token: localStorage.getItem('token-app-auth-current'),
        is_inner: true,
        comment_id: id,
        text: text,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.news_id !== nextProps.news_id) {
      this.props.actions.getComments({
        news_id: nextProps.news_id,
        token: VALUES.DEEP_TOKEN,
      });
    }
    if (this.props.home.sendCommentPending && nextProps.home.commentsent) {
      NotificationManager.info('Comentario enviado');
      document.getElementById('spinner-comment-send-button').style.display = 'none';
      document.getElementById('comment-send-button').style.display = 'inline';
    }
    if (this.props.home.deleteCommentPending && nextProps.home.deletedcomment) {
      NotificationManager.info('Comentario eliminado');
      this.props.actions.getComments({ news_id: this.props.news_id, token: VALUES.DEEP_TOKEN });
    }
  }

  componentWillMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
      }
      if (user) {
        this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: user.id });
      }
    }
    this.props.actions.getComments({ news_id: this.props.news_id, token: VALUES.DEEP_TOKEN });
  }

  showRespondDiv(id, action) {
    if (action) {
      if (document.getElementById('respond-div-' + id)) {
        document.getElementById('respond-div-' + id).style.display = 'block';
        document.getElementById('respond-label-' + id).style.display = 'none';
      }
    } else {
      if (document.getElementById('respond-div-' + id)) {
        document.getElementById('respond-div-' + id).style.display = 'none';
        document.getElementById('respond-label-' + id).style.display = 'block';
      }
    }
  }

  buildCommentsList = () => {
    var ids = []
    return this.props.home.comments.data.map(item => {
      if (ids.indexOf(item.id) === -1) {
        ids.push(item.id)
        return (
          <div>
            <div key={item.created_at} className="comment-show-divs-list">
              {item.user_id === this.props.user_id && (
                <p onClick={() => this.deleteComment(item.id, null)} className="delete-comment-float-right">
                  <img
                    alt="edit"
                    width="15"
                    className="edit-pen-user-profile-style"
                    src={require('../../images/trash.png')}
                  />
                </p>
              )}
              <p
                className="username-p-design"
                onClick={() => this.routerMethod('../../profile/' + item.user_id)}
              >
                <b>{item.username}</b> - {item.created_at.substr(8, 2) +
                  '/' +
                  item.created_at.substr(5, 2) +
                  '/' +
                  item.created_at.substr(0, 4)}
              </p>
              <p className="commet-p-design">{item.comment_text}</p>
              <label id={'respond-label-' + item.id} onClick={() => this.showRespondDiv(item.id, 1)} className="respond-label-design"> Responder</label>
              <div id={'respond-div-' + item.id} className="respond-div-design">
                <label onClick={() => this.showRespondDiv(item.id, 0)}>x</label>
                <textarea
                  rows="2"
                  className="form-control"
                  placeholder="Escribe respuesta..."
                  name="respond"
                  onChange={this.handleChange}
                  id="comment-response"
                ></textarea>
                <p onClick={() => this.postInnerComment(item.id)} id={'p-enviar-respond-' + item.id} className="respond-p-design">Enviar</p>
                <p id={'img-enviar-respond-' + item.id} className="respond-p-design non-display-img-spinner">
                  <img
                    alt="edit"
                    width="10"
                    className="edit-pen-user-profile-style"
                    src={require('../../images/spinner.gif')}
                  />
                </p>
              </div>
            </div>
            {this.props.home.comments.data.filter(elem => elem.id === item.id).map((inner) => {
              if (inner && inner.respond_text && inner.respond_username && inner.respond_created_at) {
                return <div className="response-p-design-div">
                  <p className="response-p-design-text">
                    <b>{inner.respond_username}</b> - {inner.created_at.substr(8, 2) +
                      '/' +
                      inner.created_at.substr(5, 2) +
                      '/' +
                      inner.created_at.substr(0, 4)}</p>
                  <p className="response-p-design-text">
                    {inner.respond_text}</p>
                  {inner.respond_user_id === this.props.user_id && <img
                    alt="edit"
                    width="10"
                    onClick={() => this.deleteComment(inner.id, inner.respond_text)}
                    className="response-trash-img"
                    src={require('../../images/trash.png')}
                  />}
                </div>
              } else { return null }
            })}
          </div>
        );
      } else {
        return null
      }
    });
  };

  routerMethod = (destiny, id) => {
    this.props.history.push(destiny);
    window.scrollTo(0, 0);
    id && this.props.actions.getArticle({ token: VALUES.DEEP_TOKEN, id: id });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  postComment = async () => {
    document.getElementById('spinner-comment-send-button').style.display = 'inline';
    document.getElementById('comment-send-button').style.display = 'none';
    if (!this.props.user_id) {
      NotificationManager.info('Debes loguearte para opinar');
      document.getElementById('comment-send-button').style.display = 'inline';
      document.getElementById('spinner-comment-send-button').style.display = 'none';
    }
    if (this.state.comment === '') {
      NotificationManager.info('Escribe opinión');
      document.getElementById('comment-send-button').style.display = 'inline';
      document.getElementById('spinner-comment-send-button').style.display = 'none';
    }
    if (this.state.comment !== '') {
      let data_comment = {
        news_id: this.props.news_id,
        is_inner: false,
        comment_text: this.state.comment
          .replace(/"/g, '\\"')
          .replace(/'/g, '\\"')
          .replace(/`/g, '\\"'),
        token: localStorage.getItem('token-app-auth-current'),
      };
      await this.props.actions.sendComment(data_comment);
      await this.props.actions.getComments({
        news_id: this.props.news_id,
        token: VALUES.DEEP_TOKEN,
      });
    }
  };

  postInnerComment = async (id) => {
    document.getElementById('p-enviar-respond-' + id).style.display = 'none';
    document.getElementById('img-enviar-respond-' + id).style.display = 'inline';
    if (!this.props.user_id) {
      NotificationManager.info('Debes loguearte para responder');
      document.getElementById('p-enviar-respond-' + id).style.display = 'inline';
      document.getElementById('img-enviar-respond-' + id).style.display = 'none';
    }
    if (this.state.respond === '') {
      NotificationManager.info('Respuesta vacia');
      document.getElementById('p-enviar-respond-' + id).style.display = 'inline';
      document.getElementById('img-enviar-respond-' + id).style.display = 'none';
    }
    if (this.state.respond !== '' && this.props.home.user && this.props.home.user.data && this.props.home.user.data[0]) {
      let data_comment = {
        comment_id: id,
        is_inner: true,
        news_id: this.props.news_id,
        respond_username: this.props.home.user.data[0].username,
        respond_text: this.state.respond
          .replace(/"/g, '\\"')
          .replace(/'/g, '\\"')
          .replace(/`/g, '\\"'),
        token: localStorage.getItem('token-app-auth-current'),
      };
      await this.props.actions.sendComment(data_comment);
      await this.props.actions.getComments({
        news_id: this.props.news_id,
        token: VALUES.DEEP_TOKEN,
      });
      document.getElementById('p-enviar-respond-' + id).style.display = 'inline';
      document.getElementById('img-enviar-respond-' + id).style.display = 'none';
      document.getElementById('respond-div-' + id).style.display = 'none';
      document.getElementById('respond-label-' + id).style.display = 'inline';
    }
  };


  render() {
    return (
      <div className="home-comments">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 home-comments-list-div-history">
            {this.props.home.comments && !this.props.home.getCommentsPending && this.buildCommentsList()}
            {this.props.home.comments && !this.props.home.getCommentsPending && !this.props.home.comments.data[0] && (
              <p style={{ fontSize: '12px' }}>- Sin opiniones -</p>
            )}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 home-comments-post-comments">
            <div className="form-group">
              <textarea
                rows="7"
                className="form-control"
                placeholder="Escribe opinión..."
                name="comment"
                onChange={this.handleChange}
                id="comment-input"
              ></textarea>
              <button
                onClick={() => this.postComment()}
                type="button"
                id="comment-send-button"
                className="btn btn-secondary comment-button send-comment-button-articlejs"
              >
                Enviar
              </button>
              <button
                type="button"
                id="spinner-comment-send-button"
                className="btn btn-secondary comment-button send-comment-button-articlejs spinner-class"
              >
                <img
                  alt="edit"
                  width="17"
                  className="edit-pen-user-profile-style"
                  src={require('../../images/spinner.gif')}
                />
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
