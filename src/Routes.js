import Usuarios from "./Container/Usuarios/Usuarios";
import Variables from "./Container/Variables/Variables";
import Dispositivos from "./Container/Dispositivos/Dispositivos";
import Datos from "./Container/Datos/Datos";
import Evidencias from "./Container/Evidencias/Evidencias";
import Constantes from "./Container/Constantes/Constantes";
import Calculadoras from "./Container/Calculadoras/Calculadoras";

export default [
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
    icon: "people_alt"
  },
  {
    path: "/dispositivos",
    name: "Dispositivos",
    component: Dispositivos,
    icon: "devices_other"
  },
  {
    path: "/variables",
    name: "Variables",
    component: Variables,
    icon: "explicit"
  },
  {
    path: "/datos",
    name: "Datos",
    component: Datos,
    icon: "assessment"
  },
  {
    path: "/evidencias",
    name: "Evidencias",
    component: Evidencias,
    icon: "description"
  },
  {
    path: "/constantes",
    name: "Constantes",
    component: Constantes,
    icon: "functions"
  },
  {
    path: "/calculadoras",
    name: "Calculadoras",
    component: Calculadoras,
    icon: "eco"
  }
];
