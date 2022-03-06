import React, { useEffect, useState } from "react";
import { View } from "react-native";

import styled from "@emotion/native";

import NUMBERS from "../../constants/numbers";

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingImageContainer = styled.View`
  flex-direction: row;
  height: 70px;
`;

const LoadingImage = styled.Image`
  width: 70px;
  height: 70px;
  padding: 0 20px;
`;

const LoadingTitle = styled.Text`
  font-size: 30px;
  font-family: ${(props) => props.theme.subFont};
`;

const LoadingScreen = () => {
  const [footPrintImages, setFootPrintImages] = useState([]);
  const footPrintImage = (
    <LoadingImage source={require("../../asset/image/loading.png")} />
  );

  useEffect(() => {
    const loadingImages = setInterval(() => {
      footPrintImages.length === 3
        ? setFootPrintImages([])
        : setFootPrintImages(footPrintImages.concat(footPrintImage));
    }, NUMBERS.loadingInterval);

    return () => clearInterval(loadingImages);
  }, [footPrintImages]);

  return (
    <LoadingContainer>
      <LoadingTitle>조금만 기다려주세요!</LoadingTitle>
      <LoadingImageContainer>
        {footPrintImages.map((singleImage, index) => (
          <View key={index}>{singleImage}</View>
        ))}
      </LoadingImageContainer>
    </LoadingContainer>
  );
};

export default LoadingScreen;
