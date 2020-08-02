import React, { version, useEffect, useRef, useState } from "react";
import styles from "../assets/styles";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Easing,
  // Modal,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "./Icon";
import { API_URL } from "../app.json";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { onMatchViewed } from "../redux/actions/explore";
import FastImage from "react-native-fast-image";

const fullHeight = Dimensions.get("window").height;
const fullWidth = Dimensions.get("window").width;
const MatchedModal = ({ matches, image, dispatch, state }) => {
  const [isVisibleState, setIsVisibleState] = useState(false);
  const slideFromLeft = useRef(new Animated.Value(-fullWidth / 20)).current;
  const slideFromRight = useRef(new Animated.Value(fullWidth / 20)).current;
  const slideButtonFromLeft = useRef(new Animated.Value(-fullWidth / 20))
    .current;
  const slideButtonFromRight = useRef(new Animated.Value(fullWidth / 20))
    .current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!isVisibleState) {
      slideFromLeft.setValue(-fullWidth / 20);
      slideFromRight.setValue(fullWidth / 20);
      slideButtonFromLeft.setValue(-fullWidth / 20);
      slideButtonFromRight.setValue(fullWidth / 20);
      opacityAnim.setValue(0);
    }
    if (state.exploreReducer.matches.length > 0) {
      setIsVisibleState(true);
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          delay: 200,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(slideFromLeft, {
          toValue: 10,
          duration: 500,
          delay: 300,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideFromRight, {
          toValue: -10,
          duration: 500,
          delay: 300,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideButtonFromLeft, {
          toValue: 0,
          duration: 200,
          delay: 500,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideButtonFromRight, {
          toValue: 0,
          duration: 200,
          delay: 500,
          easing: Easing.out(Easing.ease),
        }),
      ]).start(() => {});
    }
  }, [state.exploreReducer.matches]);

  const CloseModal = () => {
    setIsVisibleState(false);
    dispatch(onMatchViewed());
  };
  return (
    <Modal
      isVisible={isVisibleState}
      style={Lstyles.modal}
      useNativeDriver={true}
      backdropColor={"#000"}
      backdropOpacity={0.9}
      hasBackdrop={true}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      {isVisibleState && (
        <View style={Lstyles.modalPage}>
          <FastImage
            source={require("../assets/images/its-a-match.png")}
            style={{ position: "absolute", top: 0, height: 200, width: 200 }}
            // resizeMode={"contain"}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={Lstyles.imagesContaier}>
            <Animated.View
              style={[
                Lstyles.block,
                { opacity: opacityAnim, translateX: slideFromLeft },
              ]}
            >
              <FastImage
                source={
                  state.loginReducer.userData.images[0]
                    ? {
                        uri: `${API_URL}/${state.loginReducer.userData.images[0]}`,
                      }
                    : require("../assets/images/image-place-holder.png")
                }
                style={Lstyles.MatchedImage}
                resizeMode={FastImage.resizeMode.cover}
              />
              {/* <Image
                source={
                  state.loginReducer.userData.images[0]
                    ? {
                        uri: `${API_URL}/${state.loginReducer.userData.images[0]}`,
                      }
                    : require("../assets/images/image-place-holder.png")
                }
                style={Lstyles.MatchedImage}
              /> */}
            </Animated.View>
            <Animated.View
              style={[
                Lstyles.block,
                { opacity: opacityAnim, translateX: slideFromRight },
              ]}
            >
              <FastImage
                source={
                  state.exploreReducer.matchesImages[0]
                    ? {
                        uri: `${API_URL}/${state.exploreReducer.matchesImages[0]}`,
                      }
                    : require("../assets/images/image-place-holder.png")
                }
                style={Lstyles.MatchedImage}
                resizeMode={FastImage.resizeMode.cover}
              />
              {/* <Image
                source={
                  state.exploreReducer.matchesImages[0]
                    ? {
                        uri: `${API_URL}/${state.exploreReducer.matchesImages[0]}`,
                      }
                    : require("../assets/images/image-place-holder.png")
                }
                style={Lstyles.MatchedImage}
              /> */}
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
                onPress={() => CloseModal()}
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
                onPress={() => CloseModal()}
                style={styles.secondayButton}
              >
                <Text style={styles.buttonText}>KEEP SWIPING</Text>
              </TouchableHighlight>
            </Animated.View>
          </View>
        </View>
      )}
    </Modal>
  );
};

const Lstyles = StyleSheet.create({
  modal: {
    // backgroundColor: "green",
    // height: fullHeight,
    // width: fullWidth,
    // left: 0,
    // top: 0,
    // bottom: 0,
    // right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPage: {
    // position: "absolute",
    height: fullHeight,
    width: fullWidth,
    zIndex: 9,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    // borderWidth: 5,
    // borderColor: "green",
    justifyContent: "center",
    // paddingBottom: 100,
    // backgroundColor: "red",
    position: "relative",
  },
  overlayContainer: {
    position: "absolute",
    width: "100%",
    height: fullHeight,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    // backgroundColor: "#000",
    // height: fullHeight + 5,
    // width: fullWidth + 5,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
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
