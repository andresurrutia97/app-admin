import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  vars: [],
  loading: false,
  //Indo fe selects
  unidadesMedida: null,
  loadingUniMeds: false,
  indicators: null,
  loadingIndicators: false,
  periods: null,
  loadingPeriods: false,
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
  updateErrorResponse: null
};

//Variables
const fetchVarsStart = state => {
  return updateObject(state, { loading: true });
};

const fetchVarsSuccess = (state, action) => {
  return updateObject(state, {
    vars: action.vars,
    loading: false
  });
};

const fetchVarsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: true
  });
};

//Unidades de medida
const fetchUniMedStart = state => {
  return updateObject(state, { loadingUniMeds: true });
};

const fetchUniMedSuccess = (state, action) => {
  return updateObject(state, {
    unidadesMedida: action.uniMed,
    loadingUniMed: false
  });
};

const fetchUniMedFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUniMeds: true
  });
};

//Indicadores

const fetchIndicatorStart = state => {
  return updateObject(state, { loadingIndicators: true });
};

const fetchIndicatorSuccess = (state, action) => {
  return updateObject(state, {
    indicators: action.indicators,
    loadingIndicators: false
  });
};

const fetchIndicatorFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingIndicators: true
  });
};

//Periodicidad

const fetchPeriodsStart = state => {
  return updateObject(state, { loadingIndicators: true });
};

const fetchPeriodsSuccess = (state, action) => {
  return updateObject(state, {
    periods: action.periods,
    loadingPeriods: false
  });
};

const fetchPeriodsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingPeriods: true
  });
};

//Añadir variables

const addVarStart = state => {
  return updateObject(state, { loadingAdd: true });
};

const addVarSuccess = (state, action) => {
  return updateObject(state, { addResponse: action.res, loadingAdd: false });
};

const addVarFail = (state, action) => {
  return updateObject(state, {
    addErrorResponse: action.error,
    loadingAdd: false
  });
};

//Eliminar variables

const deleteVarStart = state => {
  return updateObject(state, { loadingDelete: true });
};

const deleteVarSuccess = (state, action) => {
  return updateObject(state, {
    deleteResponse: action.res,
    loadingDelete: false
  });
};

const deleteVarFail = (state, action) => {
  return updateObject(state, {
    deleteErrorResponse: action.error,
    loadingDelete: false
  });
};

//Actualizar variables

const updateVarStart = state => {
  return updateObject(state, { loadingUpdate: true });
};

const updateVarSuccess = (state, action) => {
  return updateObject(state, {
    updateResponse: action.res,
    loadingUpdate: false
  });
};

const updateVarFail = (state, action) => {
  return updateObject(state, {
    updateErrorResponse: action.error,
    loadingUpdate: false
  });
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    //Variables
    case actionTypes.FETCH_VARS_START:
      return fetchVarsStart(state);

    case actionTypes.FETCH_VARS_SUCCESS:
      return fetchVarsSuccess(state, action);

    case actionTypes.FETCH_VARS_FAIL:
      return fetchVarsFail(state, action);

    //Añadir Variable
    case actionTypes.ADD_VAR_START:
      return addVarStart(state);

    case actionTypes.ADD_VAR_SUCCESS:
      return addVarSuccess(state, action);

    case actionTypes.ADD_VAR_FAIL:
      return addVarFail(state, action);

    //Eliminar Variable
    case actionTypes.DELETE_VAR_START:
      return deleteVarStart(state);

    case actionTypes.DELETE_VAR_SUCCESS:
      return deleteVarSuccess(state, action);

    case actionTypes.DELETE_VAR_FAIL:
      return deleteVarFail(state, action);

    //Actualizar Variable
    case actionTypes.UPDATE_VAR_START:
      return updateVarStart(state);

    case actionTypes.UPDATE_VAR_SUCCESS:
      return updateVarSuccess(state, action);

    case actionTypes.UPDATE_VAR_FAIL:
      return updateVarFail(state, action);

    //Unidades de medida
    case actionTypes.FETCH_MUNITS_START:
      return fetchUniMedStart(state);

    case actionTypes.FETCH_MUNITS_SUCCESS:
      return fetchUniMedSuccess(state, action);

    case actionTypes.FETCH_MUNITS_FAIL:
      return fetchUniMedFail(state, action);

    //Indicadores
    case actionTypes.FETCH_INDICATOR_START:
      return fetchIndicatorStart(state);

    case actionTypes.FETCH_INDICATOR_SUCCESS:
      return fetchIndicatorSuccess(state, action);

    case actionTypes.FETCH_INDICATOR_FAIL:
      return fetchIndicatorFail(state, action);

    //Periodicidad
    case actionTypes.FETCH_PERIOD_START:
      return fetchPeriodsStart(state);

    case actionTypes.FETCH_PERIOD_SUCCESS:
      return fetchPeriodsSuccess(state, action);

    case actionTypes.FETCH_PERIOD_FAIL:
      return fetchPeriodsFail(state, action);

    default:
      return state;
  }
};

export default reducer;
