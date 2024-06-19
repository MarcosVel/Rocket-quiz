import { StyleSheet } from "react-native";

import { THEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GREY_800,
  },
  history: {
    paddingVertical: 32,
  },
  swipeable: {
    paddingHorizontal: 32,
  },
  trash: {
    left: 32,
    marginLeft: -32,
    width: 100,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.COLORS.DANGER_LIGHT,
    borderRadius: 6,
    paddingLeft: 30,
  },
});
