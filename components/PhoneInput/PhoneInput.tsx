import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ArrowDownSVG from "../../assets/arrowDown.svg";

const PhoneInputComponent = () => {
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <View>
        <SafeAreaView>
          {showMessage && (
            <View style={styles.message}>
              <Text>Country Code : {countryCode}</Text>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? "true" : "false"}</Text>
            </View>
          )}
          <ArrowDownSVG width={10} height={5} style={styles.openSelect} />
          <PhoneInput
            countryPickerButtonStyle={{ width: 70, marginRight: 35 }}
            containerStyle={styles.containerStyle}
            disableArrowIcon={true}
            textInputStyle={styles.textInputStyle}
            codeTextStyle={styles.codeTextStyle}
            textContainerStyle={styles.textContainerStyle}
            ref={phoneInput}
            defaultValue={value}
            defaultCode='IN'
            layout='second'
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setCountryCode(phoneInput.current?.getCountryCode() || "");
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            disabled={disabled}
            withDarkTheme={false}
            autoFocus
          />
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              setCountryCode(phoneInput.current?.getCountryCode() || "");
              let getNumberAfterPossiblyEliminatingZero =
                phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
              console.log(getNumberAfterPossiblyEliminatingZero);
            }}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, disabled ? {} : styles.redColor]}
            onPress={() => {
              setDisabled(!disabled);
            }}
          >
            <Text style={styles.buttonText}>{disabled ? "Activate" : "Disable"}</Text>
          </TouchableOpacity> */}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7CDB8A",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  redColor: {
    backgroundColor: "#F57777",
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  containerStyle: {
    padding: 0,
    marginTop: 15,
    flex: 1,
    shadowColor: "none",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { height: 0, width: 0 },
    elevation: 0,
  },

  codeTextStyle: {
    width: 70,
    height: 48,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 15,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#9795A4",
    marginRight: 0,
    textAlignVertical: "center",
    textAlign: "left",
    padding: 12,
  },
  textContainerStyle: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  textInputStyle: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#9795A4",
    textAlignVertical: "center",
    textAlign: "left",
  },

  openSelect: {
    position: "absolute",
    top: 37,
    left: 45,
    zIndex: 100,
  },
});

export default PhoneInputComponent;
