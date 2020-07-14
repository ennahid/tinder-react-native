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

import { connect } from "react-redux";
// import styles from "../assets/styles";

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
      <SharedElement id={getParam("index")}>
        <Image
          source={Demo[getParam("index")].image}
          resizeMode={"cover"}
          style={imageStyle}
        />
      </SharedElement>
      <View style={styles.container}>
        <Text style={styles.title}>Tiny House</Text>
        <View style={styles.details}>
          {/* <Icon name="star" color="rgb(255, 56, 92)" size={18} /> */}
          <Text style={styles.detailText}>4.93 (891)</Text>
          {/* <Icon name="medal" color="rgb(255, 56, 92)" size={18} /> */}
          <Text style={styles.detailText}>4.93 (891)</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Light and airy living room interior of tiny home in Upstate, New
            York.
          </Text>
          <View style={styles.smallDivider} />
          <View style={styles.host}>
            <View>
              <Text style={styles.mediumText}>Tiny House</Text>
              <Text style={styles.mediumText}>Hosted by Eliza</Text>
            </View>
            {/* <Image
              style={styles.avatar}
              source={require("../assets/host.jpg")}
            /> */}
          </View>
          <View style={styles.divider} />
          <Text style={styles.text}>
            Lovely tiny house with its own 3 piece bathroom, living room with
            flat screen TV and kitchenette. Has its own deck, barbecue and
            entranceway overlooking the meadow. No pets.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
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
  const item = navigation.getParam("index");
  return [item];
};

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;

export default connect(mapStateToProps)(CardsInfoPage);
