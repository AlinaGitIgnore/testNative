import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ProfileProps } from "../../types";
import EditSVG from "../../assets/Edit.svg";
import * as SQLite from "expo-sqlite";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginUser, setUser } from "../../redux/auth/authSlice";
import { SQLError, SQLTransaction } from "expo-sqlite";
import CreatePhoto from "../../components/CreatePhoto/CreatePhoto";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { commonStyles } from "../../commonStyles";

const db = SQLite.openDatabase("profileUserDb");

const ProfileScreen: React.FC<ProfileProps> = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowCamera, setIsShowCamera] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onLogOut = () => {
    dispatch(loginUser(false));
    keyboardHide();
  };

  const updatePhoto = (uri: any) => {
    db.transaction((tx) => {
      const query = `UPDATE profile SET photo = '${uri}' WHERE id = ${profile.id}`;
      tx.executeSql(
        query,
        [],
        () => {
          Alert.alert("Successfully!!");
        },

        (_: SQLTransaction, error: SQLError) => {
          console.log(error);
          Alert.alert("Something went wrong!");
          return true;
        }
      );

      tx.executeSql(`SELECT * FROM profile WHERE id = ?`, [profile.id], (_, { rows }) => {
        if (rows._array.length == 0) {
          Alert.alert("This user is not registered. Check your email or go to registration.");
        } else {
          dispatch(setUser(rows._array[0]));
        }
      });
    });
    setIsShowCamera(false);
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
              <View style={styles.header}>
                <Text style={styles.title}>Edit profile</Text>
                <TouchableOpacity onPress={onLogOut} style={styles.linkLogOut}>
                  <Text style={styles.linkText}>Log Out</Text>
                </TouchableOpacity>
              </View>
              {isShowCamera && <CreatePhoto setPhoto={updatePhoto} />}
              {!isShowCamera && (
                <View style={styles.mainInfo}>
                  <TouchableOpacity onPress={() => setIsShowCamera(true)}>
                    <Image
                      source={
                        profile.photo !== ""
                          ? { uri: profile.photo }
                          : require("../../assets/Photo.png")
                      }
                      style={{ width: 70, height: 70, borderRadius: 35 }}
                    />
                    <EditSVG style={{ position: "absolute", top: 50, right: 0 }} />
                  </TouchableOpacity>
                  <Text style={styles.name}>{profile.name}</Text>
                  <Text style={styles.position}>{profile.position}</Text>
                </View>
              )}
              <ProfileForm
                keyboardHide={keyboardHide}
                profile={profile}
                setIsShowKeyboard={setIsShowKeyboard}
              />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
});
