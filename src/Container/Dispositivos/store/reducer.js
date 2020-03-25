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
  updateErrorResponse: null
};

//Variables
const fetchDispsStart = state => {
  return updateObject(state, { loading: true });
};

const fetchDispsSuccess = (state, action) => {
  return updateObject(state, {
    dispositivos: action.disps,
    loading: false
  });
};

const fetchDispsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: true
  });
};

//Añadir variables

const addDispStart = state => {
  return updateObject(state, { loadingAdd: true });
};

const addDispSuccess = (state, action) => {
  return updateObject(state, { addResponse: action.res, loadingAdd: false });
};

const addDispFail = (state, action) => {
  return updateObject(state, {
    addErrorResponse: action.error,
    loadingAdd: false
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
    errorIndicator: action.error,
    loadingIndicators: true
  });
};

//Marcas
const fetchMarcasStart = state => {
  return updateObject(state, { loadingMarcas: true });
};

const fetchMarcasSuccess = (state, action) => {
  return updateObject(state, {
    marcas: action.marcas,
    loadingMarcas: false
  });
};

const fetchMarcasFail = (state, action) => {
  return updateObject(state, {
    errorMarcas: action.error,
    loadingMarcas: true
  });
};

//Unidades de medida
// const fetchUniMedStart = state => {
//   return updateObject(state, { loadingUniMeds: true });
// };

// const fetchUniMedSuccess = (state, action) => {
//   return updateObject(state, {
//     unidadesMedida: action.uniMed,
//     loadingUniMed: false
//   });
// };

// const fetchUniMedFail = (state, action) => {
//   return updateObject(state, {
//     error: action.error,
//     loadingUniMeds: true
//   });
// };

// //Indicadores

// const fetchIndicatorStart = state => {
//   return updateObject(state, { loadingIndicators: true });
// };

// const fetchIndicatorSuccess = (state, action) => {
//   return updateObject(state, {
//     indicators: action.indicators,
//     loadingIndicators: false
//   });
// };

// const fetchIndicatorFail = (state, action) => {
//   return updateObject(state, {
//     error: action.error,
//     loadingIndicators: true
//   });
// };

// //Periodicidad

// const fetchPeriodsStart = state => {
//   return updateObject(state, { loadingIndicators: true });
// };

// const fetchPeriodsSuccess = (state, action) => {
//   return updateObject(state, {
//     periods: action.periods,
//     loadingPeriods: false
//   });
// };

// const fetchPeriodsFail = (state, action) => {
//   return updateObject(state, {
//     error: action.error,
//     loadingPeriods: true
//   });
// };

// //Añadir variables

// const addVarStart = state => {
//   return updateObject(state, { loadingAdd: true });
// };

// const addVarSuccess = (state, action) => {
//   return updateObject(state, { addResponse: action.res, loadingAdd: false });
// };

// const addVarFail = (state, action) => {
//   return updateObject(state, {
//     addErrorResponse: action.error,
//     loadingAdd: false
//   });
// };

// //Eliminar variables

// const deleteVarStart = state => {
//   return updateObject(state, { loadingDelete: true });
// };

// const deleteVarSuccess = (state, action) => {
//   return updateObject(state, {
//     deleteResponse: action.res,
//     loadingDelete: false
//   });
// };

// const deleteVarFail = (state, action) => {
//   return updateObject(state, {
//     deleteErrorResponse: action.error,
//     loadingDelete: false
//   });
// };

// //Actualizar variables

// const updateVarStart = state => {
//   return updateObject(state, { loadingUpdate: true });
// };

// const updateVarSuccess = (state, action) => {
//   return updateObject(state, {
//     updateResponse: action.res,
//     loadingUpdate: false
//   });
// };

// const updateVarFail = (state, action) => {
//   return updateObject(state, {
//     updateErrorResponse: action.error,
//     loadingUpdate: false
//   });
// };
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

    // //Eliminar Variable
    // case actionTypes.DELETE_VAR_START:
    //   return deleteVarStart(state);

    // case actionTypes.DELETE_VAR_SUCCESS:
    //   return deleteVarSuccess(state, action);

    // case actionTypes.DELETE_VAR_FAIL:
    //   return deleteVarFail(state, action);

    // //Actualizar Variable
    // case actionTypes.UPDATE_VAR_START:
    //   return updateVarStart(state);

    // case actionTypes.UPDATE_VAR_SUCCESS:
    //   return updateVarSuccess(state, action);

    // case actionTypes.UPDATE_VAR_FAIL:
    //   return updateVarFail(state, action);

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

    default:
      return state;
  }
};

export default reducer;
