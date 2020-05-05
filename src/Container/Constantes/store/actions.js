import * as actionTypes from "./actionTypes";
import axios from "../../../axios";

//Consultar constantes
export const fetchConstStart = () => {
  return {
    type: actionTypes.FETCH_CONST_START,
  };
};

export const fetchConstSuccess = (consts) => {
  return {
    type: actionTypes.FETCH_CONST_SUCCESS,
    consts: consts,
  };
};

export const fetchConstFail = (error) => {
  return {
    type: actionTypes.FETCH_CONST_FAIL,
    error: error,
  };
};

export const fetchConst = () => {
  return (dispatch) => {
    dispatch(fetchConstStart());
    axios
      .get("/constantes.json")
      .then((res) => {
        //console.log(res.data);
        const fetchConst = [];
        for (let key in res.data) {
          fetchConst.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchConstSuccess(fetchConst));
      })
      .catch((error) => {
        dispatch(fetchConstFail(error));
      });
  };
};

// Unidades de medida
export const fetchUniMedStart = () => {
  return {
    type: actionTypes.FETCH_MUNITS_START,
  };
};

export const fetchUniMedSuccess = (uniMed) => {
  return {
    type: actionTypes.FETCH_MUNITS_SUCCESS,
    uniMed: uniMed,
  };
};

export const fetchUniMedFail = (error) => {
  return {
    type: actionTypes.FETCH_MUNITS_FAIL,
    error: error,
  };
};

export const fetchUniMeds = () => {
  return (dispatch) => {
    dispatch(fetchUniMedStart());
    axios
      .get("/unidadMedida.json")
      .then((res) => {
        //console.log(res.data);
        dispatch(fetchUniMedSuccess(Object.values(res.data)));
      })
      .catch((error) => {
        dispatch(fetchUniMedFail(error));
      });
  };
};

//Agregar nueva constante

export const addConstStart = () => {
  return {
    type: actionTypes.ADD_CONST_START,
  };
};

export const addConstSuccess = (res) => {
  return {
    type: actionTypes.ADD_CONST_SUCCESS,
    res: res,
  };
};

export const addConstFail = (error) => {
  return {
    type: actionTypes.ADD_CONST_FAIL,
    error: error,
  };
};

export const addConst = (varData) => {
  return (dispatch) => {
    dispatch(addConstStart());
    axios
      .post("/constantes.json", varData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch(addConstSuccess(res));
          dispatch(fetchConst());
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(addConstFail(error.response));
        }
      });
  };
};
