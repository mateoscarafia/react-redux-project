import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  registerForm() {
    let data = {
      token: VALUES.DEEP_TOKEN,
      mail: this.state.email,
      pass: this.state.password,
      username: this.state.fullname,
    };
    this.props.actions.register(data);
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

  render() {
    return (
      <div className="home-register">
        <form className="home-register-form">
          <div className="form-group">
            <input
              type="email"
              id="email-input"
              name="email"
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
