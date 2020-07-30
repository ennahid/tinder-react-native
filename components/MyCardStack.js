import React, { useEffect, useState } from "react";
import CardStack, { Card } from "react-native-card-stack-swiper";
import CardItem from "./CardItem";
import Demo from "../assets/data/demo.js";
import styles from "../assets/styles";
import { onSwipe, onSwipeBack, getUsers } from "../redux/actions/explore";
import { Text, View, Image, Button } from "react-native";
import MyCardSwipers from "./MyCardSwipers";
import { connect } from "react-redux";

const MyCardStack = ({ dispatch, state }) => {
  const swipeAction = (direction, userId) => {
    dispatch(onSwipe(direction, userId));
  };

  const getMoreCards = () => {
    setTimeout(() => {
      dispatch(getUsers(state.loginReducer.token));
    }, 200);
  };
  return (
    <>
      <CardStack
        secondCardZoom={0.95}
        onSwipedAll={() => getMoreCards()}
        // onSwipedAll={() => alert("ff")}
        disableBottomSwipe={true}
        duration={150}
        renderNoMoreCards={() => null}
        // verticalSwipe={false}
        // horizontalSwipe={false}
        ref={(swiper) => (this.gSwiper = swiper)}
      >
        {/* <Card
          key={1}
          // onSwipedRight={() => swipeAction("right", item._id)}
          // onSwipedLeft={() => swipeAction("left", item._id)}
          // onSwipedTop={() => swipeAction("top", item._id)}
        >
          <CardItem
            key={1}
            index={1}
            person={state.clientsReducer.userData}
            _id={"fff"}
            images={[Demo.image]}
            // images={state.clientsReducer.userData.images}
            name={"state.clientsReducer.userData.name"}
            description={"state.clientsReducer.userData.bio"}
            birthday={"state.clientsReducer.userData.birthday"}
            matches={1}
          />
        </Card> */}
        {state.exploreReducer.users?.map((item, index) => (
          <Card
            key={index}
            onSwipedRight={() => swipeAction("right", item._id)}
            onSwipedLeft={() => swipeAction("left", item._id)}
            onSwipedTop={() => swipeAction("top", item._id)}
          >
            <CardItem
              key={index}
              index={index}
              person={item}
              _id={item._id}
              images={item.images}
              name={item.name}
              description={item.bio}
              birthday={item.birthday}
              matches={index}
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
