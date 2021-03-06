import React from "react";
import { LogBox } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@emotion/react";

import RootStack from "./src/navigations/RootNavigation";
import UserContextProvider from "./src/components/common/userContextProvider";
import THEME from "./src/constants/theme.style";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.subColor,
  },
};

const App = () => {
  const [loaded] = useFonts({
    DosGothic: require("./src/asset/font/DOSGothic.ttf"),
    DungGeunMo: require("./src/asset/font/DungGeunMo.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={THEME}>
        <NavigationContainer theme={CustomTheme}>
          <UserContextProvider>
            <RootStack />
          </UserContextProvider>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default App;
