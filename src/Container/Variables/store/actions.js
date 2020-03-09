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
