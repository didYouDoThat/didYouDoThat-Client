import React from "react";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

import userAsyncStorage from "../../../utils/userAsyncStorage";
import CustomButton from "../Button";
import {
  StartModalContentContainer,
  StartModalContent,
  StartModalTitle,
  StartModalHabitListContainer,
  StartModalHabitListContent,
  StartModalHabitListImage,
  StartModalHabitListText,
  CancelButtonContainer,
  NotSeeingButtonContainer,
} from "./StartModal.style";

const StartModal = ({ isModalOpen, setIsModalOpen, habitList }) => {
  const setModalClickTime = (event) => {
    event.stopPropagation();

    const currentClickTime = new Date();

    userAsyncStorage.setStartModalButtonClickTime(
      currentClickTime.toISOString()
    );

    setIsModalOpen(false);
  };

  return (
    <Modal
      visible={isModalOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={setIsModalOpen}
    >
      <StartModalContentContainer
        onPress={() => {
          setIsModalOpen(false);
        }}
      >
        <StartModalContent>
          <StartModalTitle>
            오늘은 빼먹지 않고{"\n"}꼭 실행해봅시다!
          </StartModalTitle>
          <StartModalHabitListContainer>
            {habitList.map(({ id, catImage, title }) => (
              <StartModalHabitListContent key={id}>
                <StartModalHabitListImage source={{ uri: `${catImage}` }} />
                <StartModalHabitListText numberOfLines={1}>
                  {title}
                </StartModalHabitListText>
              </StartModalHabitListContent>
            ))}
          </StartModalHabitListContainer>
          <CancelButtonContainer>
            <Feather
              name="x"
              size={24}
              color="black"
              onPress={() => setIsModalOpen(false)}
            />
          </CancelButtonContainer>
          <NotSeeingButtonContainer>
            <CustomButton
              title="24시간동안 그만보기"
              onPress={setModalClickTime}
            />
          </NotSeeingButtonContainer>
        </StartModalContent>
      </StartModalContentContainer>
    </Modal>
  );
};

StartModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  habitList: PropTypes.array.isRequired,
};

export default StartModal;
