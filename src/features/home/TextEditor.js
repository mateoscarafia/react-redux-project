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

const jwt = require('jsonwebtoken');

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
      imagePreviewUrl: '',
      login: false,
      title: '',
      id: null,
      subtitle: '',
      keywords: '',
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.home.postArticlePending && nextProps.home.postarticle) {
      NotificationManager.info('Articulo guardado');
      setTimeout(() => {
        window.location.replace('http://localhost:6075/news/' + nextProps.home.postarticle.data.id);
      }, 1000);
    }
    if (this.props.home.postArticlePending && nextProps.home.postArticleError) {
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
        this.props.actions.getCategories();
      }
      this.setState({
        login: true,
        id: user.id,
      });
      user.id === parseInt(id, 10)
        ? this.setState({
            isProfile: true,
          })
        : this.props.actions.postVisit(id);
    }
    //For every user
    this.props.actions.getNews({ token: VALUES.DEEP_TOKEN, id: id });
    this.props.actions.getUser({ token: VALUES.DEEP_TOKEN, id: id });
    this.props.actions.getCategories();
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  postArticle() {
    if (this.state.login) {
      let keywords = (
        this.state.title +
        ' ' +
        this.state.subtitle +
        ' ' +
        this.props.home.user.data[0].username
      )
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-');
      let data = {
        token: localStorage.getItem('token-app-auth-current'),
        title: this.state.title.replace(/\"/g, '\\"'),
        subtitle: this.state.subtitle.replace(/\"/g, '\\"'),
        content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).replace(
          /\"/g,
          '\\"',
        ),
        key_words: keywords,
        user_id: this.props.home.user.data[0].id,
      };
      this.props.actions.postArticle(data);
    }
  }

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

  render() {
    const { editorState } = this.state;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img alt="img-preview" src={imagePreviewUrl} />;
    }
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
              isProfile={this.state.isProfile}
              user={this.props.home.user.data[0]}
              user_id={this.props.home.user.data[0].id}
            />
          )}
          <div className="editor-header">
            <h4>Nueva publicación</h4>
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
            </form>
            <form className="select-form">
              <div className="row">
                <div className="col">
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option>Categoría</option>
                    <option>Politica</option>
                    <option>Economia</option>
                    <option>Noticias</option>
                    <option>Analisis</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option>Ciudad</option>
                    <option>Buenos Aires</option>
                    <option>Formosa</option>
                    <option>Tucuman</option>
                    <option>Córdona</option>
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
                  {/*<button type="submit" onClick={this._handleSubmit}>
                    Upload Image
        </button>*/}
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
              onClick={() => this.postArticle()}
              type="button"
              className="btn btn-primary btn-lg"
            >
              Send article
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
