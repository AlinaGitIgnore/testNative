import React, { useEffect, useState } from "react";
import LogoSVG from "../../assets/logo.svg";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScrollView,
} from "react-native";
import { LoginProps } from "../../types";
import * as SQLite from "expo-sqlite";
import LoginForm from "../../components/LoginForm/LoginForm";
import { commonStyles } from "../../commonStyles";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const db = SQLite.openDatabase("profileUserDb");

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [dimensions, setDimensions] = useState({ window, screen });

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
      <TouchableWithoutFeedback onPress={keyboardHide} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={commonStyles.container}>
            <LogoSVG width={68} height={90} />
            <Text style={styles.title}>Log in to workroom</Text>

            <LoginForm keyboardHide={keyboardHide} setIsShowKeyboard={setIsShowKeyboard} />

            <TouchableOpacity
              style={styles.newUserWrap}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.link}>
                New User? <Text style={styles.createUserLink}>Create Account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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

  link: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
  },
  newUserWrap: {
    alignSelf: "center",
  },

  createUserLink: {
    marginLeft: 10,
    color: "#FFC612",
  },
});
