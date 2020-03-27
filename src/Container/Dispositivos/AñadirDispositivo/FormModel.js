export default {
  dispositivo: {
    elementType: "input",
    elementName: "Nombre dispositivo",
    elementConfig: {
      type: "text",
      placeholder: "Dispositivo"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    fullWidth: false
  },
  marca: {
    elementType: "select",
    elementName: "Marca",
    elementConfig: {
      options: []
    },
    value: "",
    validation: {},
    valid: true,
    fullWidth: false
  },
  modelo: {
    elementType: "input",
    elementName: "Modelo",
    elementConfig: {
      type: "text",
      placeholder: "Modelo"
    },
    value: "",
    validation: {
      required: true
    },
    valid: false,
    touched: false,
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
