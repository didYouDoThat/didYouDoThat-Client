import axios from "../axiosInstance";
import { QUERY_KEY_NAME } from "../../constants/keyName";

const habitApi = {};

habitApi.getHabitList = async ({ queryKey }) => {
  const userId = queryKey[1];
  const response = await axios.get(`/users/${userId}`);

  return response.data;
};

habitApi.getExpiredSuccessHabitList = async ({ queryKey, pageParam = 1 }) => {
  const status = queryKey[2]
    ? QUERY_KEY_NAME.successQueryString
    : QUERY_KEY_NAME.failureQueryString;
  const userId = queryKey[1];
  const currentLocalDate = new Date();

  const response = await axios.get(
    `/users/${userId}?limit=5&status=${status}&localTime=${currentLocalDate.toISOString()}&page=${pageParam}`
  );

  return response.data;
};

habitApi.postNewHabit = async ({ title, userId, localTimeOffset }) => {
  const response = await axios.post(`/users/${userId}/habit`, {
    title,
    localTimeOffset,
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
