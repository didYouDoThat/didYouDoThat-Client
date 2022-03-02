import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import userAsyncStorage from "../utils/userAsyncStorage";

import { UserContext } from "../components/common/userContextProvider";
import HeaderTitle from "../components/common/HeaderTitle";
import LoginScreen from "../components/screens/LoginScreen/LoginScreen";
import NewHabitScreen from "../components/screens/NewHabitScreen/NewHabitScreen";
import MainTabNavigation from "./MainTabNavigation";
import ResultStackNavigation from "./ResultStackNavigation";

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
        },
      }}
    >
      {!user?.id ? (
        <Root.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Root.Screen name="Main" component={MainTabNavigation} />
          <Root.Screen
            name="NewHabit"
            component={NewHabitScreen}
            options={{ presentation: "transparentModal", headerShown: false }}
          />
          <Root.Screen
            name="Result"
            component={ResultStackNavigation}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Root.Navigator>
  );
};

export default RootStack;
