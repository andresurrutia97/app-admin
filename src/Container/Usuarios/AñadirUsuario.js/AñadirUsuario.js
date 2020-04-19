import React, { Component } from "react";

import styles from "./AñadirUsuarios.module.scss";
import { updateObject, checkValidity } from "../../../shared/utility";
import Input from "../../../Components/UI/Input/Input";
import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";

export class AñadirUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      varForm: {
        correo: {
          elementType: "input",
          elementName: "Correo",
          elementConfig: {
            type: "text",
            placeholder: "Correo",
          },
          value: "",
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
          fullWidth: true,
        },
      },
      formIsValid: false,
      loading: true
    };
  }

  componentDidMount() {
    if (this.state.loading) {
      if (this.props.updateMode && this.props.updateData !== null) {
        const updateData = this.updateValues(
          this.state.varForm,
          this.props.updateData
        );
        this.setState({
          varForm: updateData,
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    }
  }

  updateValues = (array, data) => {
    let newData = [];
    for (let el in array) {
      newData[el] = updateObject(array[el], {
        value: data[el],
        valid: true,
      });
    }
    // console.log(newData);
    return newData;
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

    this.setState({
      formIsValid: formIsValid,
      varForm: updatedVarForm,
    });
  };

  addVarHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formEl in this.state.varForm) {
      formData[formEl] = this.state.varForm[formEl].value;
    }
    this.props.addUser(formData);
    this.props.close();
    // this.props.openMess();
  };

  updateVarHandler = (event) => {
    event.preventDefault();
    const updatedInfo = {};
    for (let formEl in this.state.varForm) {
      updatedInfo[formEl] = this.state.varForm[formEl].value;
    }

    this.props.updateUser(updatedInfo, this.props.updateData.id);
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

    let title = "Agregar nuevo usuario";
    let desc = "Escribir el correo del nuevo usuario";

    if (this.props.updateMode) {
      title = "Modificar usuario";
      desc = "Escribir el nuevo correo para este usuario";
    }

    let formFull = <Spinner />;
    if (!this.state.loading) {
      formFull = (
        <div>
          <div className={styles.Label}>{title}</div>
          <div className={styles.Description}>{desc}</div>
          <form onSubmit={this.addVarHandler}>
            <div className={styles.Form}>{form}</div>

            <div className={styles.Actions}>
              <Button clicked={this.props.close} btntype={"Cancel"}>
                Cancelar
              </Button>
              <Button
                clicked={
                  !this.props.updateMode
                    ? this.addVarHandler
                    : this.updateVarHandler
                }
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

    return <React.Fragment>{formFull}</React.Fragment>;
  }
}

export default AñadirUsuario;
