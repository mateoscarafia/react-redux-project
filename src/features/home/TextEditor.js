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
//import draftToHtml from 'draftjs-to-html';

//Components
import NavBar from './NavBar';
import UserHeader from './UserHeader';
import Footer from './Footer';

const jwt = require('jsonwebtoken');
const axios = require('axios');

export class TextEditor extends Component {
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
      category: 'Opinión',
      id: null,
      subtitle: null,
      keywords: null,
      rotateAngle: 'no-value',
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById('spinner-button-post-article').style.display = 'none';
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.home.postArticlePending &&
      nextProps.home.postarticle &&
      nextProps.home.postarticle.data.id
    ) {
      NotificationManager.info('Articulo guardado');
      setTimeout(() => {
        window.location.replace(VALUES.FRONTEND_URL + 'news/' + nextProps.home.postarticle.data.id);
      }, 1000);
    }
    if (this.props.home.postArticlePending && !nextProps.home.postarticle.data.id) {
      setTimeout(function () {
        document.getElementById('button-post-article').style.display = 'inline';
        document.getElementById('spinner-button-post-article').style.display = 'none';
      }, 1000);
      NotificationManager.info('Ups, algo fue mal');
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    if (localStorage.getItem('token-app-auth-current')) {
      try {
        var user = jwt.verify(localStorage.getItem('token-app-auth-current'), VALUES.API_KEY);
      } catch (err) {
        localStorage.removeItem('token-app-auth-current');
        window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
      }
      if (user) {
        this.setState({
          login: true,
          id: user.id,
          isProfile: user.id === parseInt(id, 10),
        });
      }
    }
    !this.props.home.user && this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: id });
    !this.props.home.categories && this.props.actions.getCategories();
    window.scrollTo(0, 0);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'rotateAngle') {
      document.getElementById('img-div-create-article-id-for-rotating-img').style.transform =
        'rotate(' + event.target.value + 'deg)';
    }
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

  postArticle = async () => {
    document.getElementById('button-post-article').style.display = 'none';
    document.getElementById('spinner-button-post-article').style.display = 'inline';
    if (!this.state.login) {
      NotificationManager.info('Debes estar logueado');
      document.getElementById('button-post-article').style.display = 'inline';
      document.getElementById('spinner-button-post-article').style.display = 'none';
    }
    if (this.state.login && this.state.title && this.state.subtitle && this.state.keywords) {
      var content_final = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        .replace(/"/g, '\\"')
        .replace(/'/g, '\\"')
        .replace(/`/g, '\\"')
        .replace(/font-family:/g, 'font-familyie:')
        .replace(/font-size:/g, 'font-sizeie:')
        .replace(/background-color:/g, 'background-colorie:');
      if (!this.state.file) {
        NotificationManager.info('Debes subir imagen o video');
        document.getElementById('button-post-article').style.display = 'inline';
        document.getElementById('spinner-button-post-article').style.display = 'none';
      } else if (
        this.state.file &&
        !this.state.file.type.includes('image') &&
        !this.state.file.type.includes('video')
      ) {
        NotificationManager.info('El archivo no es una imagen/video');
        document.getElementById('button-post-article').style.display = 'inline';
        document.getElementById('spinner-button-post-article').style.display = 'none';
      } else if (this.state.file && this.state.file.size > 100000000) {
        NotificationManager.info('Lo sentimos, el archivo es muy grande');
        document.getElementById('button-post-article').style.display = 'inline';
        document.getElementById('spinner-button-post-article').style.display = 'none';
      } else if (this.state.file && this.state.file.type && this.state.file.type.includes('image') && this.state.file.type !== 'image/PNG' && this.state.file.type !== 'image/jpeg' && this.state.file.type !== 'image/jpg' && this.state.file.type !== 'image/png' && this.state.file.type !== 'image/gif') {
        NotificationManager.info('Solo se permiten imagenes JPEG, JPG, PNG, GIF.');
        document.getElementById('button-post-article').style.display = 'inline';
        document.getElementById('spinner-button-post-article').style.display = 'none';
      } else {
        NotificationManager.info('Esto puede tardar unos segundos, por favor aguarde');
        var secret_key = await this.safetyNet();
        try {
          const data = new FormData();
          data.append('file', this.state.file);
          axios
            .post(VALUES.BACKEND_URL + 'file-upload', data, {
              headers: {
                secret_key: secret_key,
              },
            })
            .then(res => {
              const categoryObj = this.props.home.categories.data.find(
                element => element.name === this.state.category,
              );
              let keywords = (
                this.state.keywords +
                ' ' +
                this.state.title +
                ' ' +
                this.state.subtitle +
                ' ' +
                this.props.home.user.data[0].username +
                ' ' +
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
                  .replace(/"/g, '\\"')
                  .replace(/'/g, '\\"')
                  .replace(/`/g, '\\"'),
                subtitle: this.state.subtitle
                  .replace(/"/g, '\\"')
                  .replace(/'/g, '\\"')
                  .replace(/`/g, '\\"'),
                category_id: categoryObj.id,
                img_url: res.data.filename,
                content: content_final,
                key_words: keywords,
                epigraph: null,
                user_id: this.props.home.user.data[0].id,
                rotate_img: this.state.rotateAngle !== 'no-value' ? this.state.rotateAngle : 0,
                is_video: this.state.file ? (this.state.file.type.includes('video') ? 1 : 0) : 0,
              };
              this.props.actions.postArticle(data);
            });
        } catch (err) {
          NotificationManager.info('Algo salió mal, revise el contenido');
          document.getElementById('button-post-article').style.display = 'inline';
          document.getElementById('spinner-button-post-article').style.display = 'none';
        }
      }
    } else {
      NotificationManager.info('Debes completar todos los campos');
      document.getElementById('button-post-article').style.display = 'inline';
      document.getElementById('spinner-button-post-article').style.display = 'none';
    }
  };

  buildCategories = () => {
    let cats = [];
    this.props.home.categories.data.map(function (item) {
      cats.push({ value: item.name, label: item.name });
      return null;
    });
    return cats;
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
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  removeTokenAndKill = () => {
    localStorage.removeItem('token-app-auth-current');
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  handleChangeSelect = selectedOption => {
    this.setState({ category: selectedOption.value });
  };

  render() {
    const categoriesList =
      this.props.home.categories && this.props.home.categories.data[0] && this.buildCategories();
    try {
      var { editorState } = this.state;
      var { imagePreviewUrl } = this.state;
      var $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = imagePreviewUrl;
      }
    } catch (err) {
      this.goToErrorLanding();
      return null;
    }
    if (this.props.home.getUserError || this.props.home.getCategoriesError) {
      this.goToErrorLanding();
      return null;
    } else if (this.props.home.categories && !this.props.home.categories.data[0]) {
      this.goToErrorLanding();
      return null;
    } else if (this.props.home.user && !this.props.home.user.data[0]) {
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
          {this.props.home.categories && (
            <NavBar
              login={this.state.login}
              history={this.props.history}
              categories={this.props.home.categories}
              user={this.state.id}
              rotate_img_profile={this.props.home.user && this.props.home.user.data[0] && this.props.home.user.data[0].rotate_img_profile}
              img_url={this.props.home.user && this.props.home.user.data[0] && this.props.home.user.data[0].profile_img_url}
              username={null}
            />
          )}
          {this.props.home.getUserPending && (
            <div
              id="spinner-div-for-news-id-texteditor-home-waiting"
              className="spinner-div-for-news-texteditor-when-no-content"
            >
              <img
                alt="edit"
                width="35"
                className="edit-pen-user-profile-style less-margin-for-spinner-logo"
                src={require('../../images/logo.png')}
              />
              <div className="loader"></div>
            </div>
          )}
          {!this.props.home.getUserPending && (
            <div className="editor-wrapper">
              {this.props.home.user && (
                <UserHeader
                  isTextEditor={true}
                  isProfile={this.state.isProfile}
                  user={this.props.home.user.data[0]}
                  user_id={this.props.home.user.data[0].id}
                />
              )}
              <div className="editor-header">
                <h4>Nuevo artículo</h4>
                <form className="home-editor-form">
                  <div className="form-group">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      onChange={this.handleChange}
                      placeholder="Título"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subtitle"
                      onChange={this.handleChange}
                      id="subtitle"
                      placeholder="Subtítulo"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="keywords"
                      onChange={this.handleChange}
                      id="keywords"
                      placeholder="Palabras claves"
                    />
                    <p className="key-words-detail-info">
                      *Palabras claves relacionadas al contenido del artículo (Ciudad, personas,
                      tema, etc..)
                    </p>
                  </div>
                </form>
                <form className="select-form">
                  <div className="row">
                    <div className="col">
                      <Select
                        value={{ value: this.state.category, label: this.state.category }}
                        onChange={this.handleChangeSelect}
                        options={categoriesList}
                      />
                    </div>
                  </div>
                </form>
                <div className="form-group">
                  <div>
                    <form className="upload-image-form-editor" onSubmit={this._handleSubmit}>
                      <label className="custom-file-upload mobile-design-button">
                        <input onChange={this._handleImageChange} type="file" />
                        <img
                          alt="imagen/video"
                          width="70px"
                          title="Subir imagen/video"
                          className="play-video-style-div"
                          style={{ opacity: '0.8', marginTop:20 }}
                          src={require('../../images/img-vid.png')}
                        />
                        <p className="content-warning-message">Videos de 5 minutos</p>
                      </label>
                    </form>
                    {this.state.file ? (
                      this.state.file.type.includes('image') ? (
                        <div>
                          <select
                            className="form-control"
                            onChange={this.handleChange}
                            style={{ width: '200px', marginBottom: '10px' }}
                            name="rotateAngle"
                          >
                            <option value="no-value">Rotar Imagen</option>
                            <option value={0}>0º</option>
                            <option value={90}>90º</option>
                            <option value={180}>180º</option>
                            <option value={270}>270º</option>
                          </select>
                          <div
                            className="img-div-create-article"
                            id="img-div-create-article-id-for-rotating-img"
                            style={{
                              backgroundImage: `url(${$imagePreview})`,
                            }}
                          ></div>
                        </div>
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
              <div className="send-article-div-control">
                <button
                  onClick={() => this.postArticle()}
                  id="button-post-article"
                  className="send-article-button-articlejs"
                >
                  Publicar artículo
                </button>
                <button id="spinner-button-post-article" className="send-article-button-articlejs">
                  <img
                    alt="edit"
                    width="20"
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

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
