import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { FacebookProvider, LoginButton } from 'react-facebook';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: '',
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, error: false });
  }

  handleResponse = data => {
    this.setState({ email: data.profile.email, fullname: data.profile.name });
  };

  handleError = error => {
    this.setState({ error });
  };

  registerForm() {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) &&
      this.state.password.length > 5 &&
      this.state.fullname.length > 4
    ) {
      let data = {
        token: VALUES.DEEP_TOKEN,
        mail: this.state.email,
        pass: this.state.password,
        username: this.state.fullname,
      };
      this.props.actions.register(data);
    } else {
      this.setState({ error: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.home.registerPending && nextProps.home.registerError) {
      NotificationManager.warning('Ups, algo fue mal');
      NotificationManager.warning('Revisa los datos ingresados');
    } else if (this.props.home.registerPending && nextProps.home.registerdata) {
      localStorage.setItem('token-app-auth-current', nextProps.home.registerdata.data.token);
      window.location.replace('http://' + VALUES.BD_ORIGIN + ':6075/feed/main');
    }
  }

  responseGoogle = response => {
    console.log(response);
  };

  responseFacebook = response => {
    console.log(response);
  };

  render() {
    return (
      <div className="home-register">
        <form className="home-register-form">
        <img alt="edit" width="100" src={require('../../images/logo.png')} />
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
              placeholder="Password"
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
              placeholder="Fullname"
            />
          </div>
          <button onClick={() => this.registerForm()} type="button" className="register-button">
            Register
          </button>
          <p
            onClick={() =>
              window.open('http://' + VALUES.BD_ORIGIN + ':6075/terminosycondiciones', '_blank')
            }
            className="terms-link-in-register-form"
          >
            Al registrarse usted acepta <b>Términos y Condiciones</b>
          </p>
          {/*<FacebookProvider appId="1525501467533850">
            <LoginButton scope="email" onCompleted={this.handleResponse} onError={this.handleError}>
              <button class="loginBtn loginBtn--facebook">Login with Facebook</button>
            </LoginButton>
          </FacebookProvider>
          <FacebookLogin
            appId="1525501467533850"
            autoLoad={true}
    fields="name,email,picture"
    callback={this.responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
          />
          <GoogleLogin
            clientId="signin-184520"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
