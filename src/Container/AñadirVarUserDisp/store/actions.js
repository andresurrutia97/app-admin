import * as actionTypes from "./actionTypes";
import axios from "../../../axios";

//// Añadir vaiable a dispositovo

export const addVarStart = () => {
  return {
    type: actionTypes.ADD_VAR_DISP_START,
  };
};

export const addVarSuccess = (res) => {
  return {
    type: actionTypes.ADD_VAR_DISP_SUCCESS,
    res: res,
  };
};

export const addVarFail = (error) => {
  return {
    type: actionTypes.ADD_VAR_DISP_FAIL,
    error: error,
  };
};

export const addVar = (type, id, data) => {
  return (dispatch) => {
    dispatch(addVarStart());
    axios
      .post("/" + type + "/" + id + "/variables/" + ".json", data)
      .then((res) => {
        console.log(res);
        dispatch(addVarSuccess(res));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchVarsStart = () => {
  return {
    type: actionTypes.FETCH_VAR_START,
  };
};

export const fetchVarsSuccess = (vars) => {
  return {
    type: actionTypes.FETCH_VAR_SUCCESS,
    vars: vars,
  };
};

export const fetchVarsFail = (error) => {
  return {
    type: actionTypes.FETCH_VAR_FAIL,
    error: error,
  };
};

export const fetchVars = () => {
  return (dispatch) => {
    dispatch(fetchVarsStart());
    axios
      .get("/vars.json")
      .then((res) => {
        const fetchVars = [];
        for (let key in res.data) {
          fetchVars.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchVarsSuccess(Object.values(fetchVars)));
      })
      .catch((error) => {
        dispatch(fetchVarsFail(error));
      });
  };
};
