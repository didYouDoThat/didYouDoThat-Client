import React from "react";
import { View, Text, Image } from "react-native";
import { RadioButton } from "react-native-paper";

import styled from "@emotion/native";

const HabitContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  height: 100px;
  margin: 10px;
  padding: 0 10px;
  border: none;
  background-color: #ffffff;
`;

const HabitCatImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const HabitTitle = styled.Text`
  font-size: 25px;
  font-family: "DosGothic";
`;

const Habit = ({ habitData }) => {
  // [
  //   {
  //     "catImage": "https://didyoudothat.s3.ap-northeast-2.amazonaws.com/w1_3.png",
  //     "endDate": "2022-03-03T00:00:00.099Z",
  //     "id": "621ce8f32a3a3ca6871c6e3b",
  //     "title": "물 800ml 마시기",
  //   }
  // ]

  return (
    <HabitContainer>
      <View>
        <RadioButton value="first" />
        <HabitTitle>{habitData.title}</HabitTitle>
      </View>
      <HabitCatImage source={{ uri: habitData.catImage }} />
    </HabitContainer>
  );
};

export default Habit;
