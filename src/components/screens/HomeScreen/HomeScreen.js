import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import changeServerEndDateIntoLocalDate from "../../../utils/changeServerDateIntoLocalDate";
import useGetDateInfo from "../../../utils/useGetDateInfo";
import divideHabitData from "../../../utils/divideHabitData";
import userAsyncStorage from "../../../utils/userAsyncStorage";

import EmptyHabit from "../../common/EmptyHabit";
import Habit from "../../common/Habit/Habit";
import LoadingScreen from "../../common/LoadingScreen";
import StartModal from "../../common/StartModal/StartModal";
import {
  HomeScreenContainer,
  DateContainer,
  DateText,
  HabitsContainer,
} from "./HomeScreen.style";

const HomeScreen = ({ navigation }) => {
  const initialDateInfo = new Date();

  const [currentDateInfo, setCurrentDateInfo] = useState(initialDateInfo);
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);
  const [fullYear, fullMonth, fullDate] = useGetDateInfo(currentDateInfo);

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

  useEffect(async () => {
    const modalClickTime =
      await userAsyncStorage.getStartModalButtonClickTime();

    if (
      modalClickTime &&
      currentDateInfo - new Date(modalClickTime) <= 60 * 60 * 24 * 1000
    ) {
      setIsStartModalOpen(false);
    }
  }, []);

  const { isLoading, data } = useQuery(
    ["habitList", userInfo.user.id],
    habitApi.getHabitList,
    {
      onSuccess: (data) => {
        const [activeHabitList, inActiveHabitList] = divideHabitData(data.habitList);

        queryClient.setQueryData(["habitList", "active"], activeHabitList);
        queryClient.setQueryData(["habitList", "inactive"], inActiveHabitList);
        queryClient.setQueryDefaults(["habitList", "active"], {
          cacheTime: 60 * 60 * 24 * 1000,
        });
        queryClient.setQueryDefaults(["habitList", "inactive"], {
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

  const isNotCheckedYesterDayList = activeHabitList?.filter(
    ({ dateList: [{ date, isChecked }] }) => {
      const limitDate = changeServerEndDateIntoLocalDate(date);
      const currentTodayDate = new Date(currentDateInfo);

      if (limitDate.getDate() === currentTodayDate.getDate() && !isChecked) {
        return true;
      }
    }
  );

  return (
    <HomeScreenContainer>
      {isNotCheckedYesterDayList?.length ? (
        <StartModal
          isModalOpen={isStartModalOpen}
          setIsModalOpen={setIsStartModalOpen}
          habitList={isNotCheckedYesterDayList}
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
