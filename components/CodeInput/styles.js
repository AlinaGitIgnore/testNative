import { StyleSheet, Platform } from "react-native";

export const CELL_SIZE = 48;
export const CELL_BORDER_RADIUS = 15;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#1F1D1D";
export const ACTIVE_CELL_BG_COLOR = "#fff";
export const DEFAULT_CELL_BORDER_COLOR = "#D7D7D7";
export const ACTIVE_CELL_BORDER_COLOR = "#FFC612";

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 15,
    justifyContent: "flex-start",
  },
  cell: {
    marginRight: 25,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 16,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#1F1D1D",
    borderColor: "#D7D7D7",
    borderWidth: 1,
  },

  // =======================

  root: {
    paddingTop: 15,
    marginTop: 40,
  },

  subTitle: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    textTransform: "capitalize",
    color: "#9795A4",
  },
});

export default styles;
