import React from "react";
import { Pressable, Modal, Text, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import PropTypes from "prop-types";

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
import CustomButton from "../Button";

const StartModal = ({ isModalOpen, setIsModalOpen, unDohabitList }) => {
  console.log(unDohabitList);

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
            {unDohabitList.map(({ id, catImage, title }) => (
              <StartModalHabitListContent key={id}>
                <StartModalHabitListImage source={{ uri: `${catImage}` }} />
                <StartModalHabitListText
                  numberOfLines={1}
                >{title}</StartModalHabitListText>
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
              onPress={(event) => {
                event.stopPropagation();
                console.log("here~~~~");
              }}
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
};

export default StartModal;
