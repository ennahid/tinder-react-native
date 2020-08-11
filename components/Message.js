import React from "react";
import styles from "../assets/styles";
import FastImage from "react-native-fast-image";
import { Text, View, Image, TouchableNativeFeedback } from "react-native";
import moment from "moment";

const Message = ({ image, lastSeen, name, userId, message, navigate }) => {
  return (
    <TouchableNativeFeedback onPress={navigate}>
      <View style={styles.containerMessage}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: image }}
          style={styles.avatar}
        />
        <View style={styles.content}>
          <Text
            style={{
              fontWeight: "500",
              marginTop: 3,
              fontSize: 18,
              color: "#484848",
            }}
          >
            {name}
          </Text>
          {/* <Text>
            {JSON.stringify({
              userId: userId,
              "message.sender": message?.sender,
              "message.seen": message?.seen,
              "message.message": message?.message,
            })}
          </Text> */}
          <Text numberOfLines={1} style={styles.message}>
            {moment(lastSeen).fromNow(true)} ago
          </Text>
        </View>

        {message && userId !== message?.sender && !message?.seen && (
          <View
            style={{
              padding: 5,
              borderRadius: 50,
              backgroundColor: "#FF3E56",
              position: "absolute",
              right: "10%",
            }}
          ></View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default Message;
