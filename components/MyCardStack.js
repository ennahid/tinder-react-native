import React, { useEffect } from "react";
import CardStack, { Card } from "react-native-card-stack-swiper";
import CardItem from "./CardItem";
import Demo from "../assets/data/demo.js";
import styles from "../assets/styles";
import { onSwipe, onSwipeBack, getUsers } from "../redux/actions/explore";
import { Text, View, Image } from "react-native";
import MyCardSwipers from "./MyCardSwipers";
import { connect } from "react-redux";

const MyCardStack = ({ dispatch, state }) => {
  useEffect(() => {}, []);

  const swipeAction = (direction, userId) => {
    dispatch(onSwipe(direction, userId));
    // alert("ff");
  };
  return (
    <>
      <CardStack
        onSwipedAll={() => console.log("this is all")}
        disableBottomSwipe={true}
        duration={150}
        renderNoMoreCards={() => null}
        ref={(swiper) => (this.gSwiper = swiper)}
      >
        {state.exploreReducer.users?.map((item, index) => (
          <Card
            key={index}
            onSwipedRight={() => swipeAction("right", item._id)}
            onSwipedLeft={() => swipeAction("left", item._id)}
            onSwipedTop={() => swipeAction("top", item._id)}
          >
            <CardItem
              image={Demo[0].image}
              name={item.email}
              description={Demo[0].description}
              matches={Demo[0].match}
            />
          </Card>
        ))}
      </CardStack>
      <MyCardSwipers swiper={this.gSwiper} />
    </>
  );
};
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(MyCardStack);
