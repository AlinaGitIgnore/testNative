import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Application from "./Application";

export default function App() {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
}
