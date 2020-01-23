import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './redux/actions';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Select from 'react-select';

//Components
import NavBar from './NavBar';
import UserHeader from './UserHeader';
import Footer from './Footer';

const jwt = require('jsonwebtoken');
const axios = require('axios');
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
      file: null,
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
      setTimeout(function() {
        document.getElementById('edit-button-id').style.display = 'inline';
        document.getElementById('spinner-edit-button-id').style.display = 'none';
      }, 1000);
      NotificationManager.info('Ups, algo fue mal');
    }
    if (this.props.home.deleteArticlePending && nextProps.home.deletearticle) {
      NotificationManager.info('Articulo eliminado');
      setTimeout(() => {
        window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
      }, 1000);
    }
    if (this.props.home.deleteArticlePending && nextProps.home.deleteArticleError) {
      setTimeout(function() {
        document.getElementById('delete-button-id').style.display = 'inline';
        document.getElementById('spinner-delete-button-id-final').style.display = 'none';
      }, 1000);
      NotificationManager.info('Ups, algo fue mal');
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
    document.getElementById('delete-button-id-confirmation').style.display = 'none';
    document.getElementById('spinner-delete-button-id-final').style.display = 'inline';
    this.props.actions.deleteArticle({
      token: localStorage.getItem('token-app-auth-current'),
      id: this.props.match.params.id,
    });
  };

  deleteArticleConfirmation = () => {
    document.getElementById('delete-button-id').style.display = 'none';
    document.getElementById('delete-button-id-confirmation').style.display = 'inline';
  };

  _handleSubmit(e) {
    e.preventDefault();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  safetyNet = async () => {
    try {
      let token = await this.props.actions.securityToken();
      var data = jwt.verify(token.data.token, VALUES.API_KEY);
      return data.id;
    } catch (err) {
      return null;
    }
  };

  editArticle = async () => {
    if (this.state.login) {
      document.getElementById('edit-button-id').style.display = 'none';
      document.getElementById('spinner-edit-button-id').style.display = 'inline';
      if (
        this.state.file &&
        !this.state.file.type.includes('image') &&
        !this.state.file.type.includes('video')
      ) {
        NotificationManager.info('El archivo no es una imagen/video');
        document.getElementById('edit-button-id').style.display = 'inline';
        document.getElementById('spinner-edit-button-id').style.display = 'none';
      } else if (this.state.file && this.state.file.size > 20000000) {
        NotificationManager.info('Lo sentimos, el archivo es muy grande');
        document.getElementById('edit-button-id').style.display = 'inline';
        document.getElementById('spinner-edit-button-id').style.display = 'none';
      } else {
        var secret_key = await this.safetyNet();
        try {
          const data = new FormData();
          data.append('file', this.state.file);
          axios
            .post('http://' + VALUES.BD_ORIGIN + ':3000/file-upload', data, {
              headers: {
                secret_key: secret_key,
              },
            })
            .then(res => {
              const categoryObj = this.props.home.categories.data.find(
                element =>
                  element.name ===
                  (this.state.category || this.props.home.uniquearticle.data[0].name),
              );
              let keyword_content = (
                (this.state.title || this.props.home.uniquearticle.data[0].title) +
                ' ' +
                (this.state.subtitle || this.props.home.uniquearticle.data[0].subtitle) +
                ' ' +
                this.props.home.user.data[0].username +
                '' +
                this.state.category
              )
                .toLowerCase()
                .normalize('NFD')
                .replace(/"/g, '\\"')
                .replace(/'/g, '\\"')
                .replace(/`/g, '\\"')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9 ]/g, '')
                .replace(/ /g, '-');
              let data = {
                token: localStorage.getItem('token-app-auth-current'),
                title: this.state.title
                  ? this.state.title
                      .replace(/"/g, '\\"')
                      .replace(/'/g, '\\"')
                      .replace(/`/g, '\\"')
                  : this.props.home.uniquearticle.data[0].title
                      .replace(/"/g, '\\"')
                      .replace(/'/g, '\\"')
                      .replace(/`/g, '\\"'),
                subtitle: this.state.subtitle
                  ? this.state.subtitle
                      .replace(/"/g, '\\"')
                      .replace(/'/g, '\\"')
                      .replace(/`/g, '\\"')
                  : this.props.home.uniquearticle.data[0].subtitle
                      .replace(/"/g, '\\"')
                      .replace(/'/g, '\\"')
                      .replace(/`/g, '\\"'),
                category_id: categoryObj.id,
                img_url: res.data.filename || this.props.home.uniquearticle.data[0].img_url,
                content: this.state.changedEditor
                  ? draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                  : this.props.home.uniquearticle.data[0].content,
                key_words: keyword_content,
                id: this.props.match.params.id,
                is_video: this.state.file
                  ? this.state.file.type.includes('video')
                    ? 1
                    : 0
                  : this.props.home.uniquearticle.data[0].is_video,
                user_id: this.state.id,
              };
              this.props.actions.editArticle(data);
            });
        } catch (err) {
          NotificationManager.info('Algo salió mal, revise el contenido');
        }
      }
    }
  };

  buildCategories = () => {
    let cats = [];
    this.props.home.categories.data.map(function(item) {
      cats.push({ value: item.name, label: item.name });
      return null;
    });
    return cats;
  };

  handleChangeSelect = selectedOption => {
    this.setState({ category: selectedOption.value });
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
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
  };

  removeTokenAndKill = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
  };

  render() {
    const categoriesList =
      this.props.home.categories && this.props.home.categories.data[0] && this.buildCategories();
    try {
      var editorState = this.state.changedEditor && this.state.editorState;
      if (this.props.home.uniquearticle && !this.state.changedEditor) {
        editorState = EditorState.createWithContent(
          stateFromHTML(this.props.home.uniquearticle.data[0].content),
        );
      }
      var imagePreviewUrl =
        this.state.imagePreviewUrl ||
        (this.props.home.uniquearticle &&
          'http://' +
            VALUES.BD_ORIGIN +
            ':3000/network_images/' +
            this.props.home.uniquearticle.data[0].img_url);
      var $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = <img alt="img-preview" src={imagePreviewUrl} />;
      }
    } catch (err) {
      this.goToErrorLanding();
      return null;
    }
    if (this.props.home.getArticleError) {
      this.goToErrorLanding();
      return null;
    } else if (this.props.home.categories && !this.props.home.categories.data[0]) {
      this.goToErrorLanding();
      return null;
    } else if (
      this.props.home.user &&
      this.props.home.user.data[0] &&
      this.props.home.user.data[0].username === 'blocked-user-woordi-secure-integrity'
    ) {
      this.removeTokenAndKill();
      return null;
    } else {
      return (
        <div className="home-text-editor-css-style">
          {this.props.home.categories && this.props.home.user && (
            <NavBar
              login={this.state.login}
              history={this.props.history}
              categories={this.props.home.categories}
              user={this.state.id}
            />
          )}
          {this.props.home.getUserPending && (
            <div
              id="spinner-div-for-news-id-editarticle-home-waiting"
              className="spinner-div-for-news-editarticle-when-no-content"
            >
              <img
                alt="edit"
                width="30"
                className="edit-pen-user-profile-style"
                src={require('../../images/spinner.gif')}
              />
            </div>
          )}
          {!this.props.home.getUserPending && this.props.home.uniquearticle && (
            <div className="editor-wrapper">
              {this.props.home.user && (
                <UserHeader
                  isTextEditor={true}
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
                      <Select
                        value={{
                          value: this.state.category
                            ? this.state.category
                            : this.props.home.uniquearticle.data[0].name,
                          label: this.state.category
                            ? this.state.category
                            : this.props.home.uniquearticle.data[0].name,
                        }}
                        onChange={this.handleChangeSelect}
                        options={categoriesList}
                      />
                    </div>
                  </div>
                </form>
                <div className="form-group">
                  <div>
                    <form className="upload-image-form-editor" onSubmit={this._handleSubmit}>
                      <label className="custom-file-upload">
                        <input onChange={this._handleImageChange} type="file" />
                        Cambiar imagen/video
                      </label>
                      <p className="content-warning-message-edit-file">
                        Videos de 1 minutos max (20 Mb)
                      </p>
                    </form>
                    {!this.state.file ? (
                      this.props.home.uniquearticle.data[0].is_video !== 1 ? (
                        <div className="show-image-preview-text-editor">{$imagePreview}</div>
                      ) : window.screen.width < 800 ? (
                        <video
                          poster={
                            'http://' +
                            VALUES.BD_ORIGIN +
                            ':3000/network_images/' +
                            this.props.home.uniquearticle.data[0].img_url
                          }
                          width="200"
                          height="200"
                          controls
                        >
                          <source
                            src={
                              'http://' +
                              VALUES.BD_ORIGIN +
                              ':3000/network_images/' +
                              this.props.home.uniquearticle.data[0].img_url
                            }
                            type="video/mp4"
                          />
                          <source
                            src={
                              'http://' +
                              VALUES.BD_ORIGIN +
                              ':3000/network_images/' +
                              this.props.home.uniquearticle.data[0].img_url
                            }
                            type="video/webm"
                          />
                          <source
                            src={
                              'http://' +
                              VALUES.BD_ORIGIN +
                              ':3000/network_images/' +
                              this.props.home.uniquearticle.data[0].img_url
                            }
                            type="video/ogg"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <video width="200" height="200" controls>
                          <source
                            src={
                              'http://' +
                              VALUES.BD_ORIGIN +
                              ':3000/network_images/' +
                              this.props.home.uniquearticle.data[0].img_url
                            }
                            type="video/mp4"
                          />
                          <source
                            src={
                              'http://' +
                              VALUES.BD_ORIGIN +
                              ':3000/network_images/' +
                              this.props.home.uniquearticle.data[0].img_url
                            }
                            type="video/webm"
                          />
                          <source
                            src={
                              'http://' +
                              VALUES.BD_ORIGIN +
                              ':3000/network_images/' +
                              this.props.home.uniquearticle.data[0].img_url
                            }
                            type="video/ogg"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )
                    ) : null}
                    {this.state.file ? (
                      this.state.file.type.includes('image') ? (
                        <div className="show-image-preview-text-editor">{$imagePreview}</div>
                      ) : (
                        <label className="badge badge-info">Archivo cargado</label>
                      )
                    ) : null}
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
              <div className="send-article-div-control-edit-article">
                <button
                  onClick={() => this.deleteArticleConfirmation()}
                  type="button"
                  id="delete-button-id"
                  style={{ marginRight: '10px' }}
                  className="btn btn-danger btn-lg delete-button"
                >
                  Borrar articulo
                </button>
                <button
                  onClick={() => this.deleteArticle()}
                  type="button"
                  id="delete-button-id-confirmation"
                  style={{ marginRight: '10px' }}
                  className="btn btn-danger btn-lg delete-button-confirmation red-background-color"
                >
                  Si, borrar!
                </button>
                <button
                  type="button"
                  style={{ marginRight: '10px' }}
                  id="spinner-delete-button-id-final"
                  className="btn btn-danger btn-lg spinner-delete-button"
                >
                  <img
                    alt="edit"
                    width="24"
                    className="edit-pen-user-profile-style"
                    src={require('../../images/spinner.gif')}
                  />
                </button>
                <button
                  onClick={() => this.editArticle()}
                  type="button"
                  id="edit-button-id"
                  className="btn btn-primary btn-lg edit-button"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  id="spinner-edit-button-id"
                  className="btn btn-primary btn-lg spinner-edit-button"
                >
                  <img
                    alt="edit"
                    width="24"
                    className="edit-pen-user-profile-style"
                    src={require('../../images/spinner.gif')}
                  />
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
