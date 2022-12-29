import React, { useEffect, useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import EditSVG from "../../assets/Edit.svg";
// import * as SQLite from "expo-sqlite";
import { Formik } from "formik";
import { validationSchemaEditProfile } from "../../utils/validationShema";

const initialState = {
  phone: "",
  name: "",
  email: "",
  position: "",
  skype: "",
  photo: "",
};

interface IState {
  phone: string;
  name: string;
  email: string;
  position: string;
  skype: string;
  photo: string;
}

// const db = SQLite.openDatabase("MainDB");

type ProfileProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;
const ProfileScreen = ({ navigation }: ProfileProps) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState<IState>(initialState);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   try {
  //     db.transaction((tx) => {
  //        txn.executeSql(`SELECT * FROM users WHERE email = ?`, [values.email], (_, { rows }) => {
  // if (rows._array.length == 0) {
  //             const name: string = results.rows.item(0).Name;
  //             const email: string = results.rows.item(0).Email;
  //             const position: string = results.rows.item(0).Position;
  //             const skype: string = results.rows.item(0).Skype;
  //             const photo: string = results.rows.item(0).Photo;
  //             const phone: string = results.rows.item(0).Phone;
  //             const state = { phone, name, email, position, skype, photo };
  //             setState(state);
  //           }
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const updateData = async (values: IState) => {
  //
  //     db.transaction((tx) => {
  //       tx.executeSql("UPDATE Users SET Name=?", [values.name]);
  //       tx.executeSql("UPDATE Users SET Email=?", [values.email]);
  //       tx.executeSql("UPDATE Users SET Phone=?", [values.phone]);
  //       tx.executeSql("UPDATE Users SET Position=?", [values.position]);
  //       tx.executeSql("UPDATE Users SET Skype=?", [values.skype]);

  //       () => {
  //         Alert.alert("Successfully!!");
  //       };
  //       setState(values);
  //     });
  //
  // };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onLogOut = () => {
    keyboardHide();
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <KeyboardAwareScrollView style={{ width: "100%" }}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Edit profile</Text>
                <TouchableOpacity onPress={onLogOut} style={styles.linkLogOut}>
                  <Text style={styles.linkText}>Log Out</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mainInfo}>
                <TouchableOpacity onPress={() => {}}>
                  <Image source={require("../../assets/Photo.png")} />
                  <EditSVG style={{ position: "absolute", top: 50, right: 0 }} />
                </TouchableOpacity>
                <Text style={styles.name}>{state.name}</Text>
                <Text style={styles.position}>{state.position}</Text>
              </View>
              <Formik
                initialValues={state}
                validationSchema={validationSchemaEditProfile}
                onSubmit={(values, actions) => {
                  console.log(values);
                  // updateData(values);
                  actions.resetForm();
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View>
                    <View style={{ ...styles.inputWrap, marginTop: 0 }}>
                      <Text style={styles.label}>Name</Text>
                      {errors.name && touched.name ? (
                        <Text style={styles.errorMessage}>{errors.name}</Text>
                      ) : (
                        <></>
                      )}
                      <TextInput
                        style={styles.input}
                        textAlign='left'
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <Text style={styles.label}>Email</Text>
                      {errors.email && touched.email ? (
                        <Text style={styles.errorMessage}>{errors.email}</Text>
                      ) : (
                        <></>
                      )}
                      <TextInput
                        style={styles.input}
                        textAlign='left'
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <Text style={styles.label}>Phone</Text>
                      {errors.phone && touched.phone ? (
                        <Text style={styles.errorMessage}>{errors.phone}</Text>
                      ) : (
                        <></>
                      )}
                      <TextInput
                        style={styles.input}
                        textAlign='left'
                        keyboardType='numeric'
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <Text style={styles.label}>Position</Text>
                      {errors.position && touched.position ? (
                        <Text style={styles.errorMessage}>{errors.position}</Text>
                      ) : (
                        <></>
                      )}
                      <TextInput
                        style={styles.input}
                        textAlign='left'
                        onChangeText={handleChange("position")}
                        onBlur={handleBlur("position")}
                        value={values.position}
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <Text style={styles.label}>Skype</Text>
                      {errors.skype && touched.skype ? (
                        <Text style={styles.errorMessage}>{errors.skype}</Text>
                      ) : (
                        <></>
                      )}
                      <TextInput
                        style={styles.input}
                        textAlign='left'
                        onChangeText={handleChange("skype")}
                        onBlur={handleBlur("skype")}
                        value={values.skype}
                        onFocus={() => {
                          setIsShowKeyboard(true);
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleSubmit()}
                      style={styles.profileSubmit}
                    >
                      <Text style={styles.submitTitle}>Save</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 32,
    minHeight: "100%",
  },
  scrollView: { width: "100%" },

  header: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 27,
    textTransform: "capitalize",
    color: "#1F1D1D",
  },

  linkLogOut: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  linkText: { fontWeight: "500", fontSize: 16, lineHeight: 24, color: "#FFC612" },

  mainInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  name: {
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 36,
    textTransform: "capitalize",
    color: "#1F1D1D",
    marginTop: 10,
  },

  position: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    textTransform: "capitalize",
    color: "#9795A4",
    marginTop: 3,
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
    lineHeight: 21,
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },

  profileSubmit: {
    width: "100%",
    backgroundColor: "#FFC612",
    borderRadius: 20,
    paddingVertical: 17,
    marginTop: 30,
    marginBottom: 37,
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

  errorMessage: {
    position: "absolute",
    top: 20,
    left: 0,
    fontWeight: "400",
    fontSize: 16,
    color: "#d52121",
  },
});
