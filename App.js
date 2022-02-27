import { useState } from "react";
import { LogBox } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./src/navigations/RootNavigation";
import UserContextProvider from "./src/components/common/userContextProvider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <UserContextProvider>
          <RootStack />
        </UserContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

LogBox.ignoreLogs(["Setting a timer"]);

export default App;
