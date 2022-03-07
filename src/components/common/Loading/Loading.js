import React, { useEffect, useState } from "react";
import { View } from "react-native";

import NUMBERS from "../../../constants/numbers";
import {
  LoadingContainer,
  LoadingTitle,
  LoadingImageContainer,
  LoadingImage,
} from "./Loading.style"

const LoadingPage = () => {
  const [footPrintImages, setFootPrintImages] = useState([]);
  const footPrintImage = (
    <LoadingImage source={require("../../../asset/image/loading.png")} />
  );

  useEffect(() => {
    const loadingImages = setInterval(() => {
      footPrintImages.length === NUMBERS.loadingMaxLength
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

export default LoadingPage;
