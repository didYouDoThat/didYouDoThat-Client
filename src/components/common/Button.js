import React from "react";
import { TouchableOpacity } from "react-native";

import styled from "@emotion/native";
import PropTypes from "prop-types";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "250px"};
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color || props.theme.subStrongColors};
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.white};
  font-size: 20px;
  font-family: ${(props) => props.theme.mainFont};
`;

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
