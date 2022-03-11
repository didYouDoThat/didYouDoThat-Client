import AsyncStorage from "@react-native-async-storage/async-storage";

const userAsyncStorage = {};

userAsyncStorage.getSavedInfo = async (storageKeyName) => {
  try {
    const storageSavedData = await AsyncStorage.getItem(storageKeyName);

    if (!storageSavedData) {
      return false;
    }

    const savedData = JSON.parse(storageSavedData);
    return savedData;
  } catch (err) {
    return err;
  }
};

userAsyncStorage.setInfo = (storageKeyName, data) => {
  AsyncStorage.setItem(storageKeyName, JSON.stringify(data));
  return;
};

userAsyncStorage.removeSavedInfo = (storageKeyName) => {
  AsyncStorage.removeItem(storageKeyName);
  return;
};

export default userAsyncStorage;
