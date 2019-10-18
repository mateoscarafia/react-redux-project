import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../common/history';
import * as actions from './redux/actions';
import Modal from 'react-awesome-modal';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class UserHeader extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  routerMethod = destiny => {
    history.push(destiny);
    window.scrollTo(0, 0);
  };

  followUser = (id, action) => {
    let data = {
      idFollower: '122',
      idFollowed: id,
      do: action,
    };
    this.props.actions.followUser(data);
  };

  componentWillReceiveProps(nextProps) {
    this.props.home.followUserPending &&
      !nextProps.followUserPending &&
      NotificationManager.info('Sigues al usuario');
  }

  handleModal = action => {
    this.setState({
      editUser: action,
    });
  };

  async componentWillMount() {
    await this.props.actions.getUser();
  }

  render() {
    return (
      <div className="home-user-header">
        {typeof this.props.home.user !== 'undefined' && (
          <div className="row">
            <div className="user-pic-header">
              <div
                onClick={() => this.routerMethod('/profile/4141514')}
                style={{
                  backgroundImage: `url(${this.props.home.user.data.profile_img_url})`,
                }}
                className="user-profile-picture"
              ></div>
            </div>
            <div className="user-data-header">
              <h4 onClick={() => this.routerMethod('/profile/4141514')}>
                {this.props.home.user.data.username}
                {this.props.isProfile && (
                  <img
                    alt="edit"
                    onClick={() => this.handleModal(true)}
                    className="edit-pen-user-profile-style"
                    src={require('../../images/edit-pen.PNG')}
                  />
                )}
              </h4>
              <p>
                {this.props.home.user.data.profession +
                  ' | ' +
                  this.props.home.user.data.state.name}
              </p>
              <ul>
                <ul>
                  <li>
                    <a>Seguidores:</a>
                  </li>
                  <li>
                    <a className="li-font-weight-detail">{this.props.home.user.data.followers}</a>
                  </li>
                  <li>
                    <a>Articulos:</a>
                  </li>
                  <li>
                    <a className="li-font-weight-detail">
                      {this.props.home.user.data.num_articles}
                    </a>
                  </li>
                  <li>
                    <a>Me gustas:</a>
                  </li>
                  <li>
                    <a className="li-font-weight-detail">{this.props.home.user.data.likes}</a>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        )}
        <p
          onClick={() => this.followUser(this.props.home.user.data.id, true)}
          className="follow-button-user-header"
        >
          Seguir
        </p>
        <Modal
          visible={this.state.editUser}
          width="500px"
          height="650px"
          borderRadius="0px"
          effect="fadeInDown"
          onClickAway={() => this.handleModal(false)}
        >
          <div className="modal-header-edit-user">
            <a className="close-modal-header-edit-user" onClick={() => this.handleModal(false)}>
              X
            </a>
          </div>
          <div className="form-modal-edit-user">
            <form>
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Nombre completo"
                />
              </div>
              <div className="form-group">
                <input type="file" name="file" id="file" className="inputfile" />
                <label>Foto de perfil</label>
              </div>
              <div className="form-group">
                <label>Perfil</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Periodista, columnista.."
                />
              </div>
              <div className="form-group">
                <label>Example select</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>Buenos Aires</option>
                  <option>Catamarca</option>
                  <option>Chaco</option>
                  <option>Chubut</option>
                  <option>Córdoba</option>
                  <option>Corrientes</option>
                  <option>Entre Ríos</option>
                  <option>Formosa</option>
                  <option>Jujuy</option>
                  <option>La Pampa</option>
                  <option>La Rioja</option>
                  <option>Mendoza</option>
                  <option>Misiones</option>
                  <option>Neuquén</option>
                  <option>Rio Negro</option>
                  <option>Salta</option>
                  <option>San Juan</option>
                  <option>San Luis</option>
                  <option>Santa Cruz</option>
                  <option>Santa Fe</option>
                  <option>Santiago del Estero</option>
                  <option>Tierra del Fuego</option>
                  <option>Tucumán</option>
                </select>
              </div>
              <div className="form-group">
                <label>Presentación</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Cambiar contraseña</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Contraseña nueva"
                />
              </div>
              <button type="button" className="btn btn-success edit-user-button-form">
                Guardar
              </button>
            </form>
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
)(UserHeader);
