import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigator/StackNavigation";
import { StatusBar } from "react-native";
import Dialog from "./src/components/Dialog";
import { useNetInfo } from "@react-native-community/netinfo";

const App = () => {

  const netInfo = useNetInfo();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#042444'} />
      <StackNavigation />
      {!netInfo.isConnected && (
        <Dialog
          title={"No Internet"}
          description={"Please check your connection status and try again"}
        />
      )}
    </NavigationContainer>
  );
};

export default App;
