import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  loginForm(){
    let data = {email: this.state.email, password: this.state.password}
    this.props.actions.login(data)
  }


  render() {
    return (
      <div className="home-login">
        <form className="home-login-form">
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
              id="password-input"
              placeholder="Password"
            />
          </div>
          <button onClick={() => this.loginForm()} type='button' className="login-button">
            Login
          </button>
        </form>
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
)(Login);
