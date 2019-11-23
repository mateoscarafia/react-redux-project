import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.getComments({ news_id: this.props.news_id, token: VALUES.DEEP_TOKEN });
  }

  buildCommentsList = () => {
    return this.props.home.comments.data.map(item => {
      return (
        <div key={item.created_at} className="comment-show-divs-list">
          <p
            className="username-p-design"
            onClick={() => this.routerMethod('../../profile/' + item.id)}
          >
            {item.username}
          </p>
          <p className="commet-p-design">{item.comment_text}</p>
          <p className="date-p-design">
            {item.created_at.substr(8, 2) +
              '/' +
              item.created_at.substr(5, 2) +
              '/' +
              item.created_at.substr(0, 4)}
          </p>
        </div>
      );
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
    !this.props.user_id && NotificationManager.warning('Debes loguearte para comentar');
    this.state.comment === '' && NotificationManager.warning('Escribe comentario');
    if (this.state.comment !== '') {
      let data_comment = {
        user_id: this.props.user_id,
        news_id: this.props.news_id,
        comment_text: this.state.comment.replace(/\"/g, '\\"'),
        token: VALUES.DEEP_TOKEN,
      };
      await this.props.actions.sendComment(data_comment);
      await this.props.actions.getComments({
        news_id: this.props.news_id,
        token: VALUES.DEEP_TOKEN,
      });
    }
  };

  render() {
    return (
      <div className="home-comments">
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 home-comments-list-div-history">
            {this.props.home.comments && this.buildCommentsList()}
            {this.props.home.comments && !this.props.home.comments.data[0] && (
              <p>Sin comentarios</p>
            )}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 home-comments-post-comments">
            <div className="form-group">
              <textarea
                rows="7"
                className="form-control"
                placeholder="Escribir comentario..."
                name="comment"
                onChange={this.handleChange}
                id="comment-input"
              ></textarea>
              <button
                onClick={() => this.postComment()}
                type="button"
                className="btn btn-secondary comment-button"
              >
                Enviar
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
