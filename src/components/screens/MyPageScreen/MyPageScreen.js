import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useContext,
  useCallback,
} from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { QueryCache, useQueryClient, useInfiniteQuery } from "react-query";

import PropTypes from "prop-types";
import { debounce } from "lodash";

import axios from "../../../utils/axiosInstance";
import userAsyncStorage from "../../../utils/userAsyncStorage";
import useInform from "../../../utils/informAlert";
import habitApi from "../../../utils/api/habit";
import NUMBERS from "../../../constants/numbers";
import THEME from "../../../constants/theme.style";
import { STORAGE_KEY_NAME, QUERY_KEY_NAME } from "../../../constants/keyName";

import CustomButton from "../../common/CustomButton/CustomButton";
import { UserContext } from "../../common/userContextProvider";
import Habit from "../../common/Habit/Habit";
import EmptyHabit from "../../common/EmptyHabit/EmptyHabit";

import {
  MyPageScreenContainter,
  MyPageUserInfoContainer,
  MyPageUserNameText,
  MyPageButtonContainer,
  MyPageResultContainer,
  MyPageResultTabContainer,
  MyPageResultTabButton,
  MyPageResultTabImage,
  MyPageResultTabText,
  MyPageResultHabitListContainer,
  MyPageScrollTopButtonContainer,
  MyPageScrollTopImage,
} from "./MyPageScreen.style";

const queryCache = new QueryCache();

const MyPageScreen = ({ navigation }) => {
  const [searchWord, setSearchWord] = useState("");
  const [debounceSearchWord, setDebounceSearchWord] = useState("");
  const [expoToken, setExpoToken] = useState("");
  const [isSuccessClicked, setIsSuccessClicked] = useState(true);

  const queryClient = useQueryClient();
  const { user, setUser } = useContext(UserContext);
  const habitListRef = useRef(null);
  const inform = useInform();

  const { data, fetchNextPage } = useInfiniteQuery(
    [QUERY_KEY_NAME.expiredHabitList, user.id, isSuccessClicked],
    habitApi.getExpiredSuccessHabitList,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.habitList.length === NUMBERS.habitListMaxLength
          ? lastPage.nextPage
          : undefined;
      },
    }
  );

  const expiredHabitList = useMemo(() => {
    const initialHabitList = [];
    data?.pages.forEach(({ habitList }) => initialHabitList.push(...habitList));

    return initialHabitList;
  }, [data]);

  useEffect(() => {
    const updateAlarmSubscription = navigation.addListener(
      "focus",
      async () => {
        try {
          const expoTokenData = await userAsyncStorage.getSavedInfo(
            STORAGE_KEY_NAME.alarmToken
          );

          if (expoTokenData) {
            setExpoToken(expoTokenData);
          } else {
            setExpoToken("");
          }
        } catch (err) {
          inform({ message: err.message });
        }
      }
    );

    return updateAlarmSubscription;
  }, [navigation]);

  const handleLogoutButtonClick = () => {
    axios.defaults.headers.Authorization = undefined;
    userAsyncStorage.removeSavedInfo(STORAGE_KEY_NAME.userInfo);
    setUser({
      id: "",
      name: "",
    });
    queryCache.clear();
    queryClient.clear();
  };

  const handleSearchTextInputChange = (event) => {
    setSearchWord(event);
    printSearchWord(event);
  };

  const printSearchWord = useCallback(
    debounce((text) => {
      setDebounceSearchWord(text);
    }, 600),
    []
  );

  return (
    <MyPageScreenContainter>
      <MyPageUserInfoContainer>
        <MyPageUserNameText>
          ????????? {user.name} ?????? ????????? ??????!
        </MyPageUserNameText>
        <MyPageButtonContainer>
          <CustomButton
            color={THEME.mainStrongColor}
            width="140px"
            title="????????????"
            onPress={handleLogoutButtonClick}
          />
          <CustomButton
            color={THEME.mainStrongColor}
            title={expoToken ? "?????? ?????? ??????" : "?????? ??????"}
            width={expoToken ? "200px" : "140px"}
            onPress={() => navigation.navigate("Alarm")}
          />
        </MyPageButtonContainer>
      </MyPageUserInfoContainer>
      <MyPageResultContainer>
        <MyPageResultTabContainer>
          <MyPageResultTabButton
            isSuccessClicked={isSuccessClicked}
            onPress={() => setIsSuccessClicked(true)}
          >
            <MyPageResultTabImage
              source={require("../../../asset/image/myPage/successListTab.png")}
            />
            <MyPageResultTabText>??????</MyPageResultTabText>
          </MyPageResultTabButton>
          <MyPageResultTabButton
            isSuccessClicked={!isSuccessClicked}
            onPress={() => setIsSuccessClicked(false)}
          >
            <MyPageResultTabImage
              source={require("../../../asset/image/myPage/failureListTab.png")}
            />
            <MyPageResultTabText>??????</MyPageResultTabText>
          </MyPageResultTabButton>
        </MyPageResultTabContainer>
        <MyPageResultHabitListContainer>
          <Searchbar
            style={{ width: 300, marginVertical: 10 }}
            inputStyle={{ fontFamily: THEME.subFont }}
            placeholder="????????????"
            value={searchWord}
            onChangeText={handleSearchTextInputChange}
          />
          {!expiredHabitList.length && <EmptyHabit />}
          <FlatList
            ref={habitListRef}
            data={
              debounceSearchWord
                ? expiredHabitList.filter(({ title }) =>
                    title.includes(debounceSearchWord)
                  )
                : expiredHabitList
            }
            renderItem={({ item }) => {
              return (
                <Habit
                  habitData={item}
                  currentDate={new Date()}
                  isExpired={true}
                  width="100%"
                />
              );
            }}
            keyExtractor={(item, index) => item.id}
            onEndReachedThreshold={0.2}
            onEndReached={fetchNextPage}
          />
          {expiredHabitList.length > NUMBERS.habitListMaxLength && (
            <MyPageScrollTopButtonContainer
              onPress={() => {
                habitListRef.current.scrollToOffset({ offset: 0 });
              }}
            >
              <MyPageScrollTopImage source={require("../../../asset/image/myPage/scrollToTop.png")}/>
            </MyPageScrollTopButtonContainer>
          )}
        </MyPageResultHabitListContainer>
      </MyPageResultContainer>
    </MyPageScreenContainter>
  );
};

MyPageScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MyPageScreen;
