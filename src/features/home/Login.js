import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const jwt = require('jsonwebtoken');

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
      forgotPass: false,
      showMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    if (event.target.name === 'email') {
      document.getElementById('email-input').style.borderColor = '#000';
      document.getElementById('email-input').style.borderWidth = '1px';
    }
    if (event.target.name === 'password') {
      document.getElementById('password-input').style.borderColor = '#000';
      document.getElementById('password-input').style.borderWidth = '1px';
    }
    this.setState({ [event.target.name]: event.target.value, error: false });
  };

  loginForm = () => {
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
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) &&
      this.state.password.length > 5
    ) {
      document.getElementById('login-spinner-bottom').style.display = 'inline';
      document.getElementById('login-no-spinner-bottom').style.display = 'none';
      let data = { mail: this.state.email, pass: this.state.password, token: VALUES.DEEP_TOKEN };
      this.props.actions.login(data);
    }
  };

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  goToRegister = () => {
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/register');
  };

  forgotPassword = () => {
    this.setState({ forgotPass: true });
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

  recoverPassword = async () => {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailpass)) {
      document.getElementById('email-input-for-pass').style.transition = '0.3s';
      document.getElementById('email-input-for-pass').style.borderColor = 'white';
      document.getElementById('email-input-for-pass').style.borderBottomColor = 'red';
      document.getElementById('email-input-for-pass').style.borderWidth = '2px';
    } else {
      document.getElementById('forgot-spinner-bottom').style.display = 'inline';
      document.getElementById('forgot-no-spinner-bottom').style.display = 'none';
      var secret_key = await this.safetyNet();
      var data = { email: this.state.emailpass, secret_key: secret_key };
      this.props.actions.forgotPassword(data);
    }
  };

  handleChangePass = event => {
    if (event.target.name === 'emailpass') {
      document.getElementById('email-input-for-pass').style.borderColor = '#000';
      document.getElementById('email-input-for-pass').style.borderWidth = '1px';
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  async componentDidMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      let auth = { token: localStorage.getItem('token-app-auth-current') };
      await this.props.actions.isAuth(auth);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.home.loginPending && nextProps.home.loginError) {
      NotificationManager.error('Ups, algo fue mal');
      document.getElementById('login-spinner-bottom').style.display = 'none';
      document.getElementById('login-no-spinner-bottom').style.display = 'inline';
    } else if (this.props.home.loginPending && nextProps.home.logindata) {
      localStorage.setItem('token-app-auth-current', nextProps.home.logindata.data.token);
      window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
    }
    if (
      this.props.home.forgotPasswordPending &&
      nextProps.home.forgotsuccess &&
      nextProps.home.forgotsuccess.data.status === 1
    ) {
      this.setState({ showMessage: true });
    }
    if (
      this.props.home.forgotPasswordPending &&
      nextProps.home.forgotsuccess &&
      nextProps.home.forgotsuccess.data.status === 2
    ) {
      NotificationManager.error('El mail no existe');
      document.getElementById('forgot-spinner-bottom').style.display = 'none';
      document.getElementById('forgot-no-spinner-bottom').style.display = 'inline';
    }
  }

  render() {
    return (
      <div className="home-login">
        <div className="home-login-form">
          <img alt="edit" width="50" src={require('../../images/logo.png')} />
          {!this.state.forgotPass && (
            <div>
              <div className="form-group">
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group no-margin">
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  id="password-input"
                  placeholder="Contraseña"
                />
              </div>
              <button
                id="login-no-spinner-bottom"
                onClick={() => this.loginForm()}
                className="login-button"
              >
                Login
              </button>
              <button id="login-spinner-bottom" className="login-button spinner-login">
                <img alt="edit" width="15" src={require('../../images/spinner.gif')} />
              </button>
              <p onClick={() => this.forgotPassword()} className="forgot-link-in-login-form">
                Olvide mi contraseña
              </p>
              <p onClick={() => this.goToRegister()} className="register-link-in-login-form">
                ¿No tienes cuenta? <b> Registrate </b>
              </p>
            </div>
          )}
          {this.state.forgotPass && !this.state.showMessage && (
            <div>
              <div className="form-group">
                <input
                  type="email-for-pass"
                  id="email-input-for-pass"
                  name="emailpass"
                  onChange={this.handleChangePass}
                  placeholder="Ingrese su email"
                />
              </div>
              <button
                id="forgot-no-spinner-bottom"
                onClick={() => this.recoverPassword()}
                className="login-button"
              >
                Recuperar contraseña
              </button>
              <button id="forgot-spinner-bottom" className="login-button spinner-forgot">
                <img alt="edit" width="15" src={require('../../images/spinner.gif')} />
              </button>
            </div>
          )}
          {this.state.showMessage && (
            <div>
              <p className="forgot-link-in-login-form">¡Te enviamos un email con tu contraseña!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
