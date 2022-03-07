import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import habitApi from "../../../utils/api/habit";
import useInform from "../../../utils/informAlert";
import changeServerEndDateIntoLocalDate from "../../../utils/changeServerDateIntoLocalDate";
import useGetDateInfo from "../../../utils/useGetDateInfo";
import divideHabitData from "../../../utils/divideHabitData";
import userAsyncStorage from "../../../utils/userAsyncStorage";

import NUMBERS from "../../../constants/numbers";
import { STORAGE_KEY_NAME, QUERY_KEY_NAME } from "../../../constants/keyName";

import EmptyHabit from "../../common/EmptyHabit/EmptyHabit";
import Habit from "../../common/Habit/Habit";
import LoadingPage from "../../common/Loading/Loading";
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
  const userInfo = queryClient.getQueryData(QUERY_KEY_NAME.userInfo);

  const refetchHabitList = async () => {
    await queryClient.refetchQueries(
      [QUERY_KEY_NAME.habitList, userInfo.user.id],
      {
        exact: true,
      }
    );
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
    const modalClickTime = await userAsyncStorage.getSavedInfo(
      STORAGE_KEY_NAME.modalClickTime
    );

    if (
      modalClickTime &&
      currentDateInfo - new Date(modalClickTime) <= NUMBERS.timeForOneDay
    ) {
      setIsStartModalOpen(false);
    }
  }, []);

  const { isLoading, data } = useQuery(
    [QUERY_KEY_NAME.habitList, userInfo.user.id],
    habitApi.getHabitList,
    {
      select: (data) => {
        const activeHabitList = divideHabitData(data.habitList);
        return activeHabitList;
      },
      onError: (error) => {
        inform({ message: error.message });
      },
      cacheTime: NUMBERS.timeForOneDay,
    }
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  const isNotCheckedYesterDayList = data?.filter(({ dateList }) => {
    const targetDate = dateList.find(({ date, isChecked }) => {
      const limitDate = changeServerEndDateIntoLocalDate(date);
      const currentTodayDate = new Date(currentDateInfo);

      if (limitDate.getDate() === currentTodayDate.getDate() && !isChecked) {
        return true;
      }
    });

    return targetDate ? true : false;
  });

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
        {!data?.length ? (
          <EmptyHabit />
        ) : (
          data?.map((habit) => (
            <Habit
              key={habit.id}
              habitData={habit}
              currentDate={currentDateInfo}
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
