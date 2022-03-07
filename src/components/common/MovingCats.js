import React from "react";
import { Animated } from "react-native";
import styled from "@emotion/native";

import NUMBERS from "../../constants/numbers";

const MovingCatContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const MovingCats = () => {
  const moveToTop = {
    toValue: -50,
    friction: NUMBERS.loginImageFriction,
    tension: NUMBERS.loginImageTension,
    duration: NUMBERS.loginImageDuration,
    useNativeDriver: true,
  };

  const moveToBottom = {
    toValue: 0,
    friction: NUMBERS.loginImageFriction,
    tension: NUMBERS.loginImageTension,
    duration: NUMBERS.loginImageDuration,
    useNativeDriver: true,
  };

  const firstCat = new Animated.Value(0);
  const secondCat = new Animated.Value(0);
  const thirdCat = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.spring(firstCat, moveToTop),
      Animated.spring(secondCat, moveToTop),
      Animated.spring(thirdCat, moveToTop),
      Animated.spring(firstCat, moveToBottom),
      Animated.spring(secondCat, moveToBottom),
      Animated.spring(thirdCat, moveToBottom),
    ])
  ).start();

  return (
    <MovingCatContainer>
      <Animated.Image
        style={{
          width: 100,
          height: 100,
          transform: [{ translateY: firstCat }],
        }}
        source={require("../../asset/image/loginCats/b1_4.png")}
      />
      <Animated.Image
        style={{
          width: 100,
          height: 100,
          transform: [{ translateY: secondCat }],
        }}
        source={require("../../asset/image/loginCats/g1_4.png")}
      />
      <Animated.Image
        style={{
          width: 100,
          height: 100,
          transform: [{ translateY: thirdCat }],
        }}
        source={require("../../asset/image/loginCats/w1_4.png")}
      />
    </MovingCatContainer>
  );
};

export default MovingCats;
