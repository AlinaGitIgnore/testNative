import { useCallback, useState } from "react";
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
import { Formik } from "formik";
import { validationSchemaLogin } from "../../utils/validationShema";
import { RootStackParamList } from "../../types";
import * as SQLite from "expo-sqlite";
import { SQLError, SQLTransaction } from "expo-sqlite/build/SQLite.types";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setUser, loginUser } from "../../redux/auth/authSlice";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type LoginProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;
const initialState = {
  id: null,
  email: "",
  name: "",
  position: "",
  skype: "",
  phone: "",
  password: "",
};

const db = SQLite.openDatabase("userDb");

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    db.transaction((tx) => {
      const query = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, phone TEXT, name TEXT, password TEXT, position TEXT, skype TEXT);`;
      tx.executeSql(query);
    });
  }, []);

  const getUser = (values: { email: string; password: string }) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users WHERE email = ?`,
        [values.email],
        (_, { rows }) => {
          if (rows._array.length == 0) {
            Alert.alert("This user is not registered. Check your email or go to registration.");
          } else {
            if (rows._array[0].password === values.password) {
              dispatch(setUser(rows._array[0]));
              dispatch(loginUser(true));
            } else {
              Alert.alert("Incorrect password.");
            }
          }
        },
        (_: SQLTransaction, error: SQLError) => {
          console.log(error);
          Alert.alert("Something went wrong!");
          return true;
        }
      );
    });
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });

  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <LogoSVG width={68} height={90} style={{ marginTop: 50 }} />
        <Text style={styles.title}>Log in to workroom</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          <Formik
            initialValues={initialState}
            validationSchema={validationSchemaLogin}
            onSubmit={(values) => {
              keyboardHide();
              getUser({ ...values, email: values.email.toLowerCase() });
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <View style={styles.inputWrap}>
                  <Text style={styles.label}>Your email</Text>
                  {errors.email && touched.email ? (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  ) : (
                    <></>
                  )}
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    style={styles.input}
                    textAlign='left'
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <Text style={styles.label}>Password</Text>
                  {errors.password && touched.password ? (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  ) : (
                    <></>
                  )}
                  <TextInput
                    style={styles.input}
                    textAlign='left'
                    secureTextEntry={!isShowPass}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
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
                <TouchableOpacity>
                  <Text style={styles.forgotPass}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSubmit()}
                  style={styles.loginSubmit}
                >
                  <Text style={styles.submitTitle}>Log in</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            style={styles.newUserWrap}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.link}>
              New User? <Text style={styles.createUserLink}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
  input: {
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#D7D7D7",
    color: "#1F1D1D",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 21,
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    paddingTop: 15,
    paddingBottom: 12,
    overflow: "hidden",
  },
  label: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    textTransform: "capitalize",
    color: "#9795A4",
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
    // marginTop: 35,
  },

  createUserLink: {
    marginLeft: 10,
    color: "#FFC612",
  },

  forgotPass: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "right",
    marginTop: 20,
    color: "#9795A4",
  },

  errorMessage: {
    position: "absolute",
    top: 20,
    left: 0,
    fontWeight: "400",
    fontSize: 16,
    color: "#d52121",
  },
});
