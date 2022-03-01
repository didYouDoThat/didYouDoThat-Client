import React from "react";
import { LogBox } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";

import RootStack from "./src/navigations/RootNavigation";
import UserContextProvider from "./src/components/common/userContextProvider";

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
    background: "#ddf3f5",
  },
};

const App = () => {
  const [loaded] = useFonts({
    DosGothic: require("./src/asset/font/DOSGothic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={CustomTheme}>
        <UserContextProvider>
          <RootStack />
        </UserContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

LogBox.ignoreLogs(["Setting a timer"]);

export default App;
