import * as actionTypes from "../../../shared/actionTypes";
import axios from "../../../axios";

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
            ...res.data[key]
          });
        }
        dispatch(fetchVarsSuccess(fetchVars));
      })
      .catch(error => {
        dispatch(fetchVarsFail(error));
      });
  };
};

// consultar unidades de medida
export const fetchvarUnitStart = () => {
  return {
    type: actionTypes.FETCH_MUNITS_START
  };
};

export const fetchvarUnitSuccess = vars => {
  return {
    type: actionTypes.FETCH_MUNITS_SUCCESS,
    vars: vars
  };
};

export const fetchvarUnitFail = error => {
  return {
    type: actionTypes.FETCH_MUNITS_FAIL,
    error: error
  };
};

export const fetchIndicatorStart = () => {
  return {
    type: actionTypes.FETCH_INDICATOR_START
  };
};

export const fetchIndicatorSuccess = vars => {
  return {
    type: actionTypes.FETCH_INDICATOR_SUCCESS,
    vars: vars
  };
};

export const fetchIndicatorFail = error => {
  return {
    type: actionTypes.FETCH_INDICATOR_FAIL,
    error: error
  };
};

export const fetchinfo = () => {
  const unidadMedida = "/unidadMedida.json";
  const indicador = "/indicador.json";


  return dispatch => {
    axios
      .get(unidadMedida)
      .then(responses => {
        console.log(responses.data);
      })
      .catch(errors => {
        // react on errors.
      });

    axios
      .get(indicador)
      .then(responses => {
        console.log(responses.data);
      })
      .catch(errors => {
        // react on errors.
      });
  };
};
