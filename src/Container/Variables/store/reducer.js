import * as actionTypes from "../../../shared/actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  vars: [],
  loading: false,
  unidadesMedida: null,
  loadingUniMeds: false,
  indicators: null,
  loadingIndicators: false,
  periods: null,
  loadingPeriods: false
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

const reducer = (state = initState, action) => {
  switch (action.type) {
    //Variables
    case actionTypes.FETCH_VARS_START:
      return fetchVarsStart(state);

    case actionTypes.FETCH_VARS_SUCCESS:
      return fetchVarsSuccess(state, action);

    case actionTypes.FETCH_VARS_FAIL:
      return fetchVarsFail(state, action);

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
