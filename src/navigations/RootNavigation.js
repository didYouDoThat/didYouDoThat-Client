import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect } from "react";
import { useState } from "react";

import LoginScreen from "../components/screens/LoginScreen";
import MainScreen from "../components/screens/MainScreen";
import userAsyncStorage from "../utils/userAsyncStorage";

const Root = createNativeStackNavigator();

const RootStack = () => {
  const [loginStatus, setLoginStatus] = useState(false);

  const checkUserStatus = async () => {
    const userData = await userAsyncStorage.getUserInfo();

    if (userData) {
      setLoginStatus(true);
      return;
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, [loginStatus]);

  console.log(loginStatus);

  return (
    <Root.Navigator>
      {!loginStatus ? (
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
