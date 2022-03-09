import axios from "axios";
import { SERVER_URI } from "@env";

const instance = axios.create({
  // baseURL: `${SERVER_URI}`,
  baseURL: "http://didyoudothat1-env.eba-sviaqywd.ap-northeast-2.elasticbeanstalk.com/",
  withCredentials: true,
});

export default instance;
