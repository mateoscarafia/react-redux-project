import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  registerForm(){
    let data = {email: this.state.email, password: this.state.password, fullname: this.state.fullname}
    this.props.actions.register(data)
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
          <button onClick={() => this.registerForm()} type='button' className="register-button">
            Register
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
