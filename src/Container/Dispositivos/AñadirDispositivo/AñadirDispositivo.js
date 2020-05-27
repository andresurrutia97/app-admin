import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../../Components/UI/Input/Input";
import styles from "./AñadirDispositivo.module.scss";
import Button from "../../../Components/UI/Button/Button";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../store/actions";
import FormModel from "./FormModel";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Map from "../Map/Map";

export class AñadirDispositivo extends Component {
  state = {
    varForm: FormModel,
    formIsValid: false,
    formMapIsValid: false,
    loading: true,
    lat: null,
    long: null,
    loadingCoordenadas: true,
  };

  //Acciona el action creator que trae la informacion de los select de la base de datos
  componentDidMount() {
    this.props.onFetchInfo();
  }

  //Se actualiza la informacion de los select del form con los traídos de la base de datos
  componentDidUpdate() {
    //si esta en updateMode se actualiza los valores del Form con los del dispositivo seleccionado
    if (
      this.props.indicators !== null &&
      this.props.marcas !== null &&
      this.state.loading
    ) {
      const updatedForm = this.updateUnimedsInfo();
      if (this.props.updateMode && this.props.updateData !== null) {
        const updateData = this.updateValues(
          updatedForm,
          this.props.updateData
        );
        // console.log(updateData);
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
    console.log(this.state.formIsValid)
    if (
      this.state.lat &&
      this.state.lat &&
      this.state.loadingCoordenadas
    ) {
      this.setState({
        formMapIsValid: true,
        loadingCoordenadas: false,
      });
    }
  }

  //Agrega las opciones de los select traídos de la base de datos
  updateUnimedsInfo = () => {
    const indicatorArray = this.props.indicators;
    const marcasArray = this.props.marcas;
    const stateForm = this.state.varForm;

    // console.log(indicatorArray)
    const newFOrm = updateObject(stateForm, {
      indicador: updateObject(stateForm.indicador, {
        elementConfig: updateObject(stateForm.indicador.elementConfig, {
          options: indicatorArray,
        }),
        value: indicatorArray[0].value,
      }),
      marca: updateObject(stateForm.marca, {
        elementConfig: updateObject(stateForm.marca.elementConfig, {
          options: marcasArray,
        }),
        value: marcasArray[0].value,
      }),
    });
    return newFOrm;
  };

  //Funcion para validar que ha sido actualizado una caracterstica del form
  // en modo updateForm
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
      formIsValid: formIsValid,
      varForm: updatedVarForm,
    });
  };

  //Añadir variable
  addVarHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formEl in this.state.varForm) {
      formData[formEl] = this.state.varForm[formEl].value;
    }
    const finalData = {
      ...formData,
      coordenadas: { lat: this.state.lat, long: this.state.long },
    };
    console.log(finalData);
    this.props.addDisp(finalData);
    this.props.close();
    // this.props.openMess();
  };

  //Obtener las coordenadas del dispositivo
  dispPosition = (long, lat) => {
    if (this.props.updateMode && this.state.long !== null) {
      //updateMode - valida la form si hay mnodificacion en la posicion del dispositivo
      this.setState({ lat: lat, long: long, formMapIsValid: true });
    } else {
      this.setState({ lat: lat, long: long });
    }
  };

  //actualizar variable
  updateDispHandler = (event) => {
    event.preventDefault();
    const updatedInfo = {};
    for (let formEl in this.state.varForm) {
      updatedInfo[formEl] = this.state.varForm[formEl].value;
    }
    //crea una variable con toda la informacion del dispositivo
    const updatedInfoWithCoors = {
      ...updatedInfo,
      coordenadas: { lat: this.state.lat, long: this.state.long },
    };
    // console.log(updatedInfoWithCoors);

    this.props.updateDisp(updatedInfoWithCoors, this.props.updateData.id);
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

    let title = "Agregar nuevo dispositivo";
    let desc =
      "Rellenear los campos con las caracteristicas del nuevo dispositivo";

    if (this.props.updateMode) {
      title = "Modificar variable";
      desc = "Rellenear los campos con las caracteristicas que desea modificar";
    }

    let map;
    if (!this.props.updateMode) {
      map = <Map getPos={this.dispPosition} add={true} />;
    } else {
      map = (
        <Map
          info={true}
          coor={this.props.updateData.coordenadas}
          updateMode={this.props.updateMode}
          getPos={this.dispPosition}
        />
      );
    }

    let formFull = <Spinner />;
    if (!this.state.loading) {
      formFull = (
        <div>
          <div className={styles.Label}>{title}</div>
          <div className={styles.Description}>{desc}</div>
          <form onSubmit={this.addVarHandler}>
            <div className={styles.Form}>{form}</div>
            {map}
            <div className={styles.Actions}>
              <Button clicked={this.props.close} type={"Cancel"}>
                Cancelar
              </Button>
              <Button
                clicked={
                  !this.props.updateMode
                    ? this.addVarHandler
                    : this.updateDispHandler
                }
                btntype={"Success"}
                disabled={this.props.updateMode ? !this.state.formMapIsValid && !this.state.formIsValid : !this.state.formMapIsValid || !this.state.formIsValid}
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
    indicators: state.disps.indicators,
    marcas: state.disps.marcas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchInfo: () => dispatch(actions.fetchinfo()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AñadirDispositivo);
