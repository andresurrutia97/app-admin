import * as actionTypes from "../../../shared/actionTypes";
import axios from "../../../axios";
import axiosAll from "axios";

export const fetchVarsStart = () => {
  return {
    type: actionTypes.FETCH_VARS_START
  };
};

export const fetchVarsSuccess = vars => {
  return {
    type: actionTypes.FETCH_VARS_SUCCESS,
    vars: vars
  };
};

export const fetchVarsFail = error => {
  return {
    type: actionTypes.FETCH_VARS_FAIL,
    error: error
  };
};

export const fetchVars = () => {
  return dispatch => {
    dispatch(fetchVarsStart());
    axios
      .get("/vars.json")
      .then(res => {
        //console.log(res.data);
        const fetchVars = [];
        for (let key in res.data) {
          fetchVars.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchVarsSuccess(fetchVars));
      })
      .catch(error => {
        dispatch(fetchVarsFail(error));
      });
  };
};

// Unidades de medida
export const fetchUniMedStart = () => {
  return {
    type: actionTypes.FETCH_MUNITS_START
  };
};

export const fetchUniMedSuccess = uniMed => {
  return {
    type: actionTypes.FETCH_MUNITS_SUCCESS,
    uniMed: uniMed
  };
};

export const fetchUniMedFail = error => {
  return {
    type: actionTypes.FETCH_MUNITS_FAIL,
    error: error
  };
};

//Indicadores
export const fetchIndicatorStart = () => {
  return {
    type: actionTypes.FETCH_INDICATOR_START
  };
};

export const fetchIndicatorSuccess = indicators => {
  return {
    type: actionTypes.FETCH_INDICATOR_SUCCESS,
    indicators: indicators
  };
};

export const fetchIndicatorFail = error => {
  return {
    type: actionTypes.FETCH_INDICATOR_FAIL,
    error: error
  };
};

//Periodicidad
export const fetchPeriodStart = () => {
  return {
    type: actionTypes.FETCH_PERIOD_START
  };
};

export const fetchPeriodSuccess = periods => {
  return {
    type: actionTypes.FETCH_PERIOD_SUCCESS,
    periods: periods
  };
};

export const fetchPeriodFail = error => {
  return {
    type: actionTypes.FETCH_PERIOD_FAIL,
    error: error
  };
};

//Nota: Axios.all no funciona con una instancia de axios, tiene que ser directamente la
//objeto importado de la libreria
export const fetchinfo = () => {
  const fetchUniMeds = axios.get("/unidadMedida.json");
  const fetchIndicators = axios.get("/indicador.json");
  const fetchPeriod = axios.get("/periodicidad.json");

  return dispatch => {
    dispatch(fetchUniMedStart());
    dispatch(fetchIndicatorStart());
    dispatch(fetchPeriodStart());
    axiosAll
      .all([fetchUniMeds, fetchIndicators, fetchPeriod])
      .then(
        axiosAll.spread(function(uniMeds, indicators, periods) {
          dispatch(fetchIndicatorSuccess(Object.values(indicators.data)));
          dispatch(fetchUniMedSuccess(Object.values(uniMeds.data)));
          dispatch(fetchPeriodSuccess(Object.values(periods.data)));
        })
      )
      .catch(error => {
        dispatch(fetchUniMedFail(error));
        dispatch(fetchIndicatorFail(error));
        dispatch(fetchPeriodFail(error));
      });
  };
};

//Agregar nueva variable

export const addVarStart = () => {
  return {
    type: actionTypes.ADD_VAR_START
  };
};

export const addVarSuccess = res => {
  return {
    type: actionTypes.ADD_VAR_SUCCESS,
    res: res
  };
};

export const addVarFail = error => {
  return {
    type: actionTypes.ADD_VAR_FAIL,
    error: error
  };
};

export const addVar = varData => {
  return dispatch => {
    dispatch(addVarStart());
    axios
      .post("/vars.json", varData)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          dispatch(addVarSuccess(res));
          dispatch(fetchVars());
        }
      })
      .catch(error => {
        if (error.response) {
          dispatch(addVarFail(error.response));
        }
      });
  };
};

//Eliminar variable

export const deleteVarStart = () => {
  return {
    type: actionTypes.DELETE_VAR_START
  };
};

export const deleteVarSuccess = res => {
  return {
    type: actionTypes.DELETE_VAR_SUCCESS,
    res: res
  };
};

export const deleteVarFail = error => {
  return {
    type: actionTypes.DELETE_VAR_FAIL,
    error: error
  };
};

export const deleteVar = id => {
  return dispatch => {
    dispatch(deleteVarStart());
    axios
      .delete("/vars/" + id + ".json")
      .then(res => {
        console.log(res);
        dispatch(deleteVarSuccess(res));
        dispatch(fetchVars());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

//Actualizar variables

export const updateVarStart = () => {
  return {
    type: actionTypes.UPDATE_VAR_START
  };
};

export const updateVarSuccess = res => {
  return {
    type: actionTypes.UPDATE_VAR_SUCCESS,
    res: res
  };
};

export const updateVarFail = error => {
  return {
    type: actionTypes.UPDATE_VAR_FAIL,
    error: error
  };
};

export const updateVar = (id, data) => {
  return dispatch => {
    dispatch(updateVarStart());
    axios
      .patch("/vars/" + id + ".json", data)
      .then(res => {
        console.log(res);
        dispatch(updateVarSuccess(res));
        dispatch(fetchVars());
      })
      .catch(error => {
        console.log(error);
      });
  };
};
