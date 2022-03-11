import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import CustomButton from "./CustomButton";
import { ButtonContainer, ButtonText } from "./CustomButton.style";

configure({ adapter: new Adapter() });

describe("CustomButton Component test", () => {
  it("Rendering test with props of this component", () => {
    const mockFunction = jest.fn();

    const wrapper = shallow(
      <CustomButton
        width="200px"
        color="red"
        title="Test"
        onPress={mockFunction}
      />
    );

    const buttonContainer = wrapper.find(ButtonContainer);
    expect(buttonContainer.props().width).toBe("200px");
    expect(buttonContainer.props().color).toBe("red");
    expect(buttonContainer.find(ButtonText).contains("Test")).toBe(true);
  });

  it("Check click event with this component", () => {
    const mockFunction = jest.fn();

    const wrapper = shallow(
      <CustomButton
        width="200px"
        color="red"
        title="Test"
        onPress={mockFunction}
      />
    );

    const buttonContainer = wrapper.find(ButtonContainer);
    buttonContainer.simulate("press");
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
