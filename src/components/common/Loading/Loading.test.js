import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { act } from "react-dom/test-utils";

import LoadingPage from "./Loading";
import { LoadingTitle } from "./Loading.style";

configure({ adapter: new Adapter() });

describe("LoadingPage Component test", () => {
  it("Loading Text should be contained", () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper.find(LoadingTitle).contains("조금만 기다려주세요!")).toBe(true);
  });
});
