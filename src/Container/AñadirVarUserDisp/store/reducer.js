import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  //Add var disp
  varDisp: null,
  loadingVarDisp: false,
  //infoVariables
  vars: null,
  loadingVars: false,
};

//Consultar variables
const fetchVarsStart = (state) => {
  return updateObject(state, { loadingVars: true });
};

const fetchVarsSuccess = (state, action) => {
  return updateObject(state, {
    vars: action.vars,
    loadingVars: false,
  });
};

const fetchVarsFail = (state, action) => {
  return updateObject(state, {
    errorVar: action.error,
    loadingVars: true,
  });
};

//add var disp
const addVarDispStart = (state) => {
  return updateObject(state, {
    loadingVarDisp: true,
  });
};

const addVarDispSuccess = (state, action) => {
  return updateObject(state, {
    varDisp: action.res,
    loadingVarDisp: false,
  });
};

const addVarDispFail = (state, action) => {
  return updateObject(state, {
    loadingVarDisp: true,
    error: action.error,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    //Consultar vars
    case actionTypes.FETCH_VAR_START:
      return fetchVarsStart(state);

    case actionTypes.FETCH_VAR_SUCCESS:
      return fetchVarsSuccess(state, action);

    case actionTypes.FETCH_VAR_FAIL:
      return fetchVarsFail(state, action);

    //Añadir var
    case actionTypes.ADD_VAR_DISP_SUCCESS:
      return addVarDispStart(state);

    case actionTypes.ADD_VAR_DISP_SUCCESS:
      return addVarDispSuccess(state, action);

    case actionTypes.ADD_VAR_DISP_FAIL:
      return addVarDispFail(state, action);

    default:
      return state;
  }
};

export default reducer;
