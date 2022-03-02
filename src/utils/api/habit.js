import axios from "../axiosInstance";

const habitApi = {};

habitApi.getHabitList = async ({ queryKey }) => {
  const userId = queryKey[1];
  const response = await axios.get(`/users/${userId}`);

  return response.data;
};

habitApi.postNewHabit = async ({ title, userId }) => {
  const response = await axios.post(`/users/${userId}/habit`, {
    title,
    userId,
  });

  return response.data;
};

export default habitApi;
