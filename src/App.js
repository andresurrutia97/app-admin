import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Layout from "./Hoc/Layout/Layout";
import Routes from "./Routes";
import InfoDispositivo from "./Container/Dispositivos/InfoDispositivo/InfoDispositivo";

//creacion de estilos para modificar la fuente de Material UI - uso de ThemeProvider
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/usuarios" />} />
          {Routes.map((rt, index) => {
            return (
              <Route key={index} path={rt.path} component={rt.component} />
            );
          })}
          <Route path="/infoDispo" exact component={InfoDispositivo} />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
