import { StyleSheet, StatusBar } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    paddingBottom: 110,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: Platform.OS === "ios" ? 100 : 50,
    fontFamily: "Poppins-Regular",
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
  errorMessage: {
    position: "absolute",
    top: 20,
    left: 0,
    fontWeight: "400",
    fontSize: 16,
    color: "#d52121",
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

  buttonSubmit: {
    width: "100%",
    backgroundColor: "#FFC612",
    borderRadius: 20,
    paddingVertical: 17,
    marginTop: 50,
  },
});
