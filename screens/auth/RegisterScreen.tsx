import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RegisterProps } from "../../types";
import LogoSVG from "../../assets/logo.svg";
import CodeInputs from "../../components/CodeInput/CodeInput";
import PhoneInputComponent from "../../components/PhoneInput/PhoneInput";
import * as SQLite from "expo-sqlite";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { commonStyles } from "../../commonStyles";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const db = SQLite.openDatabase("profileUserDb");

const RegisterScreen: React.FC<RegisterProps> = ({ navigation }) => {
  const [dimensions, setDimensions] = useState({ window, screen });
  const [number, setNumber] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      const query = `CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, phone TEXT, name TEXT, password TEXT, position TEXT, skype TEXT, photo TEXT);`;
      tx.executeSql(query);
    });
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={commonStyles.container}>
              <LogoSVG width={68} height={90} />
              <Text style={styles.title}>Sign Up To workroom</Text>
              <View style={styles.formWrapper}>
                <View style={commonStyles.inputWrap}>
                  <Text style={commonStyles.label}>Your Phone</Text>
                  <PhoneInputComponent setValue={setNumber} />
                </View>
                <View>
                  <CodeInputs />
                </View>
                <RegisterForm
                  keyboardHide={keyboardHide}
                  setIsShowKeyboard={setIsShowKeyboard}
                  number={number}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={styles.existUserWrap}
              >
                <Text style={styles.link}>
                  Have Account? <Text style={styles.loginLink}>Log In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 36,
    textTransform: "capitalize",
    color: "#1F1D1D",
    marginTop: 110,
  },
  formWrapper: {
    position: "relative",
    width: "100%",
  },

  existUserWrap: {
    alignSelf: "center",
    marginTop: 35,
    marginBottom: 100,
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
