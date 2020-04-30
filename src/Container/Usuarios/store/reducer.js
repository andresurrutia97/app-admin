import * as actionTypes from "./actionTypes";
import { updateObject } from "../../../shared/utility";

const initState = {
  users: [],
  loading: false,
  userVarInfo: null,
  //CRUD
  //Añadir
  loadingAdd: false,
  addResponse: null,
  addErrorResponse: null,
  //Eliminar
  loadingDelete: false,
  deleteResponse: null,
  deleteErrorResponse: null,
  //Actualizar
  loadingUpdate: false,
  updateResponse: null,
  updateErrorResponse: null,
  //Añadir variable
  var: null,
  loadingVar: false,
};

const fetchUserStart = (state) => {
  return updateObject(state, { loading: true });
};

const fetchUserSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false,
  });
};

const fetchUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: true,
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

//Añadir usuario

const addUserStart = (state) => {
  return updateObject(state, { loadingAdd: true });
};

const addUserSuccess = (state, action) => {
  return updateObject(state, { addResponse: action.res, loadingAdd: false });
};

const addUserFail = (state, action) => {
  return updateObject(state, {
    addErrorResponse: action.error,
    loadingAdd: false,
  });
};

//Eliminar usuario

const deleteUserStart = (state) => {
  return updateObject(state, { loadingDelete: true });
};

const deleteUserSuccess = (state, action) => {
  return updateObject(state, {
    deleteResponse: action.res,
    loadingDelete: false,
  });
};

const deleteUserFail = (state, action) => {
  return updateObject(state, {
    deleteErrorResponse: action.error,
    loadingDelete: false,
  });
};

//Actualizar usuario

const updateUserStart = (state) => {
  return updateObject(state, { loadingUpdate: true });
};

const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    updateResponse: action.res,
    loadingUpdate: false,
  });
};

const updateUserFail = (state, action) => {
  return updateObject(state, {
    updateErrorResponse: action.error,
    loadingUpdate: false,
  });
};

//Añadir variable a usuario
const addVarStart = (state) => {
  return updateObject(state, {
    loadingVar: true,
  });
};

const addVarSuccess = (state, action) => {
  return updateObject(state, {
    var: action.res,
    loadingVar: false,
  });
};

const addVarFail = (state, action) => {
  return updateObject(state, {
    loadingVar: true,
    error: action.error,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    //Buscar usuarios
    case actionTypes.FETCH_USERS_START:
      return fetchUserStart(state);

    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUserSuccess(state, action);

    case actionTypes.FETCH_USERS_FAIL:
      return fetchUserFail(state, action);

    //mostrar variables de usuarios
    case actionTypes.SHOW_USER_VARS:
      return showUsersVars(state, action);

    //añadir usuario
    case actionTypes.ADD_USER_START:
      return addUserStart(state);

    case actionTypes.ADD_USER_SUCCES:
      return addUserSuccess(state, action);

    case actionTypes.ADD_USER_FAIL:
      return addUserFail(state, action);

    //Eliminar usuario
    case actionTypes.DELETE_USER_START:
      return deleteUserStart(state);

    case actionTypes.DELETE_USER_SUCCES:
      return deleteUserSuccess(state, action);

    case actionTypes.DELETE_USER_FAIL:
      return deleteUserFail(state, action);

    //actualizar usuario
    case actionTypes.UPDATE_USER_START:
      return updateUserStart(state);

    case actionTypes.UPDATE_USER_SUCCES:
      return updateUserSuccess(state, action);

    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);

    //Añadir variable
    case actionTypes.ADD_VAR_SUCCESS:
      return addVarStart(state);

    case actionTypes.ADD_VAR_SUCCESS:
      return addVarSuccess(state, action);

    case actionTypes.ADD_VAR_FAIL:
      return addVarFail(state, action);

    default:
      return state;
  }
};

export default reducer;
