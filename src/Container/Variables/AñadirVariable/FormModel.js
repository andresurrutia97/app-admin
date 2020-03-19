export default {
  variable: {
    elementType: "input",
    elementName: "Nombre",
    elementConfig: {
      type: "text",
      placeholder: "Variable"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    fullWidth: false
  },
  unidadMedida: {
    elementType: "select",
    elementName: "Unidad de medida",
    elementConfig: {
      options: []
    },
    value: "",
    validation: {},
    valid: true,
    fullWidth: false
  },
  indicador: {
    elementType: "select",
    elementName: "Indicador",
    elementConfig: {
      options: []
    },
    value: "",
    validation: {},
    valid: true,
    fullWidth: false
  },
  periodicidad: {
    elementType: "select",
    elementName: "Periodicidad",
    elementConfig: {
      options: []
    },
    value: "litros",
    validation: {},
    valid: true,
    fullWidth: false
  },
  reqEvidencia: {
    elementType: "check",
    elementName: "Requiere evidencia",
    elementConfig: {},
    value: false,
    valid: true,
    fullWidth: true
  },
  descripcion: {
    elementType: "textarea",
    elementName: "Descripción",
    elementConfig: {
      type: "text",
      placeholder: "Variable"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    fullWidth: true
  }
};
