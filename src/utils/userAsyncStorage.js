import AsyncStorage from "@react-native-async-storage/async-storage";

const userAsyncStorage = {};

userAsyncStorage.getUserInfo = async () => {
  const userInfo = await AsyncStorage.getItem("userInfo");

  if (!userInfo) {
    return false;
  }

  try {
    const userData = JSON.parse(userInfo);
    return userData;
  } catch (err) {
    return err;
  }
};

userAsyncStorage.setUserInfo = (userData) => {
  return AsyncStorage.setItem("userInfo", JSON.stringify(userData));
};

userAsyncStorage.removeUserInfo = () => {
  return AsyncStorage.removeItem("userInfo");
};

export default userAsyncStorage;
