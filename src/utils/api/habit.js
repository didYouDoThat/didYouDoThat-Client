import axios from "../axiosInstance";

const habitApi = {};

habitApi.getHabitList = async ({ queryKey }) => {
  const userId = queryKey[1];
  const response = await axios.get(`/users/${userId}`);

  return response.data;
};

habitApi.postNewHabit = async ({ title, userId, currentDate }) => {
  const response = await axios.post(`/users/${userId}/habit`, {
    title,
    currentDate,
  });

  return response.data;
};

habitApi.updateHabitStatus = async ({ habitId, userId }) => {
  const currentLocalDate = new Date();
  
  const response = await axios.put(`/users/${userId}/habits/${habitId}`, {
    currentLocalDate: currentLocalDate.toISOString(),
  });

  return response.data;
};

habitApi.deleteHabit = async ({ habitId, userId }) => {
  const response = await axios.delete(`/users/${userId}/habits/${habitId}`);

  return response.data;
};

export default habitApi;
