import axios from "../axiosInstance";

const authApi = {};

authApi.postLogin = async ({ idToken }) => {
  const response = await axios.post("/login", { idToken });
  return response.data;
  // Object {
  //   "token": "asdfasdf",
  //   "user": Object {
  //     "id": "asdfasdf",
  //     "name": "JISOO OK",
  //   },
  // }
};

export default authApi;
