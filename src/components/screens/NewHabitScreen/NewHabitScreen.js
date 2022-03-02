import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import useInform from "../../../utils/informAlert";
import habitApi from "../../../utils/api/habit";
import CustomButton from "../../common/Button";
import {
  NewHabitContainer,
  NewHabitBackground,
  NewHabitContent,
  NewHabitTitle,
  InputTitleError,
  NewHabitNoticeText,
  NewHabitInput,
  NewHabitDisableTitle,
  NewHabitDisableText,
  NewHabitDisableImage,
  CancelNewHabitButtonContainer,
} from "./NewHabitScreen.style";

const NewHabitScreen = ({ navigation }) => {
  const [habitTitle, setHabitTitle] = useState("");
  const [habitTitleError, setHabitTitleError] = useState("");

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

  const handleGoBackClick = () => {
    navigation.goBack();
  };

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

    mutate({ title: habitTitle, userId: userInfo.user.id });
  };

  return (
    <NewHabitContainer>
      <NewHabitBackground onPress={handleGoBackClick} />
      <NewHabitContent>
        {currentHabitList.length < 5 ? (
          <>
            <NewHabitTitle>새로운 습관을{"\n"}시작하세요!</NewHabitTitle>
            <NewHabitInput
              placeholder="최대 20자 이내 (공백포함)"
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
        <CancelNewHabitButtonContainer>
          <Feather
            name="x"
            size={24}
            color="black"
            onPress={handleGoBackClick}
          />
        </CancelNewHabitButtonContainer>
      </NewHabitContent>
    </NewHabitContainer>
  );
};

NewHabitScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewHabitScreen;
