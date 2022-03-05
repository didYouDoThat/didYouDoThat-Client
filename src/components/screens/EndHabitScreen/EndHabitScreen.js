import React, { useRef } from "react";
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
  EndhabitBackground,
  EndHabitButtonContainer,
} from "./EndHabitScreen.style";

const EndHabitScreen = ({ route, navigation }) => {
  const { habitData } = route.params;

  const isCompleted = habitData.status === 7;
  const captureArea = useRef();

  const catpureAndShareScreenShot = async () => {
    const imageUri = await captureArea.current.capture();
    Sharing.shareAsync(imageUri);
  };

  return (
    <EndHabitScreenContainer isCompleted={isCompleted}>
      <ViewShot
        style={{ flex: 2.5, width: "100%" }}
        ref={captureArea}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <EndHabitCapturedArea isCompleted={isCompleted}>
          <EndHabitContent>
            <EndHabitTitle>
              {isCompleted ? "축하합니다!!!!" : "조금만 더..!"}
            </EndHabitTitle>
            <EndHabitText>
              {isCompleted
                ? `${
                    habitData.title
                  }은${"\n"}이제 당신의 습관이 될 준비가 되었어요!`
                : `${
                    habitData.title
                  }을${"\n"}아쉽게 습관으로 만들지 못했네요ㅠㅠ`}
            </EndHabitText>
            <EndHabitImageContainer>
              {isCompleted ? (
                <EndHabitResultTextImage
                  source={require("../../../asset/image/successText.png")}
                />
              ) : (
                <EndHabitResultTextImage
                  source={require("../../../asset/image/failureText.png")}
                />
              )}
              <EndHabitCatImage source={{ uri: habitData.catImage }} />
              {isCompleted && (
                <EndHabitStampImage
                  source={require("../../../asset/image/stamp.png")}
                />
              )}
            </EndHabitImageContainer>
          </EndHabitContent>
          {isCompleted ? (
            <EndhabitBackground
              resizeMode="cover"
              source={require("../../../asset/image/successBackground.png")}
            />
          ) : (
            <EndhabitBackground
              resizeMode="cover"
              source={require("../../../asset/image/failureBackground.png")}
            />
          )}
        </EndHabitCapturedArea>
      </ViewShot>
      <EndHabitButtonContainer isCompleted={isCompleted}>
        <CustomButton
          color={isCompleted ? "#f2aaaa" : "#a6dcef"}
          title={isCompleted ? "캡쳐하기" : "다시 해보기"}
          onPress={() => {
            isCompleted
              ? catpureAndShareScreenShot()
              : navigation.navigate("NewHabit", { title: habitData.title });
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
