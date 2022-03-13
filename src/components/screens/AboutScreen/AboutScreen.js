import React from "react";
import { ScrollView, Dimensions, Image } from "react-native";

import ModalForScreen from "../../common/ModalForScreen/ModalForScreen";
import {
  AboutContentContainer,
  AboutContentTitle,
  AboutContentExplanation,
  AboutContentImage,
} from "./AboutScreen.style";

const AboutScreen = () => {
  const contentWidth = Dimensions.get("screen").width * 0.65;

  return (
    <ModalForScreen>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={contentWidth}
      >
        <AboutContentContainer width={contentWidth}>
          <AboutContentTitle>
            Q1) 고양이는 랜덤으로 지정되나요?
          </AboutContentTitle>
          <AboutContentImage
            source={require("../../../asset/image/headerLogo.png")}
          />
          <AboutContentExplanation>
            고양이는 새로운 습관을 생성할 때 마다, 랜덤으로 지정됩니다.{"\n"}
            {"\n"}
            일주일에 한번씩, 습관을 실천할 때마다 고양이의 기분은 한 단계씩 점점
            좋아집니다.{"\n"}다양한 습관 만들기를 통해서 다양한 고양이들을
            만나보세요!
          </AboutContentExplanation>
        </AboutContentContainer>
        <AboutContentContainer width={contentWidth}>
          <AboutContentTitle>
            Q2) 성공과 실패의 기준이 뭔가요?
          </AboutContentTitle>
          <AboutContentImage
            source={require("../../../asset/image/status.png")}
          />
          <AboutContentExplanation>
            한 개의 습관을 일주일동안 매일매일 실천해야 성공한 습관으로
            간주되며, 마이페이지 내 성공 탭에서 확인 가능합니다.{"\n"}
            {"\n"}
            하루라도 실패하는 경우, 습관은 실패로 간주되며, 마이페이지 내 실패
            탭에서 확인 가능합니다.
          </AboutContentExplanation>
        </AboutContentContainer>
        <AboutContentContainer width={contentWidth}>
          <AboutContentTitle>
            Q3) 중간에 삭제된 습관은 실패로 간주되나요?
          </AboutContentTitle>
          <AboutContentImage
            source={require("../../../asset/image/fullHabit.png")}
          />
          <AboutContentExplanation>
            아닙니다 ! 중간에 삭제된 습관은 실패로 간주되지 않습니다.{"\n"}
            {"\n"}
            삭제한 습관을 다시 시작하기 위해서는, 하단의 새로운 습관 버튼을 눌러
            새로 만들어주세요!
          </AboutContentExplanation>
        </AboutContentContainer>
      </ScrollView>
    </ModalForScreen>
  );
};

export default AboutScreen;
