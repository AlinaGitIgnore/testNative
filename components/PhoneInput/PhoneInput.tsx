import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import ArrowDownSVG from "../../assets/arrowDown.svg";

interface IProps {
  setValue: (v: string) => void;
}

const PhoneInputComponent: React.FC<IProps> = ({ setValue }) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);

  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    const checkValid = phoneInput.current?.isValidNumber(phone);
    setValid(checkValid ? checkValid : false);
    setCountryCode(phoneInput.current?.getCountryCode() || "");
    let getNumberAfterPossiblyEliminatingZero =
      phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    const newNumber = getNumberAfterPossiblyEliminatingZero?.formattedNumber;
    if (newNumber) {
      setValue(newNumber);
    } else {
      setValue("");
    }
  }, [phone]);

  return (
    <>
      <StatusBar barStyle='dark-content' />

      {!valid && (
        <Text style={styles.errorMessage}>
          {formattedValue}
          <Text> not valid!</Text>
        </Text>
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
        defaultValue={phone}
        layout='second'
        defaultCode='UA'
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
          setCountryCode(phoneInput.current?.getCountryCode() || "");
        }}
        countryPickerProps={{ withAlphaFilter: true }}
        disabled={false}
        withDarkTheme={false}
        autoFocus
      />
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
    color: "#9795A4",
    textAlignVertical: "center",
    textAlign: "left",
  },

  openSelect: {
    position: "absolute",
    top: 58,
    left: 55,
    zIndex: 100,
  },
  errorMessage: {
    position: "absolute",
    top: 15,
    right: 15,
    fontWeight: "400",
    fontSize: 16,
    color: "#d52121",
    alignItems: "flex-end",
  },
});

export default PhoneInputComponent;
