import React, { useEffect, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
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

import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from "@env";

const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: `${GOOGLE_EXPO_CLIENT_ID}`,
    iosClientId: `${GOOGLE_IOS_CLIENT_ID}`,
    androidClientId: `${GOOGLE_ANDROID_CLIENT_ID}`,
    responseType: "id_token",
  });
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (idToken) => authApi.postLogin({ idToken }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("userInfo", data);
        queryClient.setQueryDefaults("userInfo", {
          staleTime: Infinity,
          cacheTime: Infinity,
        });
        setUser(data.user);
        userAsyncStorage.setUserInfo({ token: data.token });
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;

        return;
      },
      onError: (error) => {
        // 이전의 것 그대로 원상복구 시키기
        inform({ message: error.message });
      },
    }
  );
  const inform = useInform();

  useEffect(() => {
    if (response?.type === "success") {
      const { params } = response;
      mutate(params.id_token);
    }
  }, [response]);

  if (isLoading) {
    return <LoadingScreen />;
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
