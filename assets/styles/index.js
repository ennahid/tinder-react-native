import { StyleSheet, Dimensions } from "react-native";

const PRIMARY_COLOR = "#7444C0";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const LIGHTGREY = "#F7F7F7";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

const STAR_ACTIONS = "#FFA200";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#737373";
const FLASH_ACTIONS = "#5028D7";

const MY_ROSE = "#FF3E56";
const MY_BLUE = "#38537C";
const MY_GREY = "#C2C2C2";

const ICON_FONT = "tinderclone";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  // COMPONENT - CARD ITEM
  containerCardItem: {
    backgroundColor: WHITE,
    borderRadius: 8,
    alignItems: "center",
    margin: 0,
    marginTop: 20,
    shadowOpacity: 0.05,
    shadowRadius: 13,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
    // overflow: "hidden",
    position: "relative",
    borderColor: "#c7c7c7",
    borderWidth: 1,
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    fontFamily: ICON_FONT,
    color: WHITE,
  },
  descriptionCardItem: {
    color: GRAY,
    textAlign: "center",
    paddingHorizontal: 2,
  },
  status: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    color: GRAY,
    fontSize: 12,
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: OFFLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 15,
    width: "100%",
    height: DIMENSION_HEIGHT,
    // backgroundColor: "red",
    paddingBottom: "15%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    // marginTop: DIMENSION_HEIGHT - 250,
  },
  buttonBorder: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderColor: "#e4e4e4",
    // borderColor: "red",
    borderWidth: 35,
    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: 8,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: WHITE,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 2,
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
    shadowOpacity: 0.2,
    // shadowRadius: 20,
    // shadowColor: DARK_GRAY,
    // shadowOffset: { height: 15, width: 0 },
  },
  miniButtonBorder: {
    width: 55,
    height: 55,
    borderRadius: 90,
    borderColor: "#e4e4e4",
    borderWidth: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 90,
    backgroundColor: WHITE,
    marginHorizontal: 3,
    alignItems: "center",
    borderColor: LIGHTGREY,
    borderWidth: 1,
    justifyContent: "center",
    shadowRadius: 1,
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
    shadowOpacity: 0.1,
  },
  star: {
    fontFamily: ICON_FONT,
    color: STAR_ACTIONS,
    fontSize: 20,
  },
  like: {
    fontSize: 25,
    fontFamily: ICON_FONT,
    color: MY_ROSE,
  },
  dislike: {
    fontSize: 25,
    fontFamily: ICON_FONT,
    color: DISLIKE_ACTIONS,
  },
  flash: {
    fontFamily: ICON_FONT,
    color: FLASH_ACTIONS,
  },

  // COMPONENT - CITY
  city: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 90,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  cityText: {
    fontFamily: ICON_FONT,
    color: DARK_GRAY,
    fontSize: 13,
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 70,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  filtersText: {
    fontFamily: ICON_FONT,
    color: DARK_GRAY,
    fontSize: 13,
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
  message: {
    color: GRAY,
    fontSize: 12,
    paddingTop: 5,
  },

  // COMPONENT - PROFILE ITEM
  containerProfileItem: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    width: 131,
    marginTop: -15,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    fontFamily: ICON_FONT,
    color: WHITE,
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: DARK_GRAY,
    fontSize: 15,
    textAlign: "center",
  },
  descriptionProfileItem: {
    color: GRAY,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfile: {
    fontFamily: ICON_FONT,
    fontSize: 12,
    color: DARK_GRAY,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: GRAY,
    fontSize: 13,
  },

  // CONTAINER - GENERAL
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
  },
  top: {
    // paddingVertical: "10%",
    paddingTop: "3%",
    paddingBottom: "0%",
    // height: "30%",
    marginHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },
  icon: {
    fontFamily: ICON_FONT,
    fontSize: 20,
    color: DARK_GRAY,
    paddingRight: 10,
  },

  // CONTAINER - HOME
  containerHome: {
    position: "relative",
    marginHorizontal: 10,
    // backgroundColor: "blue",
  },
  containerCardInfo: {
    position: "relative",
    marginHorizontal: 0,
  },

  // CONTAINER - MATCHES
  containerMatches: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - MESSAGES
  containerMessages: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - PROFILE
  containerProfile: { marginHorizontal: 0 },
  photo: {
    width: DIMENSION_WIDTH,
    height: 450,
  },
  topIconLeft: {
    fontFamily: ICON_FONT,
    fontSize: 20,
    color: WHITE,
    paddingLeft: 20,
    marginTop: -20,
    transform: [{ rotate: "90deg" }],
  },
  topIconRight: {
    fontFamily: ICON_FONT,
    fontSize: 20,
    color: WHITE,
    paddingRight: 20,
  },
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: { fontFamily: ICON_FONT, fontSize: 20, color: WHITE },
  textButton: {
    fontFamily: ICON_FONT,
    fontSize: 15,
    color: WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 20,
  },

  // MENU
  tabButton: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabButtonText: {
    textTransform: "uppercase",
  },
  iconMenu: {
    fontFamily: ICON_FONT,
    height: 28,
    paddingBottom: 0,
    paddingTop: 5,
    color: "#ececec",
  },
  //INPUTs
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    shadowColor: "#00000001",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.005,
    shadowRadius: 15,
    elevation: 15,
    borderRadius: 9,
    marginBottom: 15,
    height: 60,
    overflow: "hidden",
    width: "100%",
    // backgroundColor: "#f00",
    // backgroundColor: "#0000",
  },
  myButtonContainer: {
    height: 55,
    overflow: "hidden",
    width: "100%",
    backgroundColor: MY_ROSE,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  myButtonText: {
    // backgroundColor: "green",
    // height: "100%",
    // width: "100%",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textTransform: "uppercase",
  },
  myInput: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderColor: "#fff",
    paddingHorizontal: 16,
    // paddingVertical: 17,
    height: "100%",
    // padding: 16,
    // backgroundColor: "#f00",
    // height: 130,
    // width: "100%",
    fontSize: 15,
  },
  myText: {
    color: MY_BLUE,
  },
  checkboxContainer: {
    // backgroundColor: "#ccc",
    // height: 100,
    width: "100%",
    marginBottom: 10,
  },
  NextPageButton: {
    marginHorizontal: 5,
    marginVertical: 25,
  },
  primaryButton: {
    backgroundColor: MY_ROSE,
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 6,
  },
  secondayButton: {
    // backgroundColor: PRIMARY_COLOR,
    width: "100%",
    paddingVertical: 17,
    alignItems: "center",
    marginVertical: 5,
    borderWidth: 3,
    borderRadius: 6,
    borderColor: "#fff",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  CardItemProfileInfo: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: " 100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "relative",
  },
  CardItemNameStyle: {
    color: "#363636",
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 5,
  },
  CardItemLocationStyle: {
    // fontStyle: "italic",
    color: "#C4C4C4",
  },
});
