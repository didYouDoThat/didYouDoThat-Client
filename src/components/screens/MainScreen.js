import { StyleSheet, Text, View, Button } from "react-native";
import axios from "../../utils/axiosInstance";
import userAsyncStorage from "../../utils/userAsyncStorage";

const MainScreen = () => {
  const handleLogoutButtonClick = () => {
    axios.defaults.headers.Authorization = undefined;
    userAsyncStorage.removeUserInfo();
  };

  return (
    <View>
      <Text>This is Main</Text>
      <Button title="Logout" onPress={handleLogoutButtonClick}/>
    </View>
  );
};

export default MainScreen;
