import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

//var txt = 'Lorem ipsum typing effect!';


export class Wewoordi extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  typeWriter = () => {
    /*var i = 0
    if (i < txt.length && document.getElementById("demo")) {
      document.getElementById("demo").innerHTML += txt.charAt(i);
      i++;
      setTimeout(this.typeWriter(), 50);
    }*/
  }

  render() {
    return (
      <div className="home-wewoordi">
        <div className="text-div-content-inner">
          <br/>
          <img
            style={{ marginBottom: '5px' }}
            alt="edit"
            width="65"
            src={require('../../images/logo_footer.PNG')}
          />
          <br/><br/>
          <br/>
          <p id='demo'>Woordi es una red social de periodismo y opinion. Woordi es una plataforma digital que permite a sus usuarios publicar contenido estructurado bajo el concepto de noticia. Es decir, el esquema de sus comunicados responde al de un periódico digital (Articulos/Videos).
          Buscamos generar una comunidad de redactores independientes que encuentren en Woordi un espacio de libre expresión capaz de catapultar al público sus ideas y percepción de la realidad. Creemos que la concepción de diario digital puede ser adaptado a las tendencias actuales. Hoy en dia es el público quien genera el contenido para si mismo. La tecnologia ha permitido esta descentralización y queremos hacer uso de ella.</p>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wewoordi);
