import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import useInform from "../../../utils/informAlert";
import habitApi from "../../../utils/api/habit";
import CustomButton from "../../common/Button";
import Modal from "../../common/Modal.js/Modal";
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
  const userInfo = queryClient.getQueryData("userInfo");
  // const currentHabitList = queryClient
  //   .getQueryData(["habitList", userInfo.user.id])
  //   .habitList.filter((habit) => {
  //     const endDate = new Date(habit.endDate);
  //     return endDate - currentDate >= 0;
  //   });
  // 이거 내장함수 있을 것 같은데..

  // const { mutate } = useMutation(habitApi.postNewHabit, {
  //   onSuccess: (data) => {
  //     navigation.navigate("Result", {
  //       screen: "StartHabitResult",
  //       params: { newHabit: data.newHabit },
  //     });
  //   },
  //   onError: (error) => {
  //     inform({ message: error.message });
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["habitList", userInfo.user.id]);
  //   },
  // });

  const handleDeleteHabitButtonClick = () => {
    console.log("delete");
    console.log(habitData);
    //mutate({ title: habitTitle, userId: userInfo.user.id });
  };

  return (
    // useNavigation 사용해보기
    <Modal contentHeight="40%">
      <DeleteHabitTitleContainer>
        <DeleteHabitTitle>{habitData.title}</DeleteHabitTitle>
        {"\n"}습관 만들기를{"\n"}그만두실 건가요?
      </DeleteHabitTitleContainer>
      <DeleteHabitText>
        하지만 앞으로 언제든 이 습관을{"\n"}다시 시작할 수 있습니다!{"\n"}그동안
        고생많으셨습니다^0^
      </DeleteHabitText>
      <CustomButton
        title="습관 종료하기"
        onPress={handleDeleteHabitButtonClick}
      />
    </Modal>
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
