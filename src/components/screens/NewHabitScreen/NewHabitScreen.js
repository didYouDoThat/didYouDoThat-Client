import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import habitApi from "../../../utils/api/habit";
import CustomButton from "../../common/Button";
import {
  NewHabitContainer,
  NewHabitBackground,
  NewHabitContent,
  NewHabitTitle,
  NewHabitNoticeText,
  NewHabitInput,
  CancelNewHabitButtonContainer,
} from "./NewHabitScreen.style";

const NewHabitScreen = ({ navigation }) => {
  //debounce 걸기
  const [habitTitle, setHabitTitle] = useState("");
  const [habitTitleError, setHabitTitleError] = useState("");

  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");

  const handleGoBackClick = () => {
    navigation.goBack();
  };

  const handleMakeHabitButtonClick = () => {
    console.log(habitTitle);
    if (!habitTitle) {
      setHabitTitleError("제목을 꼭 입력해주세요!");
    }

    console.log(userInfo);
    // mutate({ title: habitTitle, userId })
  };

  const { mutate, isLoading } = useMutation(habitApi.postNewHabit, {
    onSuccess: (data) => {
      navigation.navigate("Result", { screen: "StartHabitResult" });
    },
  });

  return (
    <NewHabitContainer>
      <NewHabitBackground onPress={handleGoBackClick} />
      <NewHabitContent>
        <NewHabitTitle>새로운 습관을{"\n"}시작하세요!</NewHabitTitle>
        <NewHabitInput
          placeholder="최대 20자 이내 (공백포함)"
          maxLength={20}
          onChangeText={(event) => setHabitTitle(event)}
        />
        {habitTitleError ? <Text>{habitTitleError}</Text> : null}
        <NewHabitNoticeText>
          "기간은 오늘로부터 일주일 뒤까지{"\n"}자동 설정됩니다."{"\n"}
          {"\n"}
          "처음부터 결심한 습관은 그대로!{"\n"}습관을 한번 만들면 다시 수정할 수
          없습니다"
        </NewHabitNoticeText>
        <CustomButton
          color="#e36387"
          title="습관 만들기"
          onPress={handleMakeHabitButtonClick}
        />
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

export default NewHabitScreen;
