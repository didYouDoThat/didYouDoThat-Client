import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../components/screens/HomeScreen/HomeScreen";
import MyPageScreen from "../components/screens/MyPageScreen/MyPageScreen";
import THEME from "../constants/theme.style";

const MainTab = createMaterialBottomTabNavigator();
const AddNewHabit = () => {
  return null;
};

const MainTabNavigation = () => {
  return (
    <MainTab.Navigator
      shifting={true}
      barStyle={{
        justifyContent: "center",
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: false,
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
            <View
              style={{
                width: 30,
                height: 30,
              }}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={30}
                color={focused ? THEME.gray : THEME.white}
              />
            </View>
          );
        },
      })}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarColor: THEME.homeFocusedBackground,
        }}
      />
      <MainTab.Screen
        name="New"
        component={AddNewHabit}
        options={{
          tabBarColor: THEME.subStrongColor,
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("NewHabit");
          },
        })}
      />
      <MainTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarColor: THEME.myPageFocusedBackground,
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigation;
