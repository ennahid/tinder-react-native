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
const CardsInfoPage = (props) => {
  useEffect(() => {
    // alert(JSON.stringify(props));
    props.dispatch(getUsers());
  }, [getToken()]);
  // const gSwiper = useRef(null);
  return (
    <View>
      <Text>hello world</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;
export default connect(mapStateToProps)(CardsInfoPage);
