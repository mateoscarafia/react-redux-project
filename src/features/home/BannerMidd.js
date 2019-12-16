import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import TextLoop from 'react-text-loop';
import * as VALUES from '../../constants';

export class BannerMidd extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.actions.getLatestNews({ token: VALUES.DEEP_TOKEN });
  }

  createBanner = () => {
    let text = [];
    for (const prop in this.props.home.latestnews.data) {
      text.push(<span>{this.props.home.latestnews.data[prop].title.toUpperCase()}</span>);
    }
    return text.reverse();
  };

  midText() {
    var date = new Date();
    return window.screen.width > 877 ? 'ÚLTIMAS NOTICIAS |' : 'AHORA |';
  }

  render() {
    return (
      <div className="home-banner-midd">
        <div className="midd-bann-text-slider-float-left">
          <div className="midd-bann-text-first">
            <p className="midd-bann-p bold-text-for-banner">{this.midText()}</p>
          </div>
          <div className="midd-bann-text-second">
            <p id="text-banner-id-for-movement" className="midd-bann-p">
              {this.props.home.latestnews && (
                <TextLoop interval={3000}>{this.createBanner()}</TextLoop>
              )}
            </p>
          </div>
        </div>
        <div className="triangle-div-down-low"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerMidd);
