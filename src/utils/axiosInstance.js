import axios from "axios";
import { SERVER_URI } from "@env";

const instance = axios.create({
  baseURL: `${SERVER_URI}`,
  withCredentials: true,
});

export default instance;
