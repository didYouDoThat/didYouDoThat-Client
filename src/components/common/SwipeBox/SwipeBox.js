import React from "react";
import { useNavigation } from "@react-navigation/native";

import PropTypes from "prop-types";
import { SwipeBoxContainer } from "./SwipeBox.style";

const SwipeBox = ({ habitData, color, screenName, children }) => {
  const navigation = useNavigation();

  return (
    <SwipeBoxContainer
      color={color}
      onPress={() => navigation.navigate(screenName, { habitData })}
    >
      {children}
    </SwipeBoxContainer>
  );
};

SwipeBox.propTypes = {
  habitData: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SwipeBox;
