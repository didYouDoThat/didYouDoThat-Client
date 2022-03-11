import axios from "axios";
import { SERVER_URI } from "@env";

const instance = axios.create({
  // baseURL: `${SERVER_URI}`,
  baseURL: "http://192.168.0.11:8000",
  withCredentials: true,
});

export default instance;
