import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as VALUES from '../../constants';

export class Footer extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  routerMethod = async destiny => {
    this.props.history.push(destiny);
  }

  render() {
    return (
      <div className="home-footer">
        <br />
        <img
          style={{ marginBottom: '5px', marginLeft: '10px' }}
          alt="edit"
          width="55"
          src={require('../../images/logo_footer.PNG')}
        />
        <p>Vos sos el periodista</p>
        <br />
        <p className="link-footer">
          <span
            onClick={() => this.routerMethod('/wewoordi')}
          >
            Nosotros
          </span>
          |
          <span onClick={() => window.open(VALUES.FRONTEND_URL + 'terminosycondiciones', '_blank')}>
            Términos y Condiciones
          </span>
          |
          <span
            onClick={() => this.routerMethod('/login')}
          >
            Login
          </span>
          |
          <span
            onClick={() => this.routerMethod('/register')}
          >
            Registrate
          </span>
        </p>
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
)(Footer);
