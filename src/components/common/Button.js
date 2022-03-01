import React from "react";
import { TouchableOpacity } from "react-native";

import styled from "@emotion/native";
import PropTypes from "prop-types";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color || "#f2aaaa"};
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-family: "DungGeunMo";
`;

const noop = () => {};

const CustomButton = ({ color, title = "클릭!", onPress = noop }) => {
  return (
    <ButtonContainer color={color} onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

CustomButton.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default CustomButton;
