import React, { useRef } from "react";
import { View } from "react-native";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import CustomButton from "../../common/Button";
import {
  EndHabitScreenContainer,
  EndHabitCapturedArea,
  EndHabitContent,
  EndHabitTitle,
  EndHabitText,
  EndHabitImageContainer,
  EndHabitCatImage,
  EndHabitResultTextImage,
  EndHabitStampImage,
  EndHabitButtonContainer,
} from "./EndHabitScreen.style";

const EndHabitScreen = ({ route, navigation }) => {
  const { habitData } = route.params;
  const isCompleted = habitData.status === 7;

  const captureArea = useRef();

  // console.log(habitData);

  const catpureAndShareScreenShot = async () => {
    const imageUri = await captureArea.current.capture();
    Sharing.shareAsync(imageUri);
  };

  return (
    <EndHabitScreenContainer isCompleted={isCompleted}>
      <ViewShot
        style={{ flex: 2.5, width: "100%", }}
        ref={captureArea}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <EndHabitCapturedArea isCompleted={isCompleted}>
          <EndHabitContent>
            <EndHabitTitle>축하합니다!!!!</EndHabitTitle>
            <EndHabitText>
              {isCompleted
                ? `${habitData.title}은${"\n"}이제 당신의 습관이 될 준비가 되었어요!`
                : `아쉽게 습관으로 만들지 못했네요ㅠㅠ${"\n"}${"\n"}지금 다시 시도해보실래요?`}
            </EndHabitText>
            <EndHabitImageContainer>
              {isCompleted ? (
                <EndHabitResultTextImage
                  source={require("../../../asset/image/success.png")}
                />
              ) : (
                <EndHabitResultTextImage
                  source={require("../../../asset/image/failure.png")}
                />
              )}
              <EndHabitCatImage source={{ uri: habitData.catImage }} />
              {isCompleted ? (
                <EndHabitStampImage
                  source={require("../../../asset/image/stamp.png")}
                />
              ) : null}
            </EndHabitImageContainer>
          </EndHabitContent>
        </EndHabitCapturedArea>
      </ViewShot>
      <EndHabitButtonContainer>
        <CustomButton
          color={isCompleted ? "#f2aaaa" : "#a6dcef"}
          title={isCompleted ? "캡쳐하기" : "다시 해보기"}
          onPress={() => {
            isCompleted
              ? catpureAndShareScreenShot()
              : navigation.navigate("NewHabit");
          }}
        />
        <CustomButton
          color={isCompleted ? "#f2aaaa" : "#a6dcef"}
          title="뒤로 가기"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </EndHabitButtonContainer>
    </EndHabitScreenContainer>
  );
};

export default EndHabitScreen;
