import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import React, { useEffect } from "react";

import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { LogBox, Text, View } from "react-native";
import { useRoute } from "./router";

LogBox.ignoreLogs(["Remote debugger"]);

const loadFonts = async () => {
  await Font.loadAsync({
    "Poppins-Regular": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });
};

const initialState = {
  email: "",
  password: "",
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const routing = useRoute(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onLayout={onLayoutRootView}
      >
        <Text>SplashScreen Demo! 👋</Text>
        <Entypo name='rocket' size={30} />
      </View>
    );
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
