import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import ModalForScreen from "./ModalForScreen";
import { ModalContentContainer } from "./ModalForScreen.style";
import { Text } from "react-native";

configure({ adapter: new Adapter() });

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe("ModalForScreen Component test", () => {
  it("Rendering test for children of this component", () => {
    const wrapper = shallow(
      <ModalForScreen contentHeight="100px">
        <Text>This is Test</Text>
      </ModalForScreen>
    );
    const modalContentContainer = wrapper.find(ModalContentContainer);
    
    expect(
      modalContentContainer.children().at(0).contains("This is Test")
    ).toBe(true);
    expect(modalContentContainer.props().height).toBe("100px");
  });
});
