import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import StartModal from "./StartModal";
import {
  StartModalTitle,
  StartModalHabitListImage,
  CancelButtonContainer,
} from "./StartModal.style";

configure({ adapter: new Adapter() });

const cacheData = {};
jest.mock("@react-native-async-storage/async-storage", () => ({
  mockAsyncStorage: {
    setInfo: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        cacheData[item] = value;
        resolve(value);
      });
    }),
  },
}));

describe("StartModal Component test", () => {
  const MOCK_HABITLIST = [
    {
      id: "mockId",
      title: "mock data title",
      catImage:
        "https://didyoudothat.s3.ap-northeast-2.amazonaws.com/white/w1_0.png",
    },
    {
      id: "mockId2",
      title: "mock data title2",
      catImage:
        "https://didyoudothat.s3.ap-northeast-2.amazonaws.com/white/w1_5.png",
    },
  ];
  const MOCK_CLOSE_MODAL = jest.fn();

  it("StartModal Title Text should be contained", () => {
    const wrapper = shallow(
      <StartModal
        isModalOpen={true}
        setIsModalOpen={MOCK_CLOSE_MODAL}
        habitList={MOCK_HABITLIST}
      />
    );

    expect(wrapper.find(StartModalTitle).contains(`오늘은 빼먹지 않고`)).toBe(
      true
    );
    expect(wrapper.find(StartModalTitle).contains(`꼭 실행해봅시다!`)).toBe(
      true
    );
  });

  it("Check rendering title and image of habitList in modal", () => {
    const wrapper = shallow(
      <StartModal
        isModalOpen={true}
        setIsModalOpen={MOCK_CLOSE_MODAL}
        habitList={MOCK_HABITLIST}
      />
    );

    const firstCatImage = wrapper.find(StartModalHabitListImage).at(0);
    expect(firstCatImage.props()["source"]["uri"]).toBe(
      MOCK_HABITLIST[0].catImage
    );

    const secondCatImage = wrapper.find(StartModalHabitListImage).at(1);
    expect(secondCatImage.props()["source"]["uri"]).toBe(
      MOCK_HABITLIST[1].catImage
    );
  });

  it("Click close button", async () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <StartModal
        isModalOpen={true}
        setIsModalOpen={mockCallback}
        habitList={MOCK_HABITLIST}
      />
    );

    const cancelButton = wrapper.find(CancelButtonContainer).children();
    cancelButton.simulate("press");
    expect(mockCallback.mock.calls.length).toEqual(1);
  });
});
