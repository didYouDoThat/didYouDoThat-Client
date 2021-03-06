import React, { useEffect, useContext } from "react";
import * as Google from "expo-auth-session/providers/google";
import { useMutation, useQueryClient } from "react-query";

import authApi from "../../../utils/api/auth";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import axios from "../../../utils/axiosInstance";
import useInform from "../../../utils/informAlert";
import { STORAGE_KEY_NAME, QUERY_KEY_NAME } from "../../../constants/keyName";
import THEME from "../../../constants/theme.style";

import { UserContext } from "../../common/userContextProvider";
import LoadingPage from "../../common/Loading/Loading";
import CustomButton from "../../common/CustomButton/CustomButton";
import MovingCats from "../../common/MovingCats";
import {
  LoginContainer,
  LoginTextContainer,
  LoginTitle,
  LoginSubTitle,
} from "./LoginScreen.style";

import {
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from "@env";

const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const inform = useInform();
  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: `${GOOGLE_EXPO_CLIENT_ID}`,
    iosClientId: `${GOOGLE_IOS_CLIENT_ID}`,
    androidClientId: `${GOOGLE_ANDROID_CLIENT_ID}`,
    responseType: "id_token",
  });

  const { mutate, isLoading } = useMutation(
    (idToken) => authApi.postLogin({ idToken }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(QUERY_KEY_NAME.userInfo, data.user);
        queryClient.setQueryDefaults(QUERY_KEY_NAME.userInfo, {
          staleTime: Infinity,
          cacheTime: Infinity,
        });

        setUser(data.user);

        userAsyncStorage.setInfo(STORAGE_KEY_NAME.userInfo, {
          token: data.token,
          user: data.user,
        });
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        
        return;
      },
      onError: (error) => {
        inform({ message: error.message });
      },
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { params } = response;
      mutate(params.id_token);
    }
  }, [response]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <LoginContainer
      source={require("../../../asset/image/loginCats/loginBackground.png")}
      resizeMode="repeat"
    >
      <MovingCats />
      <LoginTextContainer>
        <LoginTitle>?????????????</LoginTitle>
        <LoginSubTitle>????????? ???????????? ????????? ??????, ?????? 7???!</LoginSubTitle>
        <CustomButton
          color={THEME.mainStrongColor}
          disabled={!request}
          title="?????? ?????????"
          onPress={() => {
            promptAsync();
          }}
        />
      </LoginTextContainer>
    </LoginContainer>
  );
};

export default LoginScreen;
