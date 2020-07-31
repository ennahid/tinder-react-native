import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "../assets/styles";
import { connect } from "react-redux";
import Icon from "./Icon";
import VIcon from "react-native-vector-icons/dist/Ionicons";
import AIcon from "react-native-vector-icons/dist/AntDesign";
import {
  onSwipe,
  onSwipeBack,
  DeleteAllDislikes,
} from "../redux/actions/explore";
import { set } from "react-native-reanimated";

const MyCardSwipers = ({ state, dispatch, swiper, position }) => {
  const [lastSwipeDirection, setLastSwipeDirection] = useState([]);
  const [isSwiping, setIsSwiping] = useState(true);
  useEffect(() => {
    // setTimeout(() => setIsSwiping(true), 300);
    // return () => {
    //   setIsSwiping(true);
    // };
  }, [isSwiping]);
  const swipeAction = (direction) => {
    if (isSwiping === true && swiper) {
      // setIsSwiping(false);
      switch (direction) {
        case "top":
          swiper.swipeTop();
          return;
        case "left":
          swiper.swipeLeft();
          return;
        case "right":
          swiper.swipeRight();
          return;
        default:
          return;
      }
    }
  };
  const swipeBackAction = (direction) => {
    dispatch(onSwipeBack());
    switch (direction) {
      case "top":
        swiper.goBackFromTop();
        return;
      case "left":
        swiper.goBackFromLeft();
        return;
      case "right":
        swiper.goBackFromRight();
        return;
      default:
        return;
    }
  };
  return (
    <>
      <View
        style={[
          styles.actionsCardItem,
          // state.clientsReducer.getLoading ? { display: "none" } : {},
        ]}
      >
        <View style={styles.miniButtonBorder}>
          <TouchableOpacity
            style={styles.miniButton}
            // onPress={() => swipeAction("top")}
            onPress={() => dispatch(DeleteAllDislikes())}
          >
            <Text style={styles.star}>
              {/* <VIcon name="flash" style={{ fontSize: 20 }} /> */}
              <AIcon name={"star"} size={20} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonBorder]}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => swipeAction("left")}
          >
            <Text style={styles.like}>
              {/* <Icon name="like" /> */}
              <AIcon name={"heart"} size={24} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBorder}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => swipeAction("right")}
          >
            <Text style={styles.dislike}>
              <Icon name="dislike" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.miniButtonBorder}>
          <TouchableOpacity
            style={styles.miniButton}
            onPress={() =>
              swipeBackAction(state.exploreReducer.lastSwipe?.direction)
            }
          >
            <Text style={styles.flash}>
              {/* <Icon name="star" /> */}
              <VIcon name="refresh-sharp" style={{ fontSize: 20 }} />
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Text>{position}</Text> */}
      </View>
    </>
  );
};
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(MyCardSwipers);
// export default MyCardSwipers;
