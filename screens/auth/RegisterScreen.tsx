import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
  FlatList,
  GestureResponderEvent,
  TouchableOpacityComponent,
} from "react-native";
import { RootStackParamList } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";
import LogoSVG from "../../assets/logo.svg";
import ArrowDownSVG from "../../assets/arrowDown.svg";
import EyeOpenSVG from "../../assets/eyeOpen.svg";
import EyeCloseSVG from "../../assets/eyeClose.svg";

const initialState = {
  name: "",
  email: "",
  password: "",
  confPassword: "",
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const data = [
  { label: "+1", value: "+1" },
  { label: "+2", value: "+2" },
  { label: "+3", value: "+3" },
];
type RegisterProps = NativeStackScreenProps<RootStackParamList, "RegisterScreen">;
export default function RegisterScreen({ navigation }: RegisterProps) {
  const [items, setItems] = useState(data);

  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [code, setCode] = useState("+1");
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfPass, setIsShowConfPass] = useState(false);

  const inputHandlerName = (text: string) => setState((prev) => ({ ...prev, name: text }));
  const inputHandlerEmail = (text: string) => setState((prev) => ({ ...prev, email: text }));
  const inputHandlerPass = (text: string) => setState((prev) => ({ ...prev, password: text }));
  const inputHandlerConfPass = (text: string) =>
    setState((prev) => ({ ...prev, confPassword: text }));

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const onRegister = () => {
    keyboardHide();
    Alert.alert("Credentials", `${state}`);
    setState(initialState);
  };

  const selectValue = (e: any) => {
    setCode(e.target.innerText);
    setIsOpen(!isOpen);
    // setSelectValue()
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <LogoSVG width={68} height={90} />
        <Text style={styles.title}>Sign Up To woorkroom</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ width: "100%", marginTop: 50 }}
        >
          <View style={styles.form}>
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <View style={styles.phoneCodeWrap}>
                <Text style={styles.selectValue}>{code}</Text>
                {
                  <ArrowDownSVG
                    width={10}
                    height={5}
                    style={[
                      styles.openSelect,
                      {
                        transform: isOpen ? [{ rotate: "180deg" }] : [{ rotate: "0deg" }],
                      },
                    ]}
                  />
                }
              </View>
            </TouchableOpacity>

            <View style={{ ...styles.selectList, display: isOpen ? "flex" : "none" }}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <Text onPress={(e) => selectValue(e)} style={styles.item}>
                    {item.value}
                  </Text>
                )}
              />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                style={styles.name}
                textAlign='center'
                value={state.name}
                onChangeText={inputHandlerName}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
            </View>
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
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Confirm Password</Text>

              <TextInput
                style={styles.password}
                textAlign='center'
                secureTextEntry={true}
                value={state.confPassword}
                onChangeText={inputHandlerConfPass}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
              <TouchableOpacity
                onPress={() => setIsShowConfPass(!isShowPass)}
                style={{ position: "absolute", bottom: 10, right: 0 }}
              >
                {isShowConfPass ? (
                  <EyeCloseSVG width={24} height={24} />
                ) : (
                  <EyeOpenSVG width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.loginSubmit}>
              <Text style={styles.submitTitle} onPress={onRegister}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.existUserWrap}
        >
          <Text style={styles.link}>
            Have Account? <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
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

  title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 36,
    textTransform: "capitalize",
    color: "#1F1D1D",
  },
  form: {
    position: "relative",
    width: "100%",
    marginBottom: 100,
  },

  phoneCodeWrap: {
    position: "relative",
    width: 70,
    height: 48,
    borderColor: "#D7D7D7",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  openSelect: {
    position: "absolute",
    top: 22,
    right: 10,
  },
  selectValue: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#9795A4",
  },
  selectList: {
    top: 50,
    left: 0,
    position: "absolute",
    borderColor: "#D7D7D7",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "white",
    width: 70,
    height: 96,
    zIndex: 3,
  },
  item: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#9795A4",
    textAlign: "center",
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

  name: {
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

  existUserWrap: {
    alignSelf: "center",
    marginTop: 35,
  },

  link: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
  loginLink: {
    marginLeft: 10,
    color: "#FFC612",
  },
});
