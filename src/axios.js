import axios from "axios";

const instance = axios.create({
  baseURL: "https://app-admin-campus.firebaseio.com/"
});

export default instance;
