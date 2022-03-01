import React from "react";
import { View, Text, Image } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

import styled from "@emotion/native";

const HabitContentContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
  width: 90%;
  height: 100px;
  margin: 20px auto;
  padding: 0 10px 0 20px;
  border-radius: 10px;
  background-color: #ffffff;
`;

const HabitTextContainer = styled.View`
  /* 체크되면 전체 줄 그어지기 */
  width: 60%;
`;

const HabitCatImage = styled.Image`
  width: 70px;
  height: 70px;
  margin-right: 70px;
`;

const HabitStatusContainer = styled.View`
  position: absolute;
  right: 15px;
  bottom: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const HabitStatusImage = styled.Image`
  width: 30px;
  height: 30px;
`;

const HabitStatusText = styled.Text`
  font-size: 17px;
  font-family: "DosGothic";
`;

const HabitTitle = styled.Text`
  height: 60px;
  overflow: visible;
  font-size: 21px;
  font-family: "DosGothic";
`;

const HabitEndDate = styled.Text`
  font-size: 16px;
  font-family: "DosGothic";
`;

const DeleteButtonContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
`;

const Habit = ({ habitData }) => {
  // [
  //   {
  //     "catImage": "https://didyoudothat.s3.ap-northeast-2.amazonaws.com/w1_3.png",
  //     "endDate": "2022-03-03T00:00:00.099Z",
  //     "id": "621ce8f32a3a3ca6871c6e3b",
  //     "status": 2,
  //     "title": "물 800ml 마시기",
  //   }
  // ]
  const localEndDate = new Date(habitData.endDate);
  const fullYear = localEndDate.getFullYear();
  const fullMonth = localEndDate.getMonth() + 1;
  const fullDate = localEndDate.getDate();

  return (
    <HabitContentContainer onPress={() => console.log("container!")}>
      <HabitTextContainer>
        {/* <HabitTitle>{habitData.title}{habitData.title}</HabitTitle> */}
        <HabitTitle>안녕하세요안녕하세요안녕하세요</HabitTitle>
        <HabitEndDate>종료일: {fullYear}년 {fullMonth}월 {fullDate}일</HabitEndDate>
      </HabitTextContainer>
      <HabitCatImage source={{ uri: habitData.catImage }} />
      <HabitStatusContainer>
        <HabitStatusImage source={require("../../asset/image/status.png")} />
        <HabitStatusText>X {habitData.status}</HabitStatusText>
      </HabitStatusContainer>
    <DeleteButtonContainer>
      <Feather name="x" size={24} color="black" onPress={() => console.log("hello")}/>
    </DeleteButtonContainer>
    </HabitContentContainer>
  );
};

export default Habit;
