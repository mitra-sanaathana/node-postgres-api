import axios from "axios";

const API = axios.create({
  baseURL: "https://yamabiko.proxy.rlwy.net:36946/api",
});

export default API;