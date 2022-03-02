import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StartHabitScreen from "../components/screens/StartHabitScreen/StartHabitScreen";
import SuccessResultScreen from "../components/screens/SuccessScreen/SuccessScreen";
import FailureResultScreen from "../components/screens/FailureScreen/FailureScreen";

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
        name="SuccessResult"
        component={SuccessResultScreen}
      />
      <ResultScreenStack.Screen
        name="FailureResult"
        component={FailureResultScreen}
      />
    </ResultScreenStack.Navigator>
  );
};

export default ResultStackNavigation;
