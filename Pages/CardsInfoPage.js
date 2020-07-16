import React, { useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import Demo from "../assets/data/demo.js";
import { useNavigation } from "react-navigation-hooks";
import { API_URL } from "../app.json";

import { connect } from "react-redux";
import Gstyles from "../assets/styles";

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;
const imageStyle = [
  {
    // borderRadius: "8 8 0 0",
    width: fullWidth,
    height: fullWidth - 80,
    // height: 200,
    margin: 0,
  },
];
const CardsInfoPage = (props) => {
  const { navigate, isFocused, getParam } = useNavigation();
  // const gSwiper = useRef(null);
  return (
    <View style={styles.containerCardInfo}>
      <SharedElement id={getParam("item").index}>
        <Image
          source={{ uri: `${API_URL}/${getParam("item").image}` }}
          resizeMode={"cover"}
          style={imageStyle}
        />
      </SharedElement>
      <View style={styles.container}>
        <View style={Gstyles.CardItemProfileInfo}>
          <Text style={Gstyles.CardItemNameStyle}>
            {getParam("item").name || ""}, {"26"}
          </Text>
          {/* <Text style={Gstyles.locationStyle}>{API_URL + "/" + image}</Text> */}
          <Text style={Gstyles.CardItemLocationStyle}>Casablanca</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // overflow: "hidden",
    backgroundColor: "#fff",
    height: fullHeight,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "CerealBook",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealBook",
    overflow: "hidden",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailText: {
    fontFamily: "CerealBook",
    fontSize: 14,
    color: "grey",
    marginLeft: 4,
    marginRight: 16,
  },
  smallDivider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
    width: fullWidth * 0.25,
  },
  divider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
  },
  host: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2,
  },
  mediumText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealMedium",
  },
});

CardsInfoPage.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam("item");
  return [{ item: item, animation: "move" }];
};

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;

export default connect(mapStateToProps)(CardsInfoPage);
