import React from "react";

import PropTypes from "prop-types";

import useGetDateInfo from "../../../utils/useGetDateInfo";
import changeServerEndDateIntoLocalDate from "../../../utils/changeServerDateIntoLocalDate";
import CustomButton from "../../common/Button";
import {
  StartHabitContainer,
  StartHabitTitle,
  StartHabitImage,
  StartHabitNoticeText,
  StartHabitHelloImage,
  StartHabitEndDate,
} from "./StartHabitScreen.style";
import THEME from "../../../constants/theme.style";

const StartHabitScreen = ({ route, navigation }) => {
  const { newHabit } = route.params;

  const newHabitEndLocalDate = changeServerEndDateIntoLocalDate(
    newHabit.endDate
  );
  const [fullYear, fullMonth, fullDate] = useGetDateInfo(newHabitEndLocalDate);

  return (
    <StartHabitContainer>
      <StartHabitTitle>
        {newHabit.title}
        {"\n"}습관을 시작하셨군요!
      </StartHabitTitle>
      <StartHabitNoticeText>
        새로운 습관을 열심히 지켜서{"\n"}이 고양이를 행복하게 만들어주세요!!
      </StartHabitNoticeText>
      <StartHabitHelloImage
        source={require("../../../asset/image/hello.png")}
      />
      <StartHabitImage source={{ uri: newHabit.catImage }} />
      <CustomButton
        color={THEME.mainStrongColor}
        title="메인화면으로"
        onPress={() => navigation.navigate("Main", { screen: "Home" })}
      />
      <StartHabitEndDate>
        종료일은 {fullYear}년 {fullMonth}월 {fullDate}일 00시입니다
      </StartHabitEndDate>
    </StartHabitContainer>
  );
};

StartHabitScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      newHabit: PropTypes.shape({
        endDate: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        catImage: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default StartHabitScreen;
