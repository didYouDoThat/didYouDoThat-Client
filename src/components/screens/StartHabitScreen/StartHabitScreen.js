import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../../common/Button";

const StartHabitScreen = ({ navigation }) => {
  return (
    <View>
      <Text>냥냥이 배정 공간</Text>
      <CustomButton title="메인화면으로" onPress={() => navigation.navigate("Main", { screen: "Home" }) }/>
    </View>
  )
};

export default StartHabitScreen;
