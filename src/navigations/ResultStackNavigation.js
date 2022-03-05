import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartHabitScreen from "../components/screens/StartHabitScreen/StartHabitScreen";
import EndHabitScreen from "../components/screens/EndHabitScreen/EndHabitScreen";

const ResultScreenStack = createNativeStackNavigator();

const ResultStackNavigation = () => {
  return (
    <ResultScreenStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ResultScreenStack.Screen
        name="StartHabitResult"
        component={StartHabitScreen}
      />
      <ResultScreenStack.Screen
        name="EndHabitResult"
        component={EndHabitScreen}
      />
    </ResultScreenStack.Navigator>
  );
};

export default ResultStackNavigation;
