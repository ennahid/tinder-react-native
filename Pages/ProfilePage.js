import React, { Children } from "react";
import styles from "../assets/styles";

import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "react-navigation-hooks";
import FIcon from "react-native-vector-icons/dist/Feather";
import IIcon from "react-native-vector-icons/dist/Ionicons";
import { API_URL } from "../app.json";
const fullWidth = Dimensions.get("window").width;

const ButtonWIthIcon = ({
  bgColor,
  name,
  description,
  children,
  navigateTo,
}) => {
  const { navigate, isFocused } = useNavigation();
  return (
    <TouchableNativeFeedback
      onPress={() => (navigateTo ? navigate(navigateTo) : null)}
    >
      <View style={Lstyles.profileNavigationButton}>
        <View
          style={{
            backgroundColor: bgColor ? bgColor : "#cecece",
            padding: 8,
            borderRadius: 4,
            marginRight: 20,
          }}
        >
          {children}
        </View>
        <View>
          <Text style={Lstyles.profileNavigationButtonTitle}>{name}</Text>
          <Text style={Lstyles.profileNavigationButtonDescription}>
            {description}
          </Text>
        </View>
        <View style={Lstyles.profileNavigationButtonNavIconHolder}>
          <FIcon
            style={Lstyles.profileNavigationButtonNavIcon}
            name={"chevron-right"}
            size={20}
            color={"#C4C4C4"}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const ProfilePage = (props) => {
  const { navigate, isFocused } = useNavigation();
  return (
    <ScrollView style={Lstyles.containerProfile}>
      <TouchableWithoutFeedback onPress={() => navigate("ProfileEditor")}>
        <View style={Lstyles.topPage}>
          <Image
            style={Lstyles.topPageBgImage}
            blurRadius={2}
            resizeMode="cover"
            source={{
              uri: `${API_URL}/${props.state.loginReducer.userData.images[0]}`,
            }}
          />
          <View style={Lstyles.topPageCenterImageHolder}>
            <View
              style={{
                backgroundColor: "#cecece",
                marginBottom: 15,
                borderRadius: 200,
                borderColor: "#fff",
                borderWidth: 2,
                overflow: "hidden",
              }}
            >
              <Image
                style={Lstyles.topPageCenterImage}
                resizeMode="cover"
                source={{
                  uri: `${API_URL}/${props.state.loginReducer.userData.images[0]}`,
                }}
              />
              {/* <Image
                style={Lstyles.topPageCenterImage}
                resizeMode="cover"
                source={require("../assets/images/image-place-holder.png")}
              /> */}
            </View>
            <Text style={Lstyles.headerName}>
              {props.state.loginReducer.userData.name}
            </Text>
            <Text style={Lstyles.headerAction}>Tap to Edit/View</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ButtonWIthIcon
        navigateTo={"SeetingsPage"}
        name={"Settings"}
        description="Edit your prefrences"
      >
        <FIcon size={15} name={"settings"} color={"#fff"} />
      </ButtonWIthIcon>
      <ButtonWIthIcon
        navigateTo={"ProfileInfoPage"}
        bgColor={"#259bff"}
        name={"Profile"}
        description="Edit name, birthday"
      >
        <IIcon size={15} name={"ios-person-outline"} color={"#fff"} />
      </ButtonWIthIcon>
      <ButtonWIthIcon
        bgColor={"#3be68f"}
        name={"About Us"}
        description="See our latest updates"
      >
        <IIcon size={15} name={"book"} color={"#fff"} />
      </ButtonWIthIcon>
      <View style={{ marginVertical: 25 }}></View>

      <TouchableNativeFeedback>
        <View style={Lstyles.ProfilePageButton}>
          <Text style={Lstyles.ProfilePageButtonText}>Delete account</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback>
        <View
          style={[Lstyles.ProfilePageButton, { backgroundColor: "#e63b3b" }]}
        >
          <Text style={[Lstyles.ProfilePageButtonText, { color: "#fff" }]}>
            sign out
          </Text>
        </View>
      </TouchableNativeFeedback>
      <View style={{ marginVertical: 15 }}></View>
    </ScrollView>
  );
};

const Lstyles = StyleSheet.create({
  containerProfile: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topPage: {
    height: 250,
    width: "100%",
    backgroundColor: "#FF3E56",
    position: "relative",
  },
  topPageBgImage: {
    height: "100%",
    width: "100%",
    opacity: 0.3,
  },
  topPageCenterImageHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  topPageCenterImage: {
    height: 100,
    width: 100,
    borderRadius: 150,
    borderColor: "#fff",
    borderWidth: 0,
  },
  headerName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },
  headerAction: {
    color: "#fff",
    fontSize: 14,
  },
  profileNavigationButton: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    borderBottomColor: "#F1F1F1",
    borderBottomWidth: 1,
  },
  profileNavigationButtonTitle: {
    color: "#000",
    fontSize: 20,
  },
  profileNavigationButtonDescription: {
    color: "#C4C4C4",
    fontSize: 15,
  },
  profileNavigationButtonNavIconHolder: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "10%",
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ProfilePageButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ececec",
    borderRadius: 4,
    margin: 5,
    marginHorizontal: 30,
    alignItems: "center",
  },
  ProfilePageButtonText: {
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;

export default connect(mapStateToProps)(ProfilePage);
