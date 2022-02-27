import axios from "../axiosInstance";

const authApi = {};

authApi.getLogin = async ({ queryKey }) => {
  const idToken = queryKey[1];

  const response = await axios.get("/login", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

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
