import * as actionTypes from "../../../shared/actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  vars: [],
  loading: false
};

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

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VARS_START:
      return fetchVarsStart(state);

    case actionTypes.FETCH_VARS_SUCCESS:
      return fetchVarsSuccess(state, action);

    case actionTypes.FETCH_VARS_FAIL:
      return fetchVarsFail(state, action);

    default:
      return state;
  }
};

export default reducer;
