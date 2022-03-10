import React, { useRef } from "react";
import { Animated } from "react-native";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import PropTypes from "prop-types";

import useInform from "../../../utils/informAlert";
import THEME from "../../../constants/theme.style";
import NUMBERS from "../../../constants/numbers";
import CustomButton from "../../common/CustomButton/CustomButton";
import {
  EndHabitScreenContainer,
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
  const endHabitBackground = new Animated.Value(0);
  const { habitData } = route.params;

  const isCompleted = habitData.status === NUMBERS.successStatusCount;
  const inform = useInform();
  const captureArea = useRef();

  const catpureAndShareScreenShot = async () => {
    try {
      const imageUri = await captureArea.current.capture();
      Sharing.shareAsync(imageUri);
    } catch (err) {
      inform({ message: err.message });
    }
  };

  Animated.loop(
    Animated.sequence([
      Animated.timing(endHabitBackground, {
        toValue: NUMBERS.endHabitBackgroundEndValue,
        duration: NUMBERS.endHabitBackgroundDuration,
        useNativeDriver: false,
      }),
      Animated.timing(endHabitBackground, {
        toValue: 0,
        duration: NUMBERS.endHabitBackgroundDuration,
        useNativeDriver: false,
      }),
    ])
  ).start();

  const changingBackground = endHabitBackground.interpolate({
    inputRange: [0, NUMBERS.endHabitBackgroundEndValue],
    outputRange: isCompleted
      ? [THEME.subStrongColor, THEME.mainStrongColor]
      : [THEME.mainColor, THEME.subColor],
  });

  return (
    <EndHabitScreenContainer isCompleted={isCompleted}>
      <ViewShot
        style={{ flex: 2.5, width: "100%" }}
        ref={captureArea}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <Animated.View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: -10,
            backgroundColor: changingBackground,
          }}
        >
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
                  source={require("../../../asset/image/result/successText.png")}
                />
              ) : (
                <EndHabitResultTextImage
                  source={require("../../../asset/image/result/failureText.png")}
                />
              )}
              <EndHabitCatImage source={{ uri: habitData.catImage }} />
              {isCompleted && (
                <EndHabitStampImage
                  source={require("../../../asset/image/result/stamp.png")}
                />
              )}
            </EndHabitImageContainer>
          </EndHabitContent>
          {isCompleted ? (
            <EndhabitBackground
              resizeMode="cover"
              source={require("../../../asset/image/result/successBackground.png")}
            />
          ) : (
            <EndhabitBackground
              resizeMode="cover"
              source={require("../../../asset/image/result/failureBackground.png")}
            />
          )}
        </Animated.View>
      </ViewShot>
      <EndHabitButtonContainer isCompleted={isCompleted}>
        <CustomButton
          color={isCompleted ? THEME.subStrongColor : THEME.mainColor}
          title={isCompleted ? "캡쳐하기" : "다시 해보기"}
          onPress={() => {
            isCompleted
              ? catpureAndShareScreenShot()
              : navigation.navigate("NewHabit", { title: habitData.title });
          }}
        />
        <CustomButton
          color={isCompleted ? THEME.subStrongColor : THEME.mainColor}
          title="뒤로 가기"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </EndHabitButtonContainer>
    </EndHabitScreenContainer>
  );
};

EndHabitScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      habitData: PropTypes.shape({
        status: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        catImage: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default EndHabitScreen;
