import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
require('dotenv').config()

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, error: false });
  }

  handleResponse = data => {
    console.log(data);
  };

  handleError = error => {
    this.setState({ error });
  };

  loginForm() {
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) &&
      this.state.password.length > 5
    ) {
      let data = { mail: this.state.email, pass: this.state.password, token: VALUES.DEEP_TOKEN };
      this.props.actions.login(data);
    } else {
      this.setState({ error: true });
    }
  }
  
  componentWillMount(){
    window.scrollTo(0, 0);
  }

  goToRegister() {
    window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/register');
  }

  async componentDidMount() {
    if (localStorage.getItem('token-app-auth-current')) {
      let auth = { token: localStorage.getItem('token-app-auth-current') };
      await this.props.actions.isAuth(auth);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.home.loginPending && nextProps.home.loginError) {
      NotificationManager.error('Ups, algo fue mal');
      NotificationManager.error('Revisa los datos ingresados');
    } else if (this.props.home.loginPending && nextProps.home.logindata) {
      localStorage.setItem('token-app-auth-current', nextProps.home.logindata.data.token);
      window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
    }
  }

  render() {
    return (
      <div className="home-login">
        <form className="home-login-form">
          <img alt="edit" width="50" src={require('../../images/icon-logo.ico')} />
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
              placeholder="Password"
            />
          </div>

          <p onClick={() => this.loginForm()} className="login-button">
            Login
          </p>
          <p onClick={() => this.goToRegister()} className="register-link-in-login-form">
            ¿No tienes cuenta? <b> Registrate </b>
          </p>
          {/*<FacebookProvider appId="1525501467533850">
            <LoginButton scope="email" onCompleted={this.handleResponse} onError={this.handleError}>
              <span>Login via Facebook</span>
            </LoginButton>
          </FacebookProvider>*/}
        </form>
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
