import axios from "axios";
import { SERVER_URI } from "@env";

const instance = axios.create({
  // baseURL: `${SERVER_URI}`,
  baseURL: "http://172.20.10.5:8000",
  withCredentials: true,
});

export default instance;
