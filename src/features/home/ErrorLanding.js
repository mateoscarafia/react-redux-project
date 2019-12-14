import React, { Component } from 'react';

export default class ErrorLanding extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-error-landing">
        <img alt="edit" width="100" src={require('../../images/logo.png')} />
        <p className="p-subtitle">Lo sentimos, ocurrió un error.</p>
      </div>
    );
  }
}
