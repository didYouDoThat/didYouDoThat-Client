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
  });

  return response.data;
};

habitApi.updateHabitStatus = async ({ habitId, userId }) => {
  const currentLocalDate = new Date();
  const localTimezoneOffset = 24 + currentLocalDate.getTimezoneOffset() / 60;
  
  const response = await axios.put(`/users/${userId}/habits/${habitId}`, {
    localTimezoneOffset,
    currentLocalDate: currentLocalDate.toISOString(),
  });

  // return response.data;
};

habitApi.deleteHabit = async ({ habitId, userId }) => {
  const response = await axios.delete(`/users/${userId}/habits/${habitId}`);

  return response.data;
};

export default habitApi;
