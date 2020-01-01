import React, { Component } from 'react';

export default class ErrorLanding extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-error-landing">
        <img alt="edit" width="50" src={require('../../images/icon-logo.ico')} />
        <p className="p-subtitle">Lo sentimos, ocurrió un error.</p>
      </div>
    );
  }
}
