import React, { useContext } from "react";
import { View, Text } from "react-native";
import { QueryCache, useQueryClient } from "react-query";

import axios from "../../../utils/axiosInstance";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import CustomButton from "../../common/Button";
import { UserContext } from "../../common/userContextProvider";

const queryCache = new QueryCache();

const MyPageScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();

  const handleLogoutButtonClick = () => {
    axios.defaults.headers.Authorization = undefined;
    userAsyncStorage.removeUserInfo();
    setUser({
      id: "",
      name: "",
    });
    queryCache.clear();
    queryClient.clear();
  };

  return (
    <View>
      <Text>This is MyPage</Text>
      <CustomButton title="로그아웃" onPress={handleLogoutButtonClick} />
    </View>
  );
};

export default MyPageScreen;
