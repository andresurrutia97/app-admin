import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Hoc/Layout/Layout";
import Usuarios from "./Container/Usuarios/Usuarios";
import Variables from "./Container/Variables/Variables";
import Dispositivos from "./Container/Dispositivos/Dispositivos";
import Datos from "./Container/Datos/Datos";
import Evidencias from "./Container/Evidencias/Evidencias";
import Constantes from "./Container/Constantes/Constantes";
import Calculadoras from "./Container/Calculadoras/Calculadoras";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/usuarios" component={Usuarios} />
          <Route path="/variables" component={Variables} />
          <Route path="/dispositivos" component={Dispositivos} />
          <Route path="/datos" component={Datos} />
          <Route path="/evidencias" component={Evidencias} />
          <Route path="/constantes" component={Constantes} />
          <Route path="/calculadoras" component={Calculadoras} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
