import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../../Components/UI/Input/Input";
import styles from "./AñadirVariable.module.scss";
import Button from "../../../Components/UI/Button/Button";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../store/actions";

export class AñadirVariable extends Component {
  state = {
    varForm: {
      nombre: {
        elementType: "input",
        elementName: "Nombre",
        elementConfig: {
          type: "text",
          placeholder: "Variable"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        fullWidth: false
      },
      unidadMedida: {
        elementType: "select",
        elementName: "Unidad de medida",
        elementConfig: {
          options: [
            { value: "litros", displayValue: "Litros" },
            { value: "kilos", displayValue: "Kilos" }
          ]
        },
        value: "litros",
        validation: {},
        valid: true,
        fullWidth: false
      },
      indicador: {
        elementType: "select",
        elementName: "Indicador",
        elementConfig: {
          options: [
            { value: "litros", displayValue: "Litros" },
            { value: "kilos", displayValue: "Kilos" }
          ]
        },
        value: "litros",
        validation: {},
        valid: true,
        fullWidth: false
      },
      periodicidad: {
        elementType: "select",
        elementName: "Periodicidad",
        elementConfig: {
          options: [
            { value: "litros", displayValue: "Litros" },
            { value: "kilos", displayValue: "Kilos" }
          ]
        },
        value: "litros",
        validation: {},
        valid: true,
        fullWidth: false
      },
      reqEvidencia: {
        elementType: "check",
        elementName: "Requiere evidencia",
        elementConfig: {},
        value: "",
        valid: true,
        fullWidth: true
      },
      descripcion: {
        elementType: "textarea",
        elementName: "Descripción",
        elementConfig: {
          type: "text",
          placeholder: "Variable"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        fullWidth: true
      }
    },
    formIsValid: false,
    loading: false
  };

  componentDidMount() {
    this.props.onFetchInfo();
  }

  inputChangedHandler = (event, inputidentifier) => {
    const updatedFormElement = updateObject(
      this.state.varForm[inputidentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.varForm[inputidentifier].validation
        ),
        touched: true
      }
    );

    const updatedVarForm = updateObject(this.state.varForm, {
      [inputidentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputId in updatedVarForm) {
      formIsValid = updatedVarForm[inputId].valid && formIsValid;
    }
    this.setState({
      varForm: updatedVarForm,
      formIsValid: formIsValid
    });

    console.log(updatedVarForm);
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.varForm) {
      formElementsArray.push({
        id: key,
        config: this.state.varForm[key]
      });
    }

    let form = formElementsArray.map(el => {
      let classes = styles.InputFull;
      if (!el.config.fullWidth) {
        classes = styles.InputMedium;
      }
      return (
        <div className={classes} key={el.id}>
          <Input
            label={el.config.elementName}
            elementtype={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={event => this.inputChangedHandler(event, el.id)}
            shouldValidate={el.config.validation}
            invalid={!el.config.valid}
            touched={el.config.touched}
          />
        </div>
      );
    });

    return (
      <div>
        <div className={styles.Label}>Agregar nueva variable</div>
        <div className={styles.Description}>
          Rellenear los campos con las caracteristicas de la nueva variable
        </div>
        <form className={styles.Form}>{form}</form>
        <div className={styles.Actions}>
          <Button type={"Cancel"}>Cancelar</Button>
          <Button type={"Success"}>Aceptar</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchInfo: () => dispatch(actions.fetchinfo())
  };
};
export default connect(null, mapDispatchToProps)(AñadirVariable);
