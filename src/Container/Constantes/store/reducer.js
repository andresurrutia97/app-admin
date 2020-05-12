import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  consts: [],
  loading: false,
  //Info unidades de medida
  unidadesMedida: null,
  loadingUniMeds: false,
  //---CRUD---
  //Añadir
  loadingAdd: false,
  addResponse: null,
  addErrorResponse: null,
  // //Eliminar
  // loadingDelete: false,
  // deleteResponse: null,
  // deleteErrorResponse: null,
  // //Actualizar
  // loadingUpdate: false,
  // updateResponse: null,
  // updateErrorResponse: null
};

//Consultar constantes
const fetchConstStart = (state) => {
  return updateObject(state, { loading: true });
};

const fetchConstSuccess = (state, action) => {
  return updateObject(state, {
    consts: action.consts,
    loading: false,
  });
};

const fetchConstFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: true,
  });
};

//Unidades de medida
const fetchUniMedStart = (state) => {
  return updateObject(state, { loadingUniMeds: true });
};

const fetchUniMedSuccess = (state, action) => {
  return updateObject(state, {
    unidadesMedida: action.uniMed,
    loadingUniMed: false,
  });
};

const fetchUniMedFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loadingUniMeds: true,
  });
};

//Añadir variables

const addConstStart = (state) => {
  return updateObject(state, { loadingAdd: true });
};

const addConstSuccess = (state, action) => {
  return updateObject(state, { addResponse: action.res, loadingAdd: false });
};

const addConstFail = (state, action) => {
  return updateObject(state, {
    addErrorResponse: action.error,
    loadingAdd: false,
  });
};

//Eliminar constante

const deleteConstStart = state => {
  return updateObject(state, { loadingDelete: true });
};

const deleteConstSuccess = (state, action) => {
  return updateObject(state, {
    deleteResponse: action.res,
    loadingDelete: false
  });
};

const deleteConstFail = (state, action) => {
  return updateObject(state, {
    deleteErrorResponse: action.error,
    loadingDelete: false
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    //Constantes
    case actionTypes.FETCH_CONST_START:
      return fetchConstStart(state);

    case actionTypes.FETCH_CONST_SUCCESS:
      return fetchConstSuccess(state, action);

    case actionTypes.FETCH_CONST_FAIL:
      return fetchConstFail(state, action);

    //Unidades de medida
    case actionTypes.FETCH_MUNITS_START:
      return fetchUniMedStart(state);

    case actionTypes.FETCH_MUNITS_SUCCESS:
      return fetchUniMedSuccess(state, action);

    case actionTypes.FETCH_MUNITS_FAIL:
      return fetchUniMedFail(state, action);

    //Añadir Variable
    case actionTypes.ADD_CONST_START:
      return addConstStart(state);

    case actionTypes.ADD_CONST_SUCCESS:
      return addConstSuccess(state, action);

    case actionTypes.ADD_CONST_FAIL:
      return addConstFail(state, action);

    //Eliminar Variable
    case actionTypes.DELETE_CONST_START:
      return deleteConstStart(state);

    case actionTypes.DELETE_CONST_SUCCESS:
      return deleteConstSuccess(state, action);

    case actionTypes.DELETE_CONST_FAIL:
      return deleteConstFail(state, action);

    default:
      return state;
  }
};

export default reducer;
