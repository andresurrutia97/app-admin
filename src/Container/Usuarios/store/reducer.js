import * as actionTypes from "../../../shared/actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  users: [],
  loading: false,
  userVarInfo: null
};

const fetchUserStart = state => {
  return updateObject(state, { loading: true });
};

const fetchUserSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false
  });
};

const fetchUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: true
  });
};

const showUsersVars = (state, action) => {
  const users = state.users;
  const id = action.userId;
  let varInfo = null;
  for (let user in users) {
    if (users[user].id === id) {
      varInfo = users[user].variables;
    }
  }
  return updateObject(state, { userVarInfo: varInfo });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return fetchUserStart(state);

    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUserSuccess(state, action);

    case actionTypes.FETCH_USERS_FAIL:
      return fetchUserFail(state, action);

    case actionTypes.SHOW_USER_VARS:
      return showUsersVars(state, action);

    default:
      return state;
  }
};

export default reducer;
