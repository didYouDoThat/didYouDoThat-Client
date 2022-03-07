import React from "react";
import { TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

import { ButtonContainer, ButtonText } from "./CustomButton.style";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
const noop = () => {};

const CustomButton = ({ width, color, title = "클릭!", onPress = noop }) => {
  return (
    <ButtonContainer width={width} color={color} onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

CustomButton.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default CustomButton;
