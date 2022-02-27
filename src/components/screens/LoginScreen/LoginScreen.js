import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import * as Google from "expo-auth-session/providers/google";

import authApi from "../../../utils/api/auth";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import axios from "../../../utils/axiosInstance";
import useInform from "../../../utils/informAlert";

import { UserContext } from "../../common/userContextProvider";
import LoadingScreen from "../../common/LoadingScreen";
import CustomButton from "../../common/Button";
import MovingCats from "../../common/MovingCats";
import { LoginContainer, LoginTitle, LoginSubTitle } from "./LoginScreen.style";

const LoginScreen = () => {
  const [idToken, setIdToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
    iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    responseType: "id_token",
  });
  const { user, setUser } = useContext(UserContext);
  const { isLoading, data, isError, error } = useQuery(
    ["loginIdToken", idToken],
    authApi.getLogin,
    {
      enabled: !!idToken,
    }
  );
  const inform = useInform();

  useEffect(() => {
    if (response?.type === "success") {
      const { params } = response;
      setIdToken(params.id_token);
    }
  }, [response]);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      userAsyncStorage.setUserInfo(data);
      axios.defaults.headers.Authorization = `Bearer ${data.token}`;
    }
  }, [data]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    inform({ message: error.message });
  }

  return (
    <LoginContainer>
      <MovingCats />
      <LoginTitle>그거했냥?</LoginTitle>
      <LoginSubTitle>습관을 만드는데 필요한 시간, 바로 7일!</LoginSubTitle>
      <CustomButton
        disabled={!request}
        title="구글 로그인"
        onPress={() => {
          promptAsync();
        }}
      />
    </LoginContainer>
  );
};

export default LoginScreen;
