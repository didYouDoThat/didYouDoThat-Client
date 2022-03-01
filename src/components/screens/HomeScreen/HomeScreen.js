import React, { useEffect, useState, useContext } from "react";
import { Text } from "react-native";
import { useQuery, useQueryClient } from "react-query";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import Habit from "../../common/Habit";
import LoadingScreen from "../../common/LoadingScreen";
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

  const inform = useInform();
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");

  const refetchHabitList = async () => {
    await queryClient.resetQueries(["habitList", userInfo.user.id], {
      exact: true,
    });
  };

  useEffect(() => {
    const updateCurrentTime = navigation.addListener("focus", () => {
      const updatedDateInfo = new Date();
      setCurrentDateInfo(updatedDateInfo);
      refetchHabitList();
    });

    return updateCurrentTime;
  }, [navigation]);

  const { isLoading, data, isError, error } = useQuery(
    ["habitList", userInfo.user.id],
    habitApi.getHabitList
  );

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  if (isError) {
    inform({ message: error.message });
  }

  return (
    <HomeScreenContainer>
      <DateContainer>
        <DateText>
          {fullYear}년 {fullMonth}월 {fullDate}일의 습관!
        </DateText>
      </DateContainer>
      <HabitsContainer>
        {
          !data ? <Text>No data!</Text>
          : data.habitList.map((habit) => 
            <Habit key={habit.id} habitData={habit} />
          )
        }      
      </HabitsContainer>
    </HomeScreenContainer>
  );
};

export default HomeScreen;
