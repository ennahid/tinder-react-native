import React from "react";
import styles from "../assets/styles";
import FastImage from "react-native-fast-image";
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import moment from "moment";

const fullWidth = Dimensions.get("window").width;
const gradientHeight = 500;
const gradientBackground = "purple";
const MatchCard = ({ image, name, navigate }) => {
  return (
    <TouchableNativeFeedback
      onPress={navigate}
      style={{
        margin: 5,
      }}
    >
      <View
        style={{
          width: (fullWidth - 30) / 2,
          height: fullWidth / 2,
          position: "relative",
          backgroundColor: "#000",
          borderRadius: 10,
          overflow: "hidden",
          // margin: 10,
        }}
      >
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: image }}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.9,
          }}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            fontWeight: "400",
            color: "#fff",
            fontSize: 18,
            textShadowColor: "#404040",
            textShadowOffset: { height: 1, width: 1 },
            textShadowRadius: 5,
            textTransform: "capitalize",
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MatchCard;
