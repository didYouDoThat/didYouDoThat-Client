import axios from "axios";

const instance = axios.create({
  baseURL: process.env.SERVER_URI,
  withCredentials: true,
});

export default instance;
