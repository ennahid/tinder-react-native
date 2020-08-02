import React, { useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  Text,
  Easing,
  TouchableHighlight,
  Animated,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import styles from "../assets/styles";
import MyCardStack from "../components/MyCardStack";
import { onSwipe, onSwipeBack, getUsers } from "../redux/actions/explore";
import { getToken } from "../token.helper";
import { API_URL } from "../app.json";
import MatchedModal from "../components/MatchedModal";
import FastImage from "react-native-fast-image";

const fullHeight = Dimensions.get("window").height;
const fullWidth = Dimensions.get("window").width;
const CardsPage = (props) => {
  const rippleOne = useRef(new Animated.Value(0)).current;
  const rippleTwo = useRef(new Animated.Value(0)).current;
  const rippleThree = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    runAnimation();
  }, []);
  useEffect(() => {
    if (props.state.exploreReducer.users.length > 0) {
      let images = [];
      // alert(JSON.stringify(props.state?.exploreReducer?.users));
      props.state?.exploreReducer?.users?.map((user) => {
        user.images?.map((myImage) => {
          let objUri = {};
          // objUri["uri"] = `${API_URL}/ff`;
          objUri["uri"] = `${API_URL}/${myImage}`;
          images.push(objUri);
        });
      });
      // alert(JSON.stringify(images));
      try {
        FastImage.preload([
          {
            uri: `${API_URL}/${props.state.loginReducer.userData.images[0]}`,
          },
          ...images,
        ]);
      } catch (e) {
        // alert(e);
      }
    }
    // );
  }, [props.state.exploreReducer.users]);
  useEffect(() => {
    if (props.state.loginReducer.token) {
      props.dispatch(getUsers(props.state.loginReducer.token));
    }
  }, [props.state.loginReducer.token]);

  const runAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(rippleOne, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOne, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rippleTwo, {
          toValue: 1,
          duration: 1000,
          delay: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rippleTwo, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rippleThree, {
          toValue: 1,
          duration: 1000,
          delay: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(rippleThree, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(runAnimation);
  };
  // const gSwiper = useRef(null);
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <MatchedModal
          isVisible={props.state.exploreReducer.matches.length > 0}
          matchs={props.state.exploreReducer.matches}
          image={require("../assets/images/09.jpg")}
        />
        {fullHeight > 700 && (
          <View style={styles.top}>
            <Image
              style={{
                width: 150,
                height: 60,
                resizeMode: "contain",
              }}
              source={require("../assets/images/dk.png")}
            />
          </View>
        )}
        {!props.state.clientsReducer.getLoading &&
          props.state.exploreReducer.users.length < 1 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: fullHeight - fullHeight / 4,
              }}
            >
              <Image
                style={{ opacity: 0.2 }}
                source={require("../assets/images/no-cards.png")}
              />
              <Text style={{ fontSize: 30, fontWeight: "700", marginTop: 20 }}>
                No more cards
              </Text>
              <Text>Please comeback after a few hours.</Text>
            </View>
          )}
        {/* {false ? ( */}
        {!props.state.clientsReducer.getLoading ? (
          //LLLOOOAAAADDDIIIINNNGGGGG
          <MyCardStack navigation={props.navigation} />
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: fullHeight - fullHeight / 4,
            }}
          >
            <View
              style={{
                backgroundColor: "#cecece",
                marginBottom: 15,
                borderRadius: 200,
                borderColor: "#fff",
                borderWidth: 4,
                overflow: "hidden",
                position: "absolute",
                zIndex: 9,
              }}
            >
              <FastImage
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 150,
                  borderColor: "#fff",
                  borderWidth: 0,
                }}
                source={{
                  uri: `${API_URL}/${props.state.loginReducer.userData.images[0]}`,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              {/* <Image
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 150,
                  borderColor: "#fff",
                  borderWidth: 0,
                }}
                resizeMode="cover"
                source={{
                  uri: `${API_URL}/${props.state.loginReducer.userData.images[0]}`,
                }}
              /> */}
            </View>
            <Animated.View
              style={{
                backgroundColor: "#FF3E5675",
                height: fullWidth / 1.9,
                width: fullWidth / 1.9,
                borderRadius: 300,
                opacity: rippleOne,
              }}
            ></Animated.View>
            <Animated.View
              style={{
                backgroundColor: "#FF3E5645",
                height: fullWidth / 1.5,
                width: fullWidth / 1.5,
                borderRadius: 300,
                opacity: rippleTwo,
                position: "absolute",
              }}
            ></Animated.View>
            <Animated.View
              style={{
                backgroundColor: "#FF3E5625",
                height: fullWidth / 1.2,
                width: fullWidth / 1.2,
                borderRadius: 300,
                opacity: rippleThree,
                position: "absolute",
              }}
            ></Animated.View>
            <Text
              style={{ position: "absolute", paddingTop: fullHeight / 1.7 }}
            >
              Looking for people around you...
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;
export default connect(mapStateToProps)(CardsPage);
