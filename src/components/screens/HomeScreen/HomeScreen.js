import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import divideHabitData from "../../../utils/divideHabitData";
import EmptyHabit from "../../common/EmptyHabit";
import Habit from "../../common/Habit/Habit";
import LoadingScreen from "../../common/LoadingScreen";
import {
  HomeScreenContainer,
  DateContainer,
  DateText,
  HabitsContainer,
} from "./HomeScreen.style";
import StartModal from "../../common/StartModal/StartModal";

const HomeScreen = ({ navigation }) => {
  const initialDateInfo = new Date();
  const [currentDateInfo, setCurrentDateInfo] = useState(initialDateInfo);
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);

  const fullYear = currentDateInfo.getFullYear();
  const fullMonth = currentDateInfo.getMonth() + 1;
  const fullDate = currentDateInfo.getDate();

  const inform = useInform();
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");
  const activeHabitList = queryClient.getQueryData(["habitList", "active"]);

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

  const { isLoading, data } = useQuery(
    ["habitList", userInfo.user.id],
    habitApi.getHabitList,
    {
      onSuccess: (data) => {
        const activeData = divideHabitData(data.habitList);

        queryClient.setQueryData(["habitList", "active"], activeData);
        queryClient.setQueryDefaults(["habitList", "active"], {
          cacheTime: 60 * 60 * 24 * 1000,
        });
      },
      onError: (error) => {
        inform({ message: error.message });
      },
    }
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HomeScreenContainer>
      {isStartModalOpen && activeHabitList?.length? (
        <StartModal
          isModalOpen={isStartModalOpen}
          setIsModalOpen={setIsStartModalOpen}
          unDohabitList={activeHabitList}
        />
      ) : null}
      <DateContainer>
        <DateText>
          {fullYear}년 {fullMonth}월 {fullDate}일의 습관!
        </DateText>
      </DateContainer>
      <HabitsContainer>
        {!activeHabitList?.length ? (
          <EmptyHabit />
        ) : (
          activeHabitList?.map((habit) => (
            <Habit
              key={habit.id}
              habitData={habit}
              currentDate={currentDateInfo}
              navigation={navigation}
            />
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
