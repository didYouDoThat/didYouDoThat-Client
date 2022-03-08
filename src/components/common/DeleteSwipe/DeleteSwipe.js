import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { DeleteSwipeContainer } from "./DeleteSwipe.style";
import THEME from "../../../constants/theme.style";

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

export default DeleteSwipe;
