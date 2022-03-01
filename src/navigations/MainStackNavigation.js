import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../components/screens/HomeScreen/HomeScreen";
import NewHabitScreen from "../components/screens/NewHabitScreen/NewHabitScreen";
import MyPageScreen from "../components/screens/MyPageScreen/MyPageScreen";

const MainTab = createBottomTabNavigator();

const MainTabNavigation = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: "#a6dcef",
          height: 70,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "New":
              iconName = "plus-circle";
              break;
            case "MyPage":
              iconName = "cat";
              break;
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={30}
              color={focused ? "#e36387" : "#000000"}
            />
          );
        },
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="New" component={NewHabitScreen} />
      <MainTab.Screen name="MyPage" component={MyPageScreen} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigation;
