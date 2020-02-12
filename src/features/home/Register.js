import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const jwt = require('jsonwebtoken');

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: '',
      error: false,
      showVerification: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'verifyCode') {
      document.getElementById('verifyCode-input').style.borderColor = '#000';
      document.getElementById('verifyCode-input').style.borderWidth = '1px';
    }
    if (event.target.name === 'email') {
      document.getElementById('email-input').style.borderColor = '#000';
      document.getElementById('email-input').style.borderWidth = '1px';
    }
    if (event.target.name === 'password') {
      document.getElementById('password-input').style.borderColor = '#000';
      document.getElementById('password-input').style.borderWidth = '1px';
    }
    if (event.target.name === 'fullname') {
      document.getElementById('fullname-input').style.borderColor = '#000';
      document.getElementById('fullname-input').style.borderWidth = '1px';
    }
    this.setState({ [event.target.name]: event.target.value, error: false });
  }

  handleResponse = data => {
    this.setState({ email: data.profile.email, fullname: data.profile.name });
  };

  handleError = error => {
    this.setState({ error });
  };

  registerForm() {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
      document.getElementById('email-input').style.transition = '0.3s';
      document.getElementById('email-input').style.borderColor = 'white';
      document.getElementById('email-input').style.borderBottomColor = 'red';
      document.getElementById('email-input').style.borderWidth = '2px';
    }
    if (this.state.password.length < 6) {
      document.getElementById('password-input').style.transition = '0.3s';
      document.getElementById('password-input').style.borderColor = 'white';
      document.getElementById('password-input').style.borderBottomColor = 'red';
      document.getElementById('password-input').style.borderWidth = '2px';
    }
    if (this.state.fullname.length < 5) {
      document.getElementById('fullname-input').style.transition = '0.3s';
      document.getElementById('fullname-input').style.borderColor = 'white';
      document.getElementById('fullname-input').style.borderBottomColor = 'red';
      document.getElementById('fullname-input').style.borderWidth = '2px';
    }
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) &&
      this.state.password.length > 5 &&
      this.state.fullname.length > 4
    ) {
      document.getElementById('register-spinner-bottom').style.display = 'inline';
      document.getElementById('register-no-spinner-bottom').style.display = 'none';
      this.props.actions.verifyUser({
        token: jwt.sign(
          {
            email: this.state.email,
            pass: this.state.password,
            username: this.state.fullname,
          },
          VALUES.API_KEY,
        ),
      });
    } else {
      this.setState({ error: true });
    }
  }

  verifyEmail = () => {
    if (!this.state.verifyCode) {
      document.getElementById('verifyCode-input').style.transition = '0.3s';
      document.getElementById('verifyCode-input').style.borderColor = 'white';
      document.getElementById('verifyCode-input').style.borderBottomColor = 'red';
      document.getElementById('verifyCode-input').style.borderWidth = '2px';
    } else {
      document.getElementById('verify-spinner-bottom').style.display = 'inline';
      document.getElementById('verify-no-spinner-bottom').style.display = 'none';
      this.props.actions.verifyCode({
        code: this.state.verifyCode,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.home.verifyUserPending && nextProps.home.emailverifysent) {
      this.setState({ showVerification: true });
    }
    if (
      this.props.home.verifyCodePending &&
      nextProps.home.codeverified &&
      nextProps.home.codeverified.data.token === 'token-died'
    ) {
      NotificationManager.info('Código incorrecto');
      document.getElementById('verify-spinner-bottom').style.display = 'none';
      document.getElementById('verify-no-spinner-bottom').style.display = 'inline';
    }
    if (
      this.props.home.verifyCodePending &&
      nextProps.home.codeverified &&
      nextProps.home.codeverified.data.token === 'email-exist'
    ) {
      NotificationManager.info('El email ya esta registrado');
      document.getElementById('verify-spinner-bottom').style.display = 'none';
      document.getElementById('verify-no-spinner-bottom').style.display = 'inline';
    }
    if (this.props.home.verifyCodePending && nextProps.home.verifyCodeError) {
      NotificationManager.info('Ups, ocurrió un error');
      document.getElementById('verify-spinner-bottom').style.display = 'none';
      document.getElementById('verify-no-spinner-bottom').style.display = 'inline';
    }
    if (
      this.props.home.verifyCodePending &&
      nextProps.home.codeverified &&
      nextProps.home.codeverified.data.token !== 'token-died' &&
      nextProps.home.codeverified.data.token !== 'email-exist'
    ) {
      localStorage.setItem('token-app-auth-current', nextProps.home.codeverified.data.token);
      window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home-register">
        <div className="home-register-form">
          <img alt="edit" width="50" src={require('../../images/logo.png')} />
          {!this.state.showVerification && (
            <div>
              <div className="form-group">
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Contraseña"
                  id="password-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="fullname"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                  id="fullname-input"
                  placeholder="Nombre de usuario"
                />
              </div>
              <button
                id="register-no-spinner-bottom"
                onClick={() => this.registerForm()}
                type="button"
                className="register-button"
              >
                Registrarse
              </button>
              <button id="register-spinner-bottom" className="register-button spinner-register">
                <img alt="edit" width="15" src={require('../../images/spinner.gif')} />
              </button>
              <p
                onClick={() => window.open(VALUES.FRONTEND_URL + 'terminosycondiciones', '_blank')}
                className="terms-link-in-register-form"
              >
                Al registrarse usted acepta <b>Términos y Condiciones</b>
              </p>
            </div>
          )}
          {this.state.showVerification && (
            <div>
              <div className="form-group">
                <p className="terms-link-in-register-form">
                  <b>Ingresa código enviado a tú correo</b>
                </p>
                <input
                  type="text"
                  name="verifyCode"
                  value={this.state.verifyCode}
                  onChange={this.handleChange}
                  id="verifyCode-input"
                  placeholder="Código de verificación"
                />
              </div>
              <button
                id="verify-no-spinner-bottom"
                onClick={() => this.verifyEmail()}
                type="button"
                className="register-button"
              >
                Verificar mi email
              </button>
              <button id="verify-spinner-bottom" className="register-button spinner-register">
                <img alt="edit" width="15" src={require('../../images/spinner.gif')} />
              </button>
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
