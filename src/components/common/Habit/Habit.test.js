import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { act } from "react-dom/test-utils";

import Habit from "./Habit";
import { } from "./Habit.style";

configure({ adapter: new Adapter() });

describe("Habit Component test", () => {
  it("Check Rendering with props(not expired)", () => {
    const wrapper = shallow(<Habit habitData={} currentDate={} isExpired={} width={} />);
    expect(wrapper.find(LoadingTitle).contains("조금만 기다려주세요!")).toBe(true);
  });

  it("Check Rendering with props(expired)", () => {
    const wrapper = shallow(<Habit habitData={} currentDate={} isExpired={} width={} />);
    expect(wrapper.find(LoadingTitle).contains("조금만 기다려주세요!")).toBe(true);
  });
});
