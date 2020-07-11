import React, { version, useEffect, useRef } from "react";
import styles from "../assets/styles";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Easing,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "./Icon";
import { connect } from "react-redux";

const fullHeight = Dimensions.get("window").height;
const fullWidth = Dimensions.get("window").width;
const MatchedModal = ({ image }) => {
  const slideFromLeft = useRef(new Animated.Value(-fullWidth / 20)).current;
  const slideFromRight = useRef(new Animated.Value(fullWidth / 20)).current;
  const slideButtonFromLeft = useRef(new Animated.Value(-fullWidth / 20))
    .current;
  const slideButtonFromRight = useRef(new Animated.Value(fullWidth / 20))
    .current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        delay: 200,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(slideFromLeft, {
        toValue: 10,
        duration: 600,
        delay: 300,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideFromRight, {
        toValue: -10,
        duration: 600,
        delay: 300,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideButtonFromLeft, {
        toValue: 0,
        duration: 600,
        delay: 300,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(slideButtonFromRight, {
        toValue: 0,
        duration: 600,
        delay: 300,
        easing: Easing.out(Easing.ease),
      }),
    ]).start(() => {
      // callback
    });
  }, [
    slideFromLeft,
    slideFromRight,
    overlayOpacity,
    opacityAnim,
    slideButtonFromLeft,
    slideButtonFromRight,
  ]);
  return (
    <View style={Lstyles.modalPage}>
      <Animated.View
        style={[Lstyles.overlay, { opacity: overlayOpacity }]}
      ></Animated.View>
      <View style={Lstyles.imagesContaier}>
        <Animated.View
          style={[
            Lstyles.block,
            { opacity: opacityAnim, translateX: slideFromLeft },
          ]}
        >
          <Image source={image} style={Lstyles.MatchedImage} />
        </Animated.View>
        <Animated.View
          style={[
            Lstyles.block,
            { opacity: opacityAnim, translateX: slideFromRight },
          ]}
        >
          <Image source={image} style={Lstyles.MatchedImage} />
        </Animated.View>
      </View>
      <View style={Lstyles.ButtonsContainer}>
        <Animated.View
          style={[
            Lstyles.block,
            { opacity: opacityAnim, translateX: slideButtonFromRight },
          ]}
        >
          <TouchableHighlight
            onPress={() => alert("gg")}
            style={styles.primaryButton}
          >
            <Text style={styles.buttonText}>LET'S CHAT</Text>
          </TouchableHighlight>
        </Animated.View>
        <Animated.View
          style={[
            Lstyles.block,
            { opacity: opacityAnim, translateX: slideButtonFromLeft },
          ]}
        >
          <TouchableHighlight
            onPress={() => alert("gg")}
            style={styles.secondayButton}
          >
            <Text style={styles.buttonText}>KEEP SWIPING</Text>
          </TouchableHighlight>
        </Animated.View>
      </View>
    </View>
  );
};

const Lstyles = StyleSheet.create({
  modalPage: {
    position: "absolute",
    height: fullHeight,
    width: fullWidth,
    zIndex: 9,
    left: -10,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
    // backgroundColor: "red",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: fullHeight,
    backgroundColor: "#000",
    top: 0,
    left: 0,
    // opacity: 0.5,
  },
  imagesContaier: {
    flexDirection: "row",
  },
  MatchedImage: {
    height: fullWidth / 2.5,
    width: fullWidth / 2.5,
    borderColor: "#fff",
    borderRadius: 300,
    borderWidth: 5,
    marginBottom: 100,
  },
  ButtonsContainer: {
    width: "80%",
    position: "absolute",
    height: 260,
    bottom: 0,
    zIndex: 99999,
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default MatchedModal;
export default connect(mapStateToProps)(MatchedModal);
