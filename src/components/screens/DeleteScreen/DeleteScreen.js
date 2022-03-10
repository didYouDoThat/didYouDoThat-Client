import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import useInform from "../../../utils/informAlert";
import habitApi from "../../../utils/api/habit";
import THEME from "../../../constants/theme.style";
import { QUERY_KEY_NAME } from "../../../constants/keyName";
import CustomButton from "../../common/CustomButton/CustomButton";
import ModalForScreen from "../../common/ModalForScreen/ModalForScreen";
import {
  DeleteHabitTitleContainer,
  DeleteHabitTitle,
  DeleteHabitText,
} from "./DeleteScreen.style";

const DeleteScreen = ({ route }) => {
  const { habitData } = route.params;
  const navigation = useNavigation();
  const inform = useInform();

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(QUERY_KEY_NAME.userInfo);

  const { mutate } = useMutation(habitApi.deleteHabit, {
    onSuccess: () => {
      navigation.navigate("Main");
    },
    onError: (error) => {
      inform({ message: error.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        QUERY_KEY_NAME.habitList,
        userInfo.id,
      ]);
    },
  });

  const handleDeleteHabitButtonClick = () => {
    mutate({ habitId: habitData.id, userId: userInfo.id });
  };

  return (
    <ModalForScreen contentHeight="40%">
      <DeleteHabitTitleContainer>
        <DeleteHabitTitle>{habitData.title}</DeleteHabitTitle>
        {"\n"}습관 만들기를{"\n"}그만두실 건가요?
      </DeleteHabitTitleContainer>
      <DeleteHabitText>
        하지만 앞으로 언제든 이 습관을{"\n"}다시 시작할 수 있습니다!
      </DeleteHabitText>
      <CustomButton
        color={THEME.mainColor}
        title="습관 종료하기"
        onPress={handleDeleteHabitButtonClick}
      />
    </ModalForScreen>
  );
};

DeleteScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      habitData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default DeleteScreen;
