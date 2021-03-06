import React, { useEffect, useState, useContext } from "react";
import { Image } from "react-native";
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

import { UserContext } from "../../common/userContextProvider";
import EmptyHabit from "../../common/EmptyHabit/EmptyHabit";
import Habit from "../../common/Habit/Habit";
import LoadingPage from "../../common/Loading/Loading";
import StartModal from "../../common/StartModal/StartModal";
import {
  HomeScreenContainer,
  DateContainer,
  DateText,
  HabitsContainer,
  AboutButtonContainer,
  AboutButtonImage,
} from "./HomeScreen.style";

const HomeScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const initialDateInfo = new Date();

  const [currentDateInfo, setCurrentDateInfo] = useState(initialDateInfo);
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);
  const [fullYear, fullMonth, fullDate] = useGetDateInfo(currentDateInfo);

  const inform = useInform();

  const refetchHabitList = async () => {
    try {
      await queryClient.refetchQueries([QUERY_KEY_NAME.habitList, user.id], {
        exact: true,
      });
    } catch (err) {
      inform({ message: err.message });
    }
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
    try {
      const modalClickTime = await userAsyncStorage.getSavedInfo(
        STORAGE_KEY_NAME.modalClickTime
      );

      if (
        modalClickTime &&
        currentDateInfo - new Date(modalClickTime) <= NUMBERS.timeForOneDay
      ) {
        setIsStartModalOpen(false);
      }
    } catch (err) {
      inform({ message: err.message });
    }
  }, []);

  const { isLoading, data } = useQuery(
    [QUERY_KEY_NAME.habitList, user.id],
    habitApi.getHabitList,
    {
      select: (data) => {
        const activeHabitList = divideHabitData(data.habitList);
        return activeHabitList;
      },
      onError: (error) => {
        inform({ message: error.message });
      },
      onSettled: () => {
        queryClient.invalidateQueries([QUERY_KEY_NAME.habitList, user.id]);
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
          {fullYear}??? {fullMonth}??? {fullDate}?????? ??????!
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
      <AboutButtonContainer onPress={() => navigation.navigate("About")}>
        <AboutButtonImage source={require("../../../asset/image/about.png")} />
      </AboutButtonContainer>
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
