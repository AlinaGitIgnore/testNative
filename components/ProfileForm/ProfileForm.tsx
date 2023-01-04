import React from "react";
import { Formik } from "formik";
import { validationSchemaEditProfile } from "../../utils/validationSchema";
import * as SQLite from "expo-sqlite";
import { TouchableOpacity, Text, TextInput, View, Alert } from "react-native";
import { SQLError, SQLTransaction } from "expo-sqlite";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ProfileType, setUser } from "../../redux/auth/authSlice";
import { styles } from "./styles";
import { commonStyles } from "../../commonStyles";

const db = SQLite.openDatabase("profileUserDb");

interface IProps {
  profile: ProfileType;
  keyboardHide: () => void;
  setIsShowKeyboard: (v: boolean) => void;
}

const ProfileForm: React.FC<IProps> = ({ profile, setIsShowKeyboard, keyboardHide }) => {
  const dispatch = useAppDispatch();
  const updateData = (values: any) => {
    db.transaction((tx) => {
      const query = `UPDATE profile SET name = '${values.name}',  email = '${values.email}', phone = '${values.phone}', position = '${values.position}', skype = '${values.skype}' WHERE id = ${profile.id}`;
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
  };

  return (
    <Formik
      initialValues={profile}
      validationSchema={validationSchemaEditProfile}
      onSubmit={(values) => {
        keyboardHide();
        updateData(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.dataWrap}>
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Name</Text>
            {errors.name && touched.name ? (
              <Text style={commonStyles.errorMessage}>{errors.name}</Text>
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
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Email</Text>
            {errors.email && touched.email ? (
              <Text style={commonStyles.errorMessage}>{errors.email}</Text>
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
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Phone</Text>
            {errors.phone && touched.phone ? (
              <Text style={commonStyles.errorMessage}>{errors.phone}</Text>
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
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Position</Text>
            {errors.position && touched.position ? (
              <Text style={commonStyles.errorMessage}>{errors.position}</Text>
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
          <View style={commonStyles.inputWrap}>
            <Text style={commonStyles.label}>Skype</Text>
            {errors.skype && touched.skype ? (
              <Text style={commonStyles.errorMessage}>{errors.skype}</Text>
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
            style={{ ...commonStyles.buttonSubmit, marginBottom: 37 }}
          >
            <Text style={styles.submitTitle}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default ProfileForm;
