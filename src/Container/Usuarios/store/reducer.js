import * as actionTypes from "./actionTypes";

const initState = {
  users: [],
  loading: false,
  varInfo: null
};

const getInfoVar = (id, data) => {
  for (let u in data) {
    if (data[u].id === id) {
      return data[u].variables;
    }
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case actionTypes.FETCH_USERS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: true
      };
    case actionTypes.SHOW_USER_VARS:
      return {
        ...state,
        varInfo: getInfoVar(action.userId, state.users)
      };
    default:
      return state;
  }
};

export default reducer;
