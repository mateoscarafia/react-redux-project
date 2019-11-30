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
      title: '',
      category: 'Opinión',
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
        window.location.replace(
          'http://' + VALUES.BD_ORIGIN + ':6075/news/' + nextProps.home.postarticle.data.id,
        );
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
      if (user) {
        this.setState({
          login: true,
          id: user.id,
        });
        user.id === parseInt(id, 10) &&
          this.setState({
            isProfile: true,
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
    if (this.state.login) {
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
        .replace(/\"/g, '\\"')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-');
      let data = {
        token: localStorage.getItem('token-app-auth-current'),
        title: this.state.title.replace(/\"/g, '\\"'),
        subtitle: this.state.subtitle.replace(/\"/g, '\\"'),
        category_id: categoryObj.id,
        img_url:
          this.state.imagePreviewUrl ||
          'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg',
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

  render() {
    const { editorState } = this.state;
    let { imagePreviewUrl } = this.state;
    console.log(this.state.imagePreviewUrl);
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
              <div className="form-group">
                <input
                  type="text"
                  name="keywords"
                  onChange={this.handleChange}
                  id="keywords"
                  placeholder="Palabras claves"
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
        <Footer />
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
