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

userAsyncStorage.getStartModalButtonClickTime = async () => {
  const modalClickTime = await AsyncStorage.getItem("modalClickTime");

  if (!modalClickTime) {
    return false;
  }

  try {
    const clickTime = JSON.parse(modalClickTime);
    return clickTime;
  } catch (err) {
    return err;
  }
}

userAsyncStorage.setUserInfo = (userData) => {
  return AsyncStorage.setItem("userInfo", JSON.stringify(userData));
};

userAsyncStorage.setStartModalButtonClickTime = (clickTime) => {
  return AsyncStorage.setItem("modalClickTime", JSON.stringify(clickTime));
};

userAsyncStorage.removeUserInfo = () => {
  AsyncStorage.removeItem("userInfo");
  AsyncStorage.removeItem("modalClickTime");
  return;
};

export default userAsyncStorage;
