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

const fullHeight = Dimensions.get("window").height;
const CardsPage = (props) => {
  const rippleOne = useRef(new Animated.Value(0)).current;
  const rippleTwo = useRef(new Animated.Value(0)).current;
  const rippleThree = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    runAnimation();
  }, []);
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
          duration: 2000,
          useNativeDriver: true,
          // delay: 1000,
        }),
        Animated.timing(rippleOne, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rippleTwo, {
          toValue: 1,
          duration: 2000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleTwo, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rippleThree, {
          toValue: 1,
          duration: 2000,
          delay: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(rippleThree, {
          toValue: 0.4,
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
              <Image
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
              />
            </View>
            <Animated.View
              style={{
                backgroundColor: "#FF3E5675",
                height: 300,
                width: 300,
                borderRadius: 300,
                scaleX: rippleOne,
                scaleY: rippleOne,
                position: "absolute",
                opacity: 0.5,
              }}
            ></Animated.View>
            <Animated.View
              style={{
                backgroundColor: "#FF3E5675",
                height: 300,
                width: 300,
                borderRadius: 300,
                scaleX: rippleTwo,
                scaleY: rippleTwo,
                opacity: 0.5,
                position: "absolute",
              }}
            ></Animated.View>
            <Animated.View
              style={{
                backgroundColor: "#FF3E5675",
                height: 300,
                width: 300,
                borderRadius: 300,
                scaleX: rippleThree,
                scaleY: rippleThree,
                opacity: 0.5,
                position: "absolute",
              }}
            ></Animated.View>
            <Text style={{ position: "absolute", paddingTop: fullHeight / 2 }}>
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
