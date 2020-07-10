import React from "react";
import CardStack, { Card } from "react-native-card-stack-swiper";
import CardItem from "./CardItem";
import Demo from "../assets/data/demo.js";
import styles from "../assets/styles";

import { Text, View, Image } from "react-native";

const MyCardStack = () => {
  return (
    <CardStack
      loop={true}
      onSwipedAll={() => console.log("this is all")}
      verticalSwipe={false}
      renderNoMoreCards={() => null}
      ref={(swiper) => (this.swiper = swiper)}
    >
      {Demo.map((item, index) => (
        <Card key={index}>
          <CardItem
            image={item.image}
            name={item.name}
            description={item.description}
            matches={item.match}
            actions
            onPressLeft={() => this.swiper.swipeLeft()}
            onPressRight={() => this.swiper.swipeRight()}
            onSuperLike={() => this.swiper.swipeTop()}
            onPressStar={() => this.swiper.swipeBottom()}
          />
        </Card>
      ))}
    </CardStack>
  );
};

export default MyCardStack;
