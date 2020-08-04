import React from "react";
import styles from "../assets/styles";

// import { Text, TouchableOpacity } from "react-native";
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  ImageBackground,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "./Icon";

const Header = ({ title, description }) => {
  return (
    <View style={[styles.pageHeader]}>
      <Text style={[styles.pageHeaderTitle]}>
        {title}
        {/* {state.chatReducer.loadingConversations ? "Loading..." : ""} */}
      </Text>
      {/* <Text style={{ fontSize: 13, opacity: 0.7 }}>
        You can find all the people you matched with here.
      </Text> */}
    </View>
  );
};

export default Header;
