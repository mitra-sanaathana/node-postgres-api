import axios from "axios";

const API = axios.create({
  baseURL: "yamabiko.proxy.rlwy.net:36946",
});

export default API;