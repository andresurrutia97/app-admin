import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../../Components/UI/Input/Input";
import styles from "./AñadirConstante.module.scss";
import Button from "../../../Components/UI/Button/Button";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../store/actions";
import FormModel from "./FormModel";
import Spinner from "../../../Components/UI/Spinner/Spinner";

export class AñadirConstante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      varForm: FormModel,
      formIsValid: false,
      loading: true,
    };
  }

  //Acciona el action creator que trae la informacion de los select de la base de datos
  componentDidMount() {
    this.props.onFetchInfo();
    // console.log(this.props.updateData);
  }

  //Se actualiza la informacion de los select del form con los traidos de la base de datos
  componentDidUpdate() {
    if (this.props.unidadesMedida !== null && this.state.loading) {
      const updatedForm = this.updateUnimedsInfo();

      if (this.props.updateMode && this.props.updateData !== null) {
        const updateData = this.updateValues(
          updatedForm,
          this.props.updateData
        );

        this.setState({
          varForm: updateData,
          loading: false,
        });
      } else {
        this.setState({
          varForm: updatedForm,
          loading: false,
        });
      }
    }
  }

  //Creaun nuevo arreglo con los elementos del select extraidos de la base
  updateUnimedsInfo = () => {
    const uniMedsArray = this.props.unidadesMedida;
    const stateForm = this.state.varForm;

    const newFOrm = updateObject(stateForm, {
      unidadMedida: updateObject(stateForm.unidadMedida, {
        elementConfig: updateObject(stateForm.unidadMedida.elementConfig, {
          options: uniMedsArray,
        }),
        value: uniMedsArray[0].value,
      }),
    });
    return newFOrm;
  };

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
    // console.log(updatedVarForm);
    this.setState({
      varForm: updatedVarForm,
      formIsValid: formIsValid,
    });
  };

  addVarHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formEl in this.state.varForm) {
      formData[formEl] = this.state.varForm[formEl].value;
    }
    // console.log(formData);
    this.props.addConst(formData);
    this.props.close();
    // this.props.openMess();
  };

  //actualizar variable

  updateVarHandler = (event) => {
    event.preventDefault();
    const updatedInfo = {};
    for (let formEl in this.state.varForm) {
      updatedInfo[formEl] = this.state.varForm[formEl].value;
    }

    // this.props.updateVar(updatedInfo, this.props.updateData.id);
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

    let title = "Agregar nueva variable";
    let desc =
      "Rellenear los campos con las caracteristicas de la nueva variable";

    if (this.props.updateMode) {
      title = "Modificar variable";
      desc = "Rellenear los campos con las caracteristicas que desea modificar";
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

const mapStateToProps = (state) => {
  return {
    unidadesMedida: state.const.unidadesMedida,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchInfo: () => dispatch(actions.fetchUniMeds()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AñadirConstante);
