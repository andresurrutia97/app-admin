import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  dispositivos: [],
  loading: false,
  //Info de selects
  indicators: null,
  loadingIndicators: false,
  marcas: null,
  loadingMarcas: false,
  //---CRUD---
  //Añadir
  loadingAdd: false,
  addResponse: null,
  addErrorResponse: null,
  //Eliminar
  loadingDelete: false,
  deleteResponse: null,
  deleteErrorResponse: null,
  //Actualizar
  loadingUpdate: false,
  updateResponse: null,
  updateErrorResponse: null,
  //Añadir variable
  var: null,
  loadingVar: false,
  //Eliminar variable
  deleteVarResponse: null,
  loadingVarDelete: false,
};

//Variables
const fetchDispsStart = (state) => {
  return updateObject(state, { loading: true });
};

const fetchDispsSuccess = (state, action) => {
  return updateObject(state, {
    dispositivos: action.disps,
    loading: false,
  });
};

const fetchDispsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: true,
  });
};

//Añadir variables

const addDispStart = (state) => {
  return updateObject(state, { loadingAdd: true });
};

const addDispSuccess = (state, action) => {
  return updateObject(state, { addResponse: action.res, loadingAdd: false });
};

const addDispFail = (state, action) => {
  return updateObject(state, {
    addErrorResponse: action.error,
    loadingAdd: false,
  });
};

//Actualizar dispositivo

const updateDispStart = (state) => {
  return updateObject(state, { loadingUpdate: true });
};

const updateDispSuccess = (state, action) => {
  return updateObject(state, {
    updateResponse: action.res,
    loadingUpdate: false,
  });
};

const updateDispFail = (state, action) => {
  return updateObject(state, {
    updateErrorResponse: action.error,
    loadingUpdate: false,
  });
};

//Elimianr dispositivo

const deleteDispStart = (state) => {
  return updateObject(state, { loadingDelete: true });
};

const deleteDispSuccess = (state, action) => {
  return updateObject(state, {
    deleteResponse: action.res,
    loadingDelete: false,
  });
};

const deleteDispFail = (state, action) => {
  return updateObject(state, {
    deleteErrorResponse: action.error,
    loadingDelete: false,
  });
};

//Indicadores
const fetchIndicatorStart = (state) => {
  return updateObject(state, { loadingIndicators: true });
};

const fetchIndicatorSuccess = (state, action) => {
  return updateObject(state, {
    indicators: action.indicators,
    loadingIndicators: false,
  });
};

const fetchIndicatorFail = (state, action) => {
  return updateObject(state, {
    errorIndicator: action.error,
    loadingIndicators: true,
  });
};

//Marcas
const fetchMarcasStart = (state) => {
  return updateObject(state, { loadingMarcas: true });
};

const fetchMarcasSuccess = (state, action) => {
  return updateObject(state, {
    marcas: action.marcas,
    loadingMarcas: false,
  });
};

const fetchMarcasFail = (state, action) => {
  return updateObject(state, {
    errorMarcas: action.error,
    loadingMarcas: true,
  });
};

//Añadir variable a usuario
const addVarStart = (state) => {
  return updateObject(state, {
    loadingVar: true,
  });
};

const addVarSuccess = (state, action) => {
  return updateObject(state, {
    var: action.res,
    loadingVar: false,
  });
};

const addVarFail = (state, action) => {
  return updateObject(state, {
    loadingVar: true,
    error: action.error,
  });
};

//Eliminar variable a usuario
const deleteVarStart = (state) => {
  return updateObject(state, {
    loadingVarDelete: true,
  });
};

const deleteVarSuccess = (state, action) => {
  return updateObject(state, {
    deleteVarResponse: action.res,
    loadingVarDelete: false,
  });
};

const deleteVarFail = (state, action) => {
  return updateObject(state, {
    loadingVarDelete: true,
    error: action.error,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    //Variables
    case actionTypes.FETCH_DISPS_START:
      return fetchDispsStart(state);

    case actionTypes.FETCH_DISPS_SUCCESS:
      return fetchDispsSuccess(state, action);

    case actionTypes.FETCH_DISPS_FAIL:
      return fetchDispsFail(state, action);

    //Añadir Dispositivo
    case actionTypes.ADD_DISP_START:
      return addDispStart(state);

    case actionTypes.ADD_DISP_SUCCESS:
      return addDispSuccess(state, action);

    case actionTypes.ADD_DISP_FAIL:
      return addDispFail(state, action);

    //Eliminar Variable
    case actionTypes.DELETE_DISP_START:
      return deleteDispStart(state);

    case actionTypes.DELETE_DISP_SUCCESS:
      return deleteDispSuccess(state, action);

    case actionTypes.DELETE_DISP_FAIL:
      return deleteDispFail(state, action);

    //Actualizar Variable
    case actionTypes.UPDATE_DISP_START:
      return updateDispStart(state);

    case actionTypes.UPDATE_DISP_SUCCESS:
      return updateDispSuccess(state, action);

    case actionTypes.UPDATE_DISP_FAIL:
      return updateDispFail(state, action);

    //Indicadores
    case actionTypes.FETCH_INDICATOR_START:
      return fetchIndicatorStart(state);

    case actionTypes.FETCH_INDICATOR_SUCCESS:
      return fetchIndicatorSuccess(state, action);

    case actionTypes.FETCH_INDICATOR_FAIL:
      return fetchIndicatorFail(state, action);

    //Marcas
    case actionTypes.FETCH_MARCA_START:
      return fetchMarcasStart(state);

    case actionTypes.FETCH_MARCA_SUCCESS:
      return fetchMarcasSuccess(state, action);

    case actionTypes.FETCH_MARCA_FAIL:
      return fetchMarcasFail(state, action);

    //Añadir variable
    case actionTypes.ADD_VAR_SUCCESS:
      return addVarStart(state);

    case actionTypes.ADD_VAR_SUCCESS:
      return addVarSuccess(state, action);

    case actionTypes.ADD_VAR_FAIL:
      return addVarFail(state, action);

    //Eliminar variable
    case actionTypes.DELETE_VAR_START:
      return deleteVarStart(state);

    case actionTypes.DELETE_VAR_START:
      return deleteVarSuccess(state, action);

    case actionTypes.DELETE_VAR_FAIL:
      return deleteVarFail(state, action);

    default:
      return state;
  }
};

export default reducer;
