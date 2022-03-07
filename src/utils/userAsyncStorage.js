import AsyncStorage from "@react-native-async-storage/async-storage";

const userAsyncStorage = {};

userAsyncStorage.getSavedInfo = async (storageKeyName) => {
  const storageSavedData = await AsyncStorage.getItem(storageKeyName);

  if (!storageSavedData) {
    return false;
  }

  try {
    const savedData = JSON.parse(storageSavedData);
    return savedData;
  } catch (err) {
    return err;
  }
};

userAsyncStorage.setInfo = (storageKeyName, data) => {
  return AsyncStorage.setItem(storageKeyName, JSON.stringify(data));
};

userAsyncStorage.removeSavedInfo = (storageKeyName) => {
  return AsyncStorage.removeItem(storageKeyName);
};

export default userAsyncStorage;
