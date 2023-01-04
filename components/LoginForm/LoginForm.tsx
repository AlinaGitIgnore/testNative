import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { validationSchemaLogin } from "../../utils/validationSchema";
import EyeOpenSVG from "../../assets/eyeOpen.svg";
import EyeCloseSVG from "../../assets/eyeClose.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setUser, loginUser } from "../../redux/auth/authSlice";
import * as SQLite from "expo-sqlite";
import { SQLError, SQLTransaction } from "expo-sqlite";
import { styles } from "./styles";
import { commonStyles } from "../../commonStyles";

const initialState = {
  id: null,
  email: "",
  name: "",
  position: "",
  skype: "",
  phone: "",
  password: "",
};

interface IProps {
  keyboardHide: () => void;
  setIsShowKeyboard: (v: boolean) => void;
}

const LoginForm: React.FC<IProps> = ({ keyboardHide, setIsShowKeyboard }) => {
  const db = SQLite.openDatabase("profileUserDb");
  const dispatch = useAppDispatch();
  const [isShowPass, setIsShowPass] = useState(false);

  const getUser = (values: { email: string; password: string }) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM profile WHERE email = ?`,
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

  return (
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
          <TouchableOpacity>
            <Text style={styles.forgotPass}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSubmit()}
            style={commonStyles.buttonSubmit}
          >
            <Text style={styles.submitTitle}>Log in</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
