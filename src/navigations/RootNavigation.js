import React, { useEffect, useContext } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import userAsyncStorage from "../utils/userAsyncStorage";
import { UserContext } from "../components/common/userContextProvider";
import LoginScreen from "../components/screens/LoginScreen/LoginScreen";
import ResultScreen from "../components/screens/ResultScreen/ResultScreen";
import HeaderTitle from "../components/common/HeaderTitle";
import MainTabNavigation from "./MainStackNavigation";

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
    <Root.Navigator
      screenOptions={{
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#a6dcef",
          height: 150,
        }
      }}
    >
      {!user.id ? (
        <Root.Group screenOptions={{ headerShown: false }}>
          <Root.Screen name="Login" component={LoginScreen} />
        </Root.Group>
      ) : (
        <Root.Group>
          <Root.Screen name="Main" component={MainTabNavigation} />
          <Root.Screen name="Result" component={ResultScreen} />
        </Root.Group>
      )}
    </Root.Navigator>
  );
};

export default RootStack;
