import React, { useEffect, useRef } from "react";
import { View, ImageBackground, Image, Dimensions, Text } from "react-native";

import { connect } from "react-redux";
import styles from "../assets/styles";
import MyCardStack from "../components/MyCardStack";
import MyCardSwipers from "../components/MyCardSwipers";
import { onSwipe, onSwipeBack, getUsers } from "../redux/actions/explore";
import { getToken } from "../token.helper";

import MatchedModal from "../components/MatchedModal";

const fullHeight = Dimensions.get("window").height;
const CardsPage = (props) => {
  useEffect(() => {
    props.dispatch(getUsers());
  }, [getToken()]);
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
                // backgroundColor: "#cecece",
              }}
              source={require("../assets/images/dk.png")}
            />
          </View>
        )}
        <MyCardStack navigation={props.navigation} />
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
