import * as actionTypes from "./actionTypes";
import axios from "../../../axios";

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users,
  };
};

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios
      .get("/users.json")
      .then((res) => {
        //console.log(res.data);
        const fetchUsers = [];
        for (let key in res.data) {
          fetchUsers.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchUsersSuccess(fetchUsers));
      })
      .catch((error) => {
        dispatch(fetchUsersFail(error));
      });
  };
};

export const showUserVars = (id) => {
  return {
    type: actionTypes.SHOW_USER_VARS,
    userId: id,
  };
};

//Agregar nuevo usuario

export const addUserStart = () => {
  return {
    type: actionTypes.ADD_USER_START,
  };
};

export const addUserSuccess = (res) => {
  return {
    type: actionTypes.ADD_USER_SUCCES,
    res: res,
  };
};

export const addUserFail = (error) => {
  return {
    type: actionTypes.ADD_USER_FAIL,
    error: error,
  };
};

export const addUser = (userData) => {
  return (dispatch) => {
    dispatch(addUserStart());
    axios
      .post("/users.json", userData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch(addUserSuccess(res));
          dispatch(fetchUsers());
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(addUserFail(error.response));
        }
      });
  };
};

//Eliminar usuario

export const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START
  };
};

export const deleteUserSuccess = res => {
  return {
    type: actionTypes.DELETE_USER_SUCCES,
    res: res
  };
};

export const deleteUserFail = error => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error: error
  };
};

export const deleteUser = id => {
  return dispatch => {
    dispatch(deleteUserStart());
    axios
      .delete("/users/" + id + ".json")
      .then(res => {
        // console.log(res);
        dispatch(deleteUserSuccess(res));
        dispatch(fetchUsers());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

//Actualizar usuario

export const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START
  };
};

export const updateUserSuccess = res => {
  return {
    type: actionTypes.UPDATE_USER_SUCCES,
    res: res
  };
};

export const updateUserFail = error => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error
  };
};

export const updateUser = (id, data) => {
  return dispatch => {
    dispatch(updateUserStart());
    axios
      .patch("/users/" + id + ".json", data)
      .then(res => {
        console.log(res);
        dispatch(updateUserSuccess(res));
        dispatch(fetchUsers());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

