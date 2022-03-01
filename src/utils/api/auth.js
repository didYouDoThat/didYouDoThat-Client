import axios from "../axiosInstance";

const authApi = {};

authApi.postLogin = async ({ idToken }) => {
  const response = await axios.post("/login", { idToken });
  return response.data;
};

export default authApi;
