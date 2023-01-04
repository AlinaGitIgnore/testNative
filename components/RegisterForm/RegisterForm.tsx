import React, { useState } from "react";
import { Formik } from "formik";
import { validationSchemaRegister } from "../../utils/validationSchema";
import EyeOpenSVG from "../../assets/eyeOpen.svg";
import EyeCloseSVG from "../../assets/eyeClose.svg";
import { IRegistrationValues } from "../../types";
import { useAppDispatch } from "../../redux/hook";
import * as SQLite from "expo-sqlite";
import { SQLError, SQLTransaction } from "expo-sqlite";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { setUser, loginUser } from "../../redux/auth/authSlice";
import { styles } from "./styles";
import { commonStyles } from "../../commonStyles";

const db = SQLite.openDatabase("profileUserDb");

const initialState = {
  name: "",
  email: "",
  password: "",
  confPassword: "",
};

interface IProps {
  keyboardHide: () => void;
  setIsShowKeyboard: (v: boolean) => void;
  number: string;
}

const RegisterForm: React.FC<IProps> = ({ keyboardHide, setIsShowKeyboard, number }) => {
  const dispatch = useAppDispatch();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfPass, setIsShowConfPass] = useState(false);

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

  return (
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
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Your Name</Text>
            {errors.name && touched.name ? (
              <Text style={commonStyles.errorMessage}>{errors.name}</Text>
            ) : (
              <></>
            )}

            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              style={commonStyles.input}
              textAlign='left'
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
            />
          </View>
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Your email</Text>
            {errors.email && touched.email ? (
              <Text style={commonStyles.errorMessage}>{errors.email}</Text>
            ) : (
              <></>
            )}
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={commonStyles.input}
              textAlign='left'
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
            />
          </View>
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Password</Text>
            {errors.password && touched.password ? (
              <Text style={commonStyles.errorMessage}>{errors.password}</Text>
            ) : (
              <></>
            )}
            <TextInput
              style={commonStyles.input}
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
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Confirm Password</Text>
            {errors.confPassword && touched.confPassword ? (
              <Text style={commonStyles.errorMessage}>{errors.confPassword}</Text>
            ) : (
              <></>
            )}
            <TextInput
              style={commonStyles.input}
              textAlign='left'
              secureTextEntry={!isShowConfPass}
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
            style={commonStyles.buttonSubmit}
          >
            <Text style={styles.submitTitle}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default RegisterForm;
