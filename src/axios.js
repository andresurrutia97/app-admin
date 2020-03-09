import axios from "axios";

//Creación de una instancia de Axios
const instance = axios.create({
  baseURL: "https://app-admin-campus.firebaseio.com/"
});

export default instance;
