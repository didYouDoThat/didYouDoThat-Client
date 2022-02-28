import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import {
  HomeScreenContainer,
  DateContainer,
  DateText,
  HabitsContainer,
} from "./HomeScreen.style";

const HomeScreen = ({ navigation }) => {
  const initialDateInfo = new Date();
  const [currentDateInfo, setCurrentDateInfo] = useState(initialDateInfo);

  const fullYear = currentDateInfo.getFullYear();
  const fullMonth = currentDateInfo.getMonth() + 1;
  const fullDate = currentDateInfo.getDate();

  useEffect(() => {
    const updateCurrentTime = navigation.addListener("focus", () => {
      const updatedDateInfo = new Date();
      setCurrentDateInfo(updatedDateInfo);
    });

    return updateCurrentTime;
  }, [navigation]);

  return (
    <HomeScreenContainer>
      <DateContainer>
        <DateText>
          {fullYear}년 {fullMonth}월 {fullDate}일의 습관!
        </DateText>
      </DateContainer>
      <HabitsContainer>
        <Text>여기는 렌더링 영역</Text>
      </HabitsContainer>
    </HomeScreenContainer>
  );
};

export default HomeScreen;
