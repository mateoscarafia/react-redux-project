import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './redux/actions';
import { EditorState /*, convertToRaw*/ } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
//import draftToHtml from 'draftjs-to-html';

//Components
import NavBar from './NavBar';
import UserHeader from './UserHeader';

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
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.actions.getArticle(id);
    this.props.actions.getCategories();
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
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
        {typeof this.props.home.categories !== 'undefined' && (
          <NavBar history={this.props.history} categories={this.props.home.categories} />
        )}
        <div className="editor-wrapper">
          <UserHeader />
          <div className="editor-header">
            <h4>Nueva publicación</h4>
            <form className="home-editor-form">
              <div className="form-group">
                <input
                  type="text"
                  id="title-input"
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
                  id="subtitle-input"
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
                  <label class="custom-file-upload">
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
        </div>
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
)(TextEditor);
