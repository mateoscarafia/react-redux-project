import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchword: '',
    };
  }

  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchArticlesMotorInner = async () => {
    this.props.searchArticlesMotor(
      this.state.searchwords
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-'),
    );
  };

  buildSelect = () => {
    return this.props.categories.data.map(function(x) {
      return (
        <option key={x.id} value={x.id}>
          {x.name}
        </option>
      );
    });
  };

  render() {
    return (
      <div className="home-search-engine">
          <div className="form-row">
            <div className="form-group col-md-3"></div>
            <div className="form-group col-md-5">
              <input
                type="text"
                name="searchwords"
                onChange={this.handleChange}
                placeholder="Palabras claves"
                className="form-control"
                id="searchwords"
              />
            </div>
            <button
              onClick={() => this.searchArticlesMotorInner()}
              type="button"
              className="btn btn-secondary button-height"
            >
              Buscar
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchEngine);
