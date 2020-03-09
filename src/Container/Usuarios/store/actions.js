import * as actionTypes from "../../../shared/actionTypes";
import axios from "../../../axios";

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
  };
};

export const fetchUsersFail = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersStart());
    axios
      .get("/users.json")
      .then(res => {
        //console.log(res.data);
        const fetchUsers = [];
        for (let key in res.data) {
          fetchUsers.push({
            ...res.data[key]
          });
        }
        dispatch(fetchUsersSuccess(fetchUsers));
      })
      .catch(error => {
        dispatch(fetchUsersFail(error));
      });
  };
};

export const showUserVars = id => {
  return {
    type: actionTypes.SHOW_USER_VARS,
    userId: id
  };
};
