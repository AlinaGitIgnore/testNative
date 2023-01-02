import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { RootStackParamList } from "../../types";
import LogoSVG from "../../assets/logo.svg";
import ArrowDownSVG from "../../assets/arrowDown.svg";
import EyeOpenSVG from "../../assets/eyeOpen.svg";
import EyeCloseSVG from "../../assets/eyeClose.svg";
import CodeInputs from "../../components/CodeInput/CodeInput";
import PhoneInputComponent from "../../components/PhoneInput/PhoneInput";
import { Formik } from "formik";
import { validationSchemaRegister } from "../../utils/validationShema";
import * as SQLite from "expo-sqlite";
import { SQLError, SQLTransaction } from "expo-sqlite/build/SQLite.types";
import { useAppDispatch } from "../../redux/hook";
import { setUser, loginUser } from "../../redux/auth/authSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  confPassword: "",
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
// const data = [
//   { label: "+1", value: "+1" },
//   { label: "+2", value: "+2" },
//   { label: "+3", value: "+3" },
// ];
interface IRegistrationValues {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}
type RegisterProps = NativeStackScreenProps<RootStackParamList, "RegisterScreen">;
const db = SQLite.openDatabase("profileUserDb");

const RegisterScreen: React.FC<RegisterProps> = ({ navigation }) => {
  // const [db, setDb] = useState(SQLite.openDatabase("profileUserDb.db"));
  // const [items, setItems] = useState(data);
  // const [isOpen, setIsOpen] = useState(false);
  // const [code, setCode] = useState("+1");
  const dispatch = useAppDispatch();
  const [dimensions, setDimensions] = useState({ window, screen });
  const [number, setNumber] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfPass, setIsShowConfPass] = useState(false);
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

  const addUser = async (values: IRegistrationValues) => {
    db.transaction((tx) => {
      const queryDefaultUser = `INSERT INTO profile (email, phone, name, password, position, skype, photo) VALUES ('${values.email}', '${number}', '${values.name}', '${values.password}', '', '', '')`;
      tx.executeSql(
        queryDefaultUser,
        [],
        (_, { rows }) => {
          Alert.alert("Registration successfully");
        },
        (_: SQLTransaction, error: SQLError) => {
          console.log(error);
          Alert.alert("Something went wrong!");
          return true;
        }
      );
      tx.executeSql(
        `SELECT * FROM profile WHERE email = ?`,
        [values.email],
        (_, { rows }) => {
          if (rows._array.length == 0) {
            Alert.alert("This user is not registered. Check your email or go to registration.");
          } else {
            console.log(rows._array[0]);
            dispatch(setUser(rows._array[0]));
            dispatch(loginUser(true));
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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // const onRegister = () => {
  //   keyboardHide();
  //   setState(initialState);
  //   setUser();
  // };

  // const selectValue = (e: any) => {
  //   setCode(e.target.innerText);
  //   setIsOpen(!isOpen);
  // };

  // if (isLoading) {
  //   return (
  //     <View>
  //       <Text style={{ color: "black", marginTop: 100 }}>Loading...</Text>
  //     </View>
  //   );
  // }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAwareScrollView style={{ width: "100%" }}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <LogoSVG width={68} height={90} style={{ marginTop: 50 }} />
              <Text style={styles.title}>Sign Up To workroom</Text>

              <View style={styles.form}>
                <View style={styles.inputWrap}>
                  <Text style={styles.label}>Your Phone</Text>
                  {/* <View style={styles.phoneInputWrap}>
                    <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                      <View style={styles.phoneCodeWrap}>
                        <Text style={styles.phoneInput}>{code}</Text>
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
                      {data.map((item, idx) => (
                        <Text onPress={(e) => selectValue(e)} style={styles.item} key={idx}>
                          {item.value}
                        </Text>
                      ))}
                    </View>
                    <View style={styles.inputNumber}>
                      <TextInput
                        placeholder='345 567-23-56'
                        // keyboardType='numeric'
                        style={styles.phoneInput}
                        textAlign='left'
                        value={state.phone}
                        onChangeText={inputHandlerPhone}
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                      />
                    </View>
                  </View> */}
                  <PhoneInputComponent value={number} setValue={setNumber} />
                </View>
                <View>
                  <CodeInputs />
                </View>

                <Formik
                  initialValues={initialState}
                  validationSchema={validationSchemaRegister}
                  onSubmit={(values) => {
                    keyboardHide();
                    addUser({ ...values, email: values.email.toLowerCase() });
                  }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                      <View style={styles.inputWrap}>
                        <Text style={styles.label}>Your Name</Text>
                        {errors.name && touched.name ? (
                          <Text style={styles.errorMessage}>{errors.name}</Text>
                        ) : (
                          <></>
                        )}

                        <TextInput
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          value={values.name}
                          style={styles.input}
                          textAlign='left'
                          onFocus={() => {
                            setIsShowKeyboard(true);
                          }}
                        />
                      </View>
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
                      <View style={styles.inputWrap}>
                        <Text style={styles.label}>Confirm Password</Text>
                        {errors.confPassword && touched.confPassword ? (
                          <Text style={styles.errorMessage}>{errors.confPassword}</Text>
                        ) : (
                          <></>
                        )}
                        <TextInput
                          style={styles.input}
                          textAlign='left'
                          secureTextEntry={!isShowPass}
                          value={values.confPassword}
                          onChangeText={handleChange("confPassword")}
                          onBlur={handleBlur("confPassword")}
                          onFocus={() => {
                            setIsShowKeyboard(true);
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => setIsShowConfPass(!isShowConfPass)}
                          style={{ position: "absolute", bottom: 10, right: 0 }}
                        >
                          {isShowConfPass ? (
                            <EyeCloseSVG width={24} height={24} />
                          ) : (
                            <EyeOpenSVG width={24} height={24} />
                          )}
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleSubmit()}
                        style={styles.loginSubmit}
                      >
                        <Text style={styles.submitTitle}>Next</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Formik>
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
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

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
  scrollView: { width: "100%" },
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
    position: "relative",
    width: "100%",
  },

  phoneCodeWrap: {
    position: "relative",
    width: 70,
    height: 48,
    borderColor: "#D7D7D7",
    borderWidth: 1,
    borderRadius: 15,
  },

  openSelect: {
    position: "absolute",
    top: 22,
    right: 10,
  },

  phoneInput: {
    alignItems: "center",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#9795A4",
    fontStyle: "normal",
    paddingVertical: 12,
    paddingHorizontal: 15,
    overflow: "hidden",
  },
  selectList: {
    top: 55,
    left: 0,
    position: "absolute",
    borderColor: "#D7D7D7",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#fffff",
    width: 70,
    height: 96,
    zIndex: 100,
  },
  item: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#9795A4",
    textAlign: "center",
  },

  phoneInputWrap: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  inputNumber: {
    height: 48,
    flex: 1,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 15,
    marginLeft: 25,
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

  errorMessage: {
    position: "absolute",
    top: 20,
    left: 0,
    fontWeight: "400",
    fontSize: 16,
    color: "#d52121",
  },
});
