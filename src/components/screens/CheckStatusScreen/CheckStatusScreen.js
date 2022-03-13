import React from "react";
import { View, Text, Image } from "react-native";

import PropTypes from "prop-types";

import useGetDateInfo from "../../../utils/useGetDateInfo";
import ModalForScreen from "../../common/ModalForScreen/ModalForScreen";
import {
  CheckHabitTitle,
  CheckHabitDateContainer,
  CheckHabitDate,
  CheckHabitStatusImage,
} from "./CheckStatusScreen.style";

const CheckStatusScreen = ({ route }) => {
  const { habitData } = route.params;

  return (
    <ModalForScreen contentHeight="55%" >
      <CheckHabitTitle>
        {habitData.title}
        {"\n"}언제 하셨나요?
      </CheckHabitTitle>
      {habitData.dateList.map((dateStatus, index) => {
        const [fullYear, fullMonth, fullDate] = useGetDateInfo(
          new Date(dateStatus.date)
        );
        return (
          <CheckHabitDateContainer key={index}>
            <CheckHabitDate>
              {fullYear}년 {fullMonth}월 {fullDate}일
            </CheckHabitDate>
            {dateStatus.isChecked ? (
              <CheckHabitStatusImage
                source={require("../../../asset/image/myPage/successListTab.png")}
              />
            ) : (
              <CheckHabitStatusImage
                source={require("../../../asset/image/myPage/failureListTab.png")}
              />
            )}
          </CheckHabitDateContainer>
        );
      })}
    </ModalForScreen>
  );
};

CheckStatusScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      habitData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        dateList: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CheckStatusScreen;
