import { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";

import { UserContext } from "../common/userContextProvider";
import authApi from "../../utils/api/auth";
import userAsyncStorage from "../../utils/userAsyncStorage";
import axios from "../../utils/axiosInstance";

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
      enabled: !!idToken 
    }
  );

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
  },[data]);
  //isLoading, isError에 대한 분기처리 해줄것 

  return (
    <View>
      <Text>This is Login</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};

export default LoginScreen;
