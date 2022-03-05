import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../../common/Button";

import {
  EndHabitScreenContainer,
  EndHabitContent,
  EndHabitTitle,
  EndHabitText,
  EndHabitImageContainer,
  EndHabitCatImage,
  EndHabitResultTextImage,
  EndHabitStampImage,
} from "./EndHabitScreen.style";

const EndHabitScreen = ({ route, navigation }) => {
  const { habitData } = route.params;
  const isCompleted = habitData.status === 7;

  console.log(habitData);

  return (
    <EndHabitScreenContainer isCompleted={isCompleted}>
      <EndHabitContent>
        <EndHabitTitle>{habitData.title}</EndHabitTitle>
        <EndHabitText>
          {isCompleted
            ? `축하합니다!!${"\n"}새로운 습관을 만들 준비가 되셨군요!`
            : `아쉽게 습관으로 만들지 못했네요ㅠㅠ${"\n"}${"\n"}지금 다시 시도해보실래요?`}
        </EndHabitText>
        <EndHabitImageContainer>
          {isCompleted ? (
            <EndHabitResultTextImage
              source={require("../../../asset/image/success.png")}
            />
          ) : (
            <EndHabitResultTextImage
              source={require("../../../asset/image/failure.png")}
            />
          )}
          <EndHabitCatImage source={{ uri: habitData.catImage }} />
          {isCompleted ? (
            <EndHabitStampImage
              source={require("../../../asset/image/stamp.png")}
            />
          ) : null}
        </EndHabitImageContainer>
      </EndHabitContent>
      <CustomButton
        color={isCompleted ? "#f2aaaa" : "#a6dcef"}
        title={isCompleted ? "캡쳐하기" : "다시 해보기"}
        onPress={() => {
          isCompleted
            ? console.log("캡쳐하기")
            : navigation.navigate("NewHabit");
        }}
      />
      <CustomButton
        color={isCompleted ? "#f2aaaa" : "#a6dcef"}
        title="뒤로 가기"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </EndHabitScreenContainer>
  );
};

export default EndHabitScreen;
