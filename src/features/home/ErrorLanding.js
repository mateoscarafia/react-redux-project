import React, { Component } from 'react';
import * as VALUES from '../../constants';

export default class ErrorLanding extends Component {

  static propTypes = {};

  goHome = () => {
    window.location.replace(VALUES.FRONTEND_URL + 'feed/main');
  };

  render() {
    return (
      <div className="home-error-landing">
        <img alt="edit" width="50" src={require('../../images/logo.png')} />
        <p className="p-subtitle">Lo sentimos, ocurrió un error.</p>
        <button onClick={() => this.goHome()} className="p-subtitle-bis">
        Refrescar
        </button>
      </div>
    );
  }
  
}
