import { useState } from "react";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import EyeOpenSVG from "../../assets/eyeOpen.svg";
import EyeCloseSVG from "../../assets/eyeClose.svg";
import LogoSVG from "../../assets/logo.svg";
import {
  TouchableOpacity,
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
  StatusBar,
} from "react-native";
import { RootStackParamList } from "../../types";

const initialState = {
  email: "",
  password: "",
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type LoginProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export default function LoginScreen({ navigation }: LoginProps) {
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });

  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

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
        <LogoSVG width={68} height={90} style={{ marginTop: 50 }} />
        <Text style={styles.title}>Log in to woorkroom</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Your email</Text>
              <TextInput
                style={styles.input}
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
                style={styles.input}
                textAlign='center'
                secureTextEntry={!isShowPass}
                value={state.password}
                onChangeText={inputHandlerPass}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
              <TouchableOpacity
                onPress={() => setIsShowPass(!isShowPass)}
                style={{ position: "absolute", bottom: 10, right: 0 }}
              >
                {isShowPass ? (
                  <EyeCloseSVG width={24} height={24} />
                ) : (
                  <EyeOpenSVG width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={{ textAlign: "right", marginTop: 20 }}>Forgot password?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onLogin} style={styles.loginSubmit}>
              <Text style={styles.submitTitle}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newUserWrap}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.link}>
                New User? <Text style={styles.createUserLink}>Create Account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    fontFamily: "Poppins-Regular",
  },

  title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 36,
    textTransform: "capitalize",
    color: "#1F1D1D",
    marginTop: 110,
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },

  inputWrap: {
    position: "relative",
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

  input: {
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
  link: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
  newUserWrap: {
    alignSelf: "center",
    marginTop: 35,
  },

  createUserLink: {
    marginLeft: 10,
    color: "#FFC612",
  },
});
