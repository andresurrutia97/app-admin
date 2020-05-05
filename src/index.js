import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import usersReducer from "./Container/Usuarios/store/reducer";
import varsReducer from "./Container/Variables/store/reducer";
import dispsReducer from "./Container/Dispositivos/store/reducer";
import addVarsDispUsers from "./Container/AñadirVarUserDisp/store/reducer";
import constReducer from "./Container/Constantes/store/reducer";

//Redux developer tools Chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Cominación de todos los reducers
const rootreducer = combineReducers({
  users: usersReducer,
  vars: varsReducer,
  disps: dispsReducer,
  addVars: addVarsDispUsers,
  const: constReducer,
});

//Creacion de la store con el middleware(thunk) para utilizar action creators(redex asíncrono)
const store = createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
