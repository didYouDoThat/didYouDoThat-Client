import React from "react";
import { Text } from "react-native";

import CustomButton from "../../common/Button";
import {
  StartHabitContainer,
  StartHabitTitle,
  StartHabitImage,
  StartHabitNoticeText,
  StartHabitHelloImage,
  StartHabitEndDate,
} from "./StartHabitScreen.style";

const StartHabitScreen = ({ route, navigation }) => {
  const { newHabit } = route.params;

  const newHabitEndLocaleDate = new Date(newHabit.endDate);
  const fullYear = newHabitEndLocaleDate.getFullYear();
  const fullMonth = newHabitEndLocaleDate.getMonth() + 1;
  const fullDate = newHabitEndLocaleDate.getDate();

  return (
    <StartHabitContainer>
      <StartHabitTitle>"{newHabit.title}"{"\n"}습관을 시작하셨군요!</StartHabitTitle>
      <StartHabitNoticeText>이 고양이가{"\n"}당신의 새로운 습관 지키미가{"\n"}되었습니다</StartHabitNoticeText>
      <StartHabitHelloImage source={require("../../../asset/image/hello.png")}/>
      <StartHabitImage source={{ uri: newHabit.catImage }}/>
      <CustomButton
        color="#e36387"
        title="메인화면으로"
        onPress={() => navigation.navigate("Main", { screen: "Home" })}
      />
      <StartHabitEndDate>종료일은 {fullYear}년 {fullMonth}월 {fullDate}일 입니다</StartHabitEndDate>
    </StartHabitContainer>
  );
};

export default StartHabitScreen;
