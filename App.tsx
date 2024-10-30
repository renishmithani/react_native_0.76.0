import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import Home from "./src/screens/Home";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerTitle: "Wallpaper",
              headerBlurEffect: "regular",
              headerTransparent: true,
              headerTitleStyle: { fontSize: 24, color: "#ffffff" },
              statusBarTranslucent: true
              // headerLargeTitle: true
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
