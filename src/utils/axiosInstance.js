import axios from "axios";
import Config from "react-native-config";

const instance = axios.create({
  baseURL: Config.SERVER_URI,
  withCredentials: true,
});

export default instance;
