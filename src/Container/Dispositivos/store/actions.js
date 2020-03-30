import * as actionTypes from "./actionTypes";
import axios from "../../../axios";
import axiosAll from "axios";

export const fetchDispsStart = () => {
  return {
    type: actionTypes.FETCH_DISPS_START
  };
};

export const fetchDispsSuccess = disps => {
  return {
    type: actionTypes.FETCH_DISPS_SUCCESS,
    disps: disps
  };
};

export const fetchDispsFail = error => {
  return {
    type: actionTypes.FETCH_DISPS_FAIL,
    error: error
  };
};

export const fetchDisps = () => {
  return dispatch => {
    dispatch(fetchDispsStart());
    axios
      .get("/dispositivos.json")
      .then(res => {
        //console.log(res.data);
        const fetchDisps = [];
        for (let key in res.data) {
          fetchDisps.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchDispsSuccess(fetchDisps));
      })
      .catch(error => {
        dispatch(fetchDispsFail(error));
      });
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

//Marca
export const fetchMarcasStart = () => {
  return {
    type: actionTypes.FETCH_MARCA_START
  };
};

export const fetchMarcasSuccess = marcas => {
  return {
    type: actionTypes.FETCH_MARCA_SUCCESS,
    marcas: marcas
  };
};

export const fetchMarcasFail = error => {
  return {
    type: actionTypes.FETCH_MARCA_FAIL,
    error: error
  };
};

//Nota: Axios.all no funciona con una instancia de axios, tiene que ser directamente la
//objeto importado de la libreria
export const fetchinfo = () => {
  const fetchIndicators = axios.get("/indicador.json");
  const fetchMarcas = axios.get("/marcas.json");

  return dispatch => {
    dispatch(fetchIndicatorStart());
    dispatch(fetchMarcasStart());
    axiosAll
      .all([fetchIndicators, fetchMarcas])
      .then(
        axiosAll.spread(function(indicators, marcas) {
          dispatch(fetchIndicatorSuccess(Object.values(indicators.data)));
          dispatch(fetchMarcasSuccess(Object.values(marcas.data)));
        })
      )
      .catch(error => {
        dispatch(fetchIndicatorFail(error));
        dispatch(fetchMarcasFail(error));
      });
  };
};

//Agregar nuevo dispositivo

export const addDispStart = () => {
  return {
    type: actionTypes.ADD_DISP_START
  };
};

export const addDispSuccess = res => {
  return {
    type: actionTypes.ADD_DISP_START,
    res: res
  };
};

export const addDispFail = error => {
  return {
    type: actionTypes.ADD_DISP_FAIL,
    error: error
  };
};

export const addDisp = varData => {
  return dispatch => {
    dispatch(addDispStart());
    axios
      .post("/dispositivos.json", varData)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          dispatch(addDispSuccess(res));
          dispatch(fetchDisps());
        }
      })
      .catch(error => {
        if (error.response) {
          dispatch(addDispFail(error.response));
        }
      });
  };
};

// //Eliminar variable

// export const deleteVarStart = () => {
//   return {
//     type: actionTypes.DELETE_VAR_START
//   };
// };

// export const deleteVarSuccess = res => {
//   return {
//     type: actionTypes.DELETE_VAR_SUCCESS,
//     res: res
//   };
// };

// export const deleteVarFail = error => {
//   return {
//     type: actionTypes.DELETE_VAR_FAIL,
//     error: error
//   };
// };

// export const deleteVar = id => {
//   return dispatch => {
//     dispatch(deleteVarStart());
//     axios
//       .delete("/vars/" + id + ".json")
//       .then(res => {
//         console.log(res);
//         dispatch(deleteVarSuccess(res));
//         dispatch(fetchDisps());
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };
// };

//Actualizar variables

export const updateDispStart = () => {
  return {
    type: actionTypes.UPDATE_DISP_START
  };
};

export const updateDispSuccess = res => {
  return {
    type: actionTypes.UPDATE_DISP_SUCCESS,
    res: res
  };
};

export const updateDispFail = error => {
  return {
    type: actionTypes.UPDATE_DISP_FAIL,
    error: error
  };
};

export const updateDisp = (id, data) => {
  return dispatch => {
    dispatch(updateDispStart());
    axios
      .patch("/dispositivos/" + id + ".json", data)
      .then(res => {
        console.log(res);
        dispatch(updateDispSuccess(res));
        dispatch(fetchDisps());
      })
      .catch(error => {
        console.log(error);
      });
  };
};
