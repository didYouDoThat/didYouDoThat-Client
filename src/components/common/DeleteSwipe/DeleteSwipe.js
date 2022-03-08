import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import THEME from "../../../constants/theme.style";
import { DeleteSwipeContainer } from "./DeleteSwipe.style";

const DeleteSwipe = ({ habitData }) => {
  const navigation = useNavigation();

  return (
    <DeleteSwipeContainer
      onPress={() => navigation.navigate("Delete", { habitData })}
    >
      <Feather name="trash" size={35} color={THEME.white} />
    </DeleteSwipeContainer>
  );
};

DeleteSwipe.propTypes = {
  habitData: PropTypes.object.isRequired,
};

export default DeleteSwipe;
