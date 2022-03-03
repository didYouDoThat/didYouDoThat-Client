import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import EmptyHabit from "../../common/EmptyHabit";
import Habit from "../../common/Habit/Habit";
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
    await queryClient.refetchQueries(["habitList", userInfo.user.id], {
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

  if (isLoading) {
    return <LoadingScreen />;
  }

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
        {!data.habitList.length ? (
          <EmptyHabit />
        ) : (
          data.habitList.map((habit) => (
            <Habit
              key={habit.id}
              habitData={habit}
              currentDate={currentDateInfo}
              navigation={navigation}
            />
            // <>
            //   <Habit
            //     key={habit.id + 1}
            //     habitData={habit}
            //     currentDate={currentDateInfo}
            //   />
            //   <Habit
            //     key={habit.id}
            //     habitData={habit}
            //     currentDate={currentDateInfo}
            //   />
            // </>
          ))
        )}
      </HabitsContainer>
    </HomeScreenContainer>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func,
  }).isRequired,
};

export default HomeScreen;
