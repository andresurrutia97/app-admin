import React, { Component } from "react";
import { connect } from "react-redux";

import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios";
import * as actions from "./store/actions";
import styles from "./AñadirVarUsersDisp.module.scss";

export class AñadirVarUserDisp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      varForm: {
        variable: {
          elementType: "select",
          elementName: "Variable",
          elementConfig: {
            options: [],
          },
          value: "",
          validation: {},
          valid: true,
          fullWidth: true,
        },
      },
      formIsValid: true,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.onFetchVars();
  }

  componentDidUpdate() {
    //si esta en updateMode se actualiza los valores del Form con los del dispositivo seleccionado
    if (this.props.vars !== null && this.state.loading) {
      const updatedForm = this.updateVariableInfo();
      this.setState({
        varForm: updatedForm,
        loading: false,
      });
    }
  }

  updateVariableInfo = () => {
    const varArray = [];

    for (let i in this.props.vars) {
      varArray.push({
        value: this.props.vars[i].id,
        displayValue: this.props.vars[i].variable,
      });
    }
    const stateForm = this.state.varForm;

    const newFOrm = updateObject(stateForm, {
      variable: updateObject(stateForm.variable, {
        elementConfig: updateObject(stateForm.variable.elementConfig, {
          options: varArray,
        }),
        value: varArray[0].value,
      }),
    });
    return newFOrm;
  };

  //Maneja la lectura de los inputs
  inputChangedHandler = (event, inputidentifier) => {
    let updatedFormElement = null;

    updatedFormElement = updateObject(this.state.varForm[inputidentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.varForm[inputidentifier].validation
      ),
      touched: true,
    });

    const updatedVarForm = updateObject(this.state.varForm, {
      [inputidentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputId in updatedVarForm) {
      formIsValid = updatedVarForm[inputId].valid && formIsValid;
    }

    console.log(formIsValid);

    this.setState({
      formIsValid: formIsValid,
      varForm: updatedVarForm,
    });
  };

  addVarHandler = (event) => {
    event.preventDefault();
    let formData = {};

    const id = this.state.varForm.variable.value;
    for (let i in this.props.vars) {
      if (id === this.props.vars[i].id) {
        formData = this.props.vars[i];
      }
    }

    this.props.addVar(formData);
    this.props.close();
    // this.props.openMess();
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.varForm) {
      formElementsArray.push({
        id: key,
        config: this.state.varForm[key],
      });
    }

    let form = formElementsArray.map((el) => {
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
            changed={(event) => this.inputChangedHandler(event, el.id)}
            shouldValidate={el.config.validation}
            invalid={!el.config.valid}
            touched={el.config.touched}
          />
        </div>
      );
    });

    let formFull = <Spinner />;
    if (!this.state.loading) {
      formFull = (
        <div>
          <div className={styles.Label}>Añadir nueva variable</div>
          <div className={styles.Description}>
            Seleccionar los campos con las caracteristicas del nuevo dispositivo
          </div>
          <form onSubmit={this.addVarHandler}>
            <div className={styles.Form}>{form}</div>
            <div className={styles.Actions}>
              <Button clicked={this.props.close} btntype={"Cancel"}>
                Cancelar
              </Button>
              <Button
                clicked={this.addVarHandler}
                btntype={"Success"}
                disabled={!this.state.formIsValid}
              >
                Aceptar
              </Button>
            </div>
          </form>
        </div>
      );
    }
    return <div>{formFull}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    vars: state.addVars.vars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchVars: () => dispatch(actions.fetchVars()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(AñadirVarUserDisp, axios));
