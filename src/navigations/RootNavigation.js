import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import userAsyncStorage from "../utils/userAsyncStorage";

import { UserContext } from "../components/common/userContextProvider";
import HeaderTitle from "../components/common/HeaderTitle/HeaderTitle";
import LoginScreen from "../components/screens/LoginScreen/LoginScreen";
import NewHabitScreen from "../components/screens/NewHabitScreen/NewHabitScreen";
import DeleteScreen from "../components/screens/DeleteScreen/DeleteScreen";
import AlarmScreen from "../components/screens/AlarmScreen/AlarmScreen";
import THEME from "../constants/theme.style";
import { STORAGE_KEY_NAME } from "../constants/keyName";

import MainTabNavigation from "./MainTabNavigation";
import ResultStackNavigation from "./ResultStackNavigation";

const Root = createNativeStackNavigator();

const RootStack = () => {
  const { user, setUser } = useContext(UserContext);

  const checkUserStatus = async () => {
    const userData = await userAsyncStorage.getSavedInfo(
      STORAGE_KEY_NAME.userInfo
    );

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
          backgroundColor: THEME.mainColor,
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
          <Root.Group
            screenOptions={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          >
            <Root.Screen name="NewHabit" component={NewHabitScreen} />
            <Root.Screen name="Delete" component={DeleteScreen} />
            <Root.Screen name="Alarm" component={AlarmScreen} />
          </Root.Group>
          <Root.Screen
            name="Result"
            component={ResultStackNavigation}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
        </>
      )}
    </Root.Navigator>
  );
};

export default RootStack;
