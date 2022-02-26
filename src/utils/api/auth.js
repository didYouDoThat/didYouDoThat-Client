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
  //   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWE3OGE3NzI1YWMwMDI2MzZjZjZjNiIsImlhdCI6MTY0NTkwMjI2MSwiZXhwIjoxNzMyMzAyMjYxfQ.o0Eh2pcZJ7fH_tSL7poCL_8yZAAv0diWKkifANwgMgM",
  //   "user": Object {
  //     "id": "621a78a7725ac002636cf6c6",
  //     "name": "JISOO OK",
  //   },
  // }
};

authApi.getLogout = async () => {
  const response = await axios.get("/logout");

  console.log(response);
  return response.data;
};

export default authApi;
