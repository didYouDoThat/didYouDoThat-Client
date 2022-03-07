import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import THEME from "../../../constants/theme.style";
import {
  ModalContainer,
  ModalBackground,
  ModalContentContainer,
  CancelButtonContainer,
} from "./ModalForScreen.style";

const ModalForScreen = ({ contentHeight, children }) => {
  const navigation = useNavigation();

  const handleGoBackClick = () => {
    navigation.goBack();
  };

  return (
    <ModalContainer>
      <ModalBackground onPress={handleGoBackClick} />
      <ModalContentContainer width={contentHeight}>
        {children}
        <CancelButtonContainer>
          <Feather
            name="x"
            size={24}
            color={THEME.black}
            onPress={handleGoBackClick}
          />
        </CancelButtonContainer>
      </ModalContentContainer>
    </ModalContainer>
  );
};

ModalForScreen.propTypes = {
  contentHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ModalForScreen;
