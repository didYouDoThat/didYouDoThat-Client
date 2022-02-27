import { useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "../components/common/userContextProvider";
import LoginScreen from "../components/screens/LoginScreen";
import MainScreen from "../components/screens/MainScreen";
import userAsyncStorage from "../utils/userAsyncStorage";

const Root = createNativeStackNavigator();

const RootStack = () => {
  const { user, setUser } = useContext(UserContext);

  const checkUserStatus = async () => {
    const userData = await userAsyncStorage.getUserInfo();

    if (userData) {
      setUser(userData.user);
      return;
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <Root.Navigator>
      {!user.id ? (
        <Root.Group screenOptions={{ headerShown: false }}>
          <Root.Screen name="Login" component={LoginScreen} />
        </Root.Group>
      ) : (
        <Root.Group>
          <Root.Screen name="Main" component={MainScreen} />
        </Root.Group>
      )}
    </Root.Navigator>
  );
};

export default RootStack;
