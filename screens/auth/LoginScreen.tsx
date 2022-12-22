import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React, { useEffect } from "react";

import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function LoginScreen() {
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });

  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const inputHandlerEmail = (text: string) => setState((prev) => ({ ...prev, email: text }));
  const inputHandlerPass = (text: string) => setState((prev) => ({ ...prev, password: text }));

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const onLogin = () => {
    keyboardHide();
    Alert.alert("Credentials", `${state.email} + ${state.password}`);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Your email</Text>
              <TextInput
                style={styles.email}
                textAlign='center'
                value={state.email}
                onChangeText={inputHandlerEmail}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Password</Text>

              <TextInput
                style={styles.password}
                textAlign='center'
                secureTextEntry={true}
                value={state.password}
                onChangeText={inputHandlerPass}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
            </View>
            <Text style={{ textAlign: "right", marginTop: 20 }}>Forgot password?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.loginSubmit}>
              <Text style={styles.submitTitle} onPress={onLogin}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <StatusBar style='auto' />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    fontFamily: "Poppins-Regular",
  },
  form: {
    width: "100%",
    marginBottom: 100,
  },

  inputWrap: {
    width: "100%",
    marginTop: 40,
  },

  label: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    textTransform: "capitalize",
    color: "#9795A4",
  },

  email: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#D7D7D7",
    paddingVertical: 12,
    color: "#1F1D1D",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 1.5,
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },

  password: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#D7D7D7",
    paddingVertical: 12,
    color: "#1F1D1D",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 32,
    lineHeight: 1.5,
  },

  loginSubmit: {
    width: "100%",
    backgroundColor: "#FFC612",
    borderRadius: 20,
    paddingVertical: 17,
    marginTop: 50,
  },

  submitTitle: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 27,
    textTransform: "capitalize",
    color: "#1F1D1D",
    textAlign: "center",
  },
});
