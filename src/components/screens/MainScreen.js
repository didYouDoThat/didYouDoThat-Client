import { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { UserContext } from "../common/userContextProvider";
import axios from "../../utils/axiosInstance";
import userAsyncStorage from "../../utils/userAsyncStorage";

const MainScreen = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogoutButtonClick = () => {
    axios.defaults.headers.Authorization = undefined;
    userAsyncStorage.removeUserInfo();
    setUser({
      id: "",
      name: "",
    });
  };

  console.log("여기는 main!", user);

  return (
    <View>
      <Text>This is Main</Text>
      <Button title="Logout" onPress={handleLogoutButtonClick}/>
    </View>
  );
};

export default MainScreen;
