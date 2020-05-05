export default {
  constante: {
    elementType: "input",
    elementName: "Constante",
    elementConfig: {
      type: "text",
      placeholder: "Constante",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    fullWidth: false,
  },
  valor: {
    elementType: "input",
    elementName: "Valor",
    elementConfig: {
      type: "text",
      placeholder: "Valor",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    fullWidth: false,
  },
  unidadMedida: {
    elementType: "select",
    elementName: "Unidad de medida",
    elementConfig: {
      options: [],
    },
    value: "",
    validation: {},
    valid: true,
    fullWidth: false,
  },
  descripcion: {
    elementType: "textarea",
    elementName: "Descripción",
    elementConfig: {
      type: "text",
      placeholder: "Variable",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
    fullWidth: true,
  },
};
