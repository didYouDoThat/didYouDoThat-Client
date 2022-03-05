import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import PropTypes from "prop-types";

import useInform from "../../../utils/informAlert";
import habitApi from "../../../utils/api/habit";
import CustomButton from "../../common/Button";
import {
  NewHabitTitle,
  InputTitleError,
  NewHabitNoticeText,
  NewHabitInput,
  NewHabitDisableTitle,
  NewHabitDisableText,
  NewHabitDisableImage,
} from "./NewHabitScreen.style";
import Modal from "../../common/NewHabitModal/NewHabitModal";

const NewHabitScreen = ({ route, navigation }) => {
  const [habitTitle, setHabitTitle] = useState("");
  const [habitTitleError, setHabitTitleError] = useState("");
  const previousTitle = route.params ? route.params.title : "";

  const inform = useInform();
  const currentDate = new Date();

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");
  const currentHabitList = queryClient
    .getQueryData(["habitList", userInfo.user.id])
    .habitList.filter((habit) => {
      const endDate = new Date(habit.endDate);
      return endDate - currentDate >= 0;
    });

  const { mutate } = useMutation(habitApi.postNewHabit, {
    onSuccess: (data) => {
      navigation.navigate("Result", {
        screen: "StartHabitResult",
        params: { newHabit: data.newHabit },
      });
    },
    onError: (error) => {
      inform({ message: error.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["habitList", userInfo.user.id]);
    },
  });

  const handleMakeHabitButtonClick = () => {
    if (!habitTitle) {
      setHabitTitleError("제목을 꼭 입력해주세요!");
      return;
    }

    mutate({
      title: habitTitle,
      userId: userInfo.user.id,
      currentDate: new Date(),
    });
  };

  return (
    <Modal navigation={navigation}>
      {currentHabitList.length < 5 ? (
        <>
          <NewHabitTitle>새로운 습관을{"\n"}시작하세요!</NewHabitTitle>
          <NewHabitInput
            placeholder="최대 20자 이내 (공백포함)"
            defaultValue={previousTitle}
            maxLength={20}
            onChangeText={(event) => setHabitTitle(event)}
          />
          {habitTitleError ? (
            <InputTitleError>{habitTitleError}</InputTitleError>
          ) : null}
          <NewHabitNoticeText>
            기간은 오늘로부터 일주일 뒤까지{"\n"}자동 설정됩니다.{"\n"}
            {"\n"}
            처음부터 결심한 습관은 그대로!{"\n"}습관을 한번 만들면 다시 수정할
            수 없습니다
          </NewHabitNoticeText>
          <CustomButton
            color="#e36387"
            title="습관 만들기"
            onPress={handleMakeHabitButtonClick}
          />
        </>
      ) : (
        <>
          <NewHabitDisableTitle>
            더 많은 습관은 당분간 금지!
          </NewHabitDisableTitle>
          <NewHabitDisableText>
            한번에 5개의 습관만{"\n"}실천할 수 있습니다
          </NewHabitDisableText>
          <NewHabitDisableImage
            source={require("../../../asset/image/fish.png")}
          />
        </>
      )}
    </Modal>
  );
};

NewHabitScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewHabitScreen;
