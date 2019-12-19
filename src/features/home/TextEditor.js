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
      file: '',
      imagePreviewUrl: null,
      login: false,
      title: null,
      category: 'Opinión',
      id: null,
      subtitle: null,
      keywords: null,
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
        window.location.replace(
          'http://' + VALUES.BD_ORIGIN + ':6075/news/' + nextProps.home.postarticle.data.id,
        );
      }, 1000);
    }
    if (this.props.home.postArticlePending && !nextProps.home.postarticle.data.id) {
      setTimeout(function() {
        document.getElementById('button-post-article').style.display = 'inline';
        document.getElementById('spinner-button-post-article').style.display = 'none';
      }, 1000);
      NotificationManager.warning('Ups, algo fue mal');
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    //Is user logged user profile
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
          isProfile: user.id === parseInt(id, 10),
        });
      }
    }
    //For every user
    this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: id });
    this.props.actions.getCategories();
    window.scrollTo(0, 0);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  postArticle() {
    if (this.state.login && this.state.title && this.state.subtitle && this.state.keywords) {
      if (!this.state.file.type.includes('image')) {
        NotificationManager.warning('El archivo no es una imagen');
      } else {
        try {
          document.getElementById('button-post-article').style.display = 'none';
          document.getElementById('spinner-button-post-article').style.display = 'inline';
          const data = new FormData();
          data.append('file', this.state.file);
          axios.post('http://' + VALUES.BD_ORIGIN + ':3000/file-upload', data, {}).then(res => {
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
              this.props.home.user.data[0].username
            )
              .toLowerCase()
              .normalize('NFD')
              .replace(/\"/g, '"')
              .replace(/\'/g, '"')
              .replace(/\`/g, '"')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-zA-Z0-9 ]/g, '')
              .replace(/ /g, '-');
            let data = {
              token: localStorage.getItem('token-app-auth-current'),
              title: this.state.title
                .replace(/\"/g, '"')
                .replace(/\'/g, '"')
                .replace(/\`/g, '"'),
              subtitle: this.state.subtitle
                .replace(/\"/g, '"')
                .replace(/\'/g, '"')
                .replace(/\`/g, '"'),
              category_id: categoryObj.id,
              img_url: res.data.filename,
              content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                .replace(/\"/g, '"')
                .replace(/\'/g, '"')
                .replace(/\`/g, '"'),
              key_words: keywords,
              user_id: this.props.home.user.data[0].id,
            };
            this.props.actions.postArticle(data);
          });
        } catch (err) {
          NotificationManager.warning('Algo salió mal, revise el contenido');
        }
      }
    } else {
      NotificationManager.warning('Debes complear todos los campos');
    }
  }

  buildCategories = () => {
    return this.props.home.categories.data.map(item => {
      return <option key={item.id}>{item.name}</option>;
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
    const { editorState } = this.state;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="img-preview" src={imagePreviewUrl} />;
    }
    if (this.props.home.getUserError) {
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
          <div className="editor-wrapper">
            {typeof this.props.home.user !== 'undefined' && (
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
                    placeholder="Palabras claves para que otros usuarios puedan encontrar tú articulo. Ciudad, personajes, tema, etc..."
                  />
                  <p className="key-words-detail-info">
                    *Palabras claves relacionadas al contenido del artículo (Ciudad, personas, tema,
                    etc..)
                  </p>
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
                      <option>Categorias</option>
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
                      Subir imagen
                    </label>
                    <p className="key-words-detail-info">
                      Imagenes de 10Mb max (.png .jpg .jpeg .gif)
                    </p>
                  </form>
                  <div className="show-image-preview-text-editor">{$imagePreview}</div>
                </div>
              </div>
              <p className="content-warning-message">
                Contenido inapropiado será penalizado con la suspensión permanente de la cuenta
              </p>
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
              <p
                type="button"
                id="spinner-button-post-article"
                className="send-article-button-articlejs"
              >
                <img
                  alt="edit"
                  width="25"
                  className="edit-pen-user-profile-style"
                  src={require('../../images/spinner.gif')}
                />
              </p>
            </div>
          </div>
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
