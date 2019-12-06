import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './redux/actions';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import * as VALUES from '../../constants';
import ReactHtmlParser from 'react-html-parser';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
//import draftToHtml from 'draftjs-to-html';

//Components
import NavBar from './NavBar';
import UserHeader from './UserHeader';
import Footer from './Footer';

const jwt = require('jsonwebtoken');
const axios = require('axios');
const htmlToText = require('html-to-text');
const stateFromHTML = require('draft-js-import-html').stateFromHTML;

export class EditArticle extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      file: '',
      imagePreviewUrl: null,
      login: false,
      title: null,
      category: null,
      id: null,
      subtitle: null,
      keywords: null,
      changedEditor: false,
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.home.editArticlePending && nextProps.home.editarticle) {
      NotificationManager.info('Articulo guardado');
      setTimeout(() => {
        window.location.replace(
          'http://' + VALUES.BD_ORIGIN + ':6075/news/' + this.props.match.params.id,
        );
      }, 1000);
    }
    if (this.props.home.editArticlePending && nextProps.home.editArticleError) {
      NotificationManager.warning('Ups, algo fue mal');
    }
    if (this.props.home.deleteArticlePending && nextProps.home.deletearticle) {
      NotificationManager.info('Articulo eliminado');
      setTimeout(() => {
        window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
      }, 1000);
    }
    if (this.props.home.deleteArticlePending && nextProps.home.deleteArticleError) {
      NotificationManager.warning('Ups, algo fue mal');
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      changedEditor: true,
    });
  };

  async componentWillMount() {
    const { id } = this.props.match.params;
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
      }
      if (user) {
        this.setState({
          login: true,
          id: user.id,
        });
        await this.props.actions.getArticle({
          token: VALUES.DEEP_TOKEN,
          id: id,
        });
        await this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: user.id });
        await this.props.actions.getCategories();
        window.scrollTo(0, 0);
      }
    } else {
      window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
    }
  }

  deleteArticle = () => {
    this.props.actions.deleteArticle({
      token: localStorage.getItem('token-app-auth-current'),
      id: this.props.match.params.id,
    });
  };

  _handleSubmit(e) {
    e.preventDefault();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editArticle() {
    if (this.state.login) {
      const data = new FormData();
      data.append('file', this.state.file);
      axios.post('http://' + VALUES.BD_ORIGIN + ':3000/file-upload', data, {}).then(res => {
        const categoryObj = this.props.home.categories.data.find(
          element =>
            element.name === (this.state.category || this.props.home.uniquearticle.data[0].name),
        );
        let keyword_content = (
          (this.state.title || this.props.home.uniquearticle.data[0].title) +
          ' ' +
          (this.state.subtitle || this.props.home.uniquearticle.data[0].subtitle) +
          ' ' +
          this.props.home.user.data[0].username
        )
          .toLowerCase()
          .normalize('NFD')
          .replace(/\"/g, '\\"')
          .replace(/\'/g, '\\"')
          .replace(/\`/g, '\\"')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9 ]/g, '')
          .replace(/ /g, '-');
        let data = {
          token: localStorage.getItem('token-app-auth-current'),
          title: this.state.title
            ? this.state.title
                .replace(/\"/g, '\\"')
                .replace(/\'/g, '\\"')
                .replace(/\`/g, '\\"')
            : this.props.home.uniquearticle.data[0].title,
          subtitle: this.state.subtitle
            ? this.state.subtitle
                .replace(/\"/g, '\\"')
                .replace(/\'/g, '\\"')
                .replace(/\`/g, '\\"')
            : this.props.home.uniquearticle.data[0].subtitle,
          category_id: categoryObj.id,
          img_url: res.data.filename || this.props.home.uniquearticle.data[0].img_url,
          content: this.state.changedEditor
            ? draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                .replace(/\"/g, '\\"')
                .replace(/\'/g, '\\"')
                .replace(/\`/g, '\\"')
            : this.props.home.uniquearticle.data[0].content,
          key_words: this.props.home.uniquearticle.data[0].key_words + '-' + keyword_content,
          id: this.props.match.params.id,
          user_id: this.state.id,
        };
        console.log(data);
        this.props.actions.editArticle(data);
      });
    }
  }

  buildCategories = () => {
    return this.props.home.categories.data.map(item => {
      return <option>{item.name}</option>;
    });
  };

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  goToErrorLanding = () => {
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/errorlanding');
  };

  render() {
    let editorState = this.state.changedEditor && this.state.editorState;
    if (this.props.home.uniquearticle && !this.state.changedEditor) {
      editorState = EditorState.createWithContent(
        stateFromHTML(this.props.home.uniquearticle.data[0].content),
      );
    }
    let imagePreviewUrl =
      this.state.imagePreviewUrl ||
      (this.props.home.uniquearticle &&
        'http://' +
          VALUES.BD_ORIGIN +
          ':3000/network_images/' +
          this.props.home.uniquearticle.data[0].img_url);
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="img-preview" src={imagePreviewUrl} />;
    }
    if (this.props.home.uniquearticle && !this.props.home.uniquearticle.data[0]) {
      this.goToErrorLanding();
      return null;
    } else {
      return (
        <div className="home-text-editor-css-style">
          {typeof this.props.home.categories !== 'undefined' &&
            typeof this.props.home.user !== 'undefined' && (
              <NavBar
                login={this.state.login}
                history={this.props.history}
                categories={this.props.home.categories}
                user={this.state.id}
              />
            )}
          {this.props.home.uniquearticle && (
            <div className="editor-wrapper">
              {typeof this.props.home.user !== 'undefined' && (
                <UserHeader
                  isProfile={true}
                  user={this.props.home.user.data[0]}
                  user_id={this.props.home.user.data[0].id}
                />
              )}
              <div className="editor-header">
                <h4>Editar artículo</h4>
                <form className="home-editor-form">
                  <div className="form-group">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={
                        this.state.title === null
                          ? this.props.home.uniquearticle.data[0].title
                          : this.state.title
                      }
                      onChange={this.handleChange}
                      placeholder="Título"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subtitle"
                      value={
                        this.state.subtitle === null
                          ? this.props.home.uniquearticle.data[0].subtitle
                          : this.state.subtitle
                      }
                      onChange={this.handleChange}
                      id="subtitle"
                      placeholder="Subtítulo"
                    />
                  </div>
                </form>
                <form className="select-form">
                  <div className="row">
                    <div className="col">
                      <select
                        name="category"
                        onChange={this.handleChange}
                        className="form-control"
                        id="category"
                      >
                        <option>{this.props.home.uniquearticle.data[0].name}</option>
                        {this.props.home.categories && this.buildCategories()}
                      </select>
                    </div>
                  </div>
                </form>
                <div className="form-group">
                  <div>
                    <form className="upload-image-form-editor" onSubmit={this._handleSubmit}>
                      <label className="custom-file-upload">
                        <input onChange={this._handleImageChange} type="file" />
                        Cambiar imagen
                      </label>
                    </form>
                    <div className="show-image-preview-text-editor">{$imagePreview}</div>
                  </div>
                </div>
              </div>
              <Editor
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="rdw-editor-toolbar"
                toolbarClassName="toolbar-class"
                onEditorStateChange={this.onEditorStateChange}
              />
              <div className="send-article-div-control">
                <button
                  onClick={() => this.deleteArticle()}
                  type="button"
                  className="delete-button"
                >
                  Borrar articulo
                </button>
                <button onClick={() => this.editArticle()} type="button" className="edit-button">
                  Guardar cambios
                </button>
              </div>
            </div>
          )}
          <Footer />
          <NotificationContainer />
        </div>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
