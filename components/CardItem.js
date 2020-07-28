import React, { useState, useRef, useEffect } from "react";
import styles from "../assets/styles";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FIcon from "react-native-vector-icons/dist/Feather";
import IIcon from "react-native-vector-icons/dist/Ionicons";
import { SharedElement } from "react-navigation-shared-element";
import MatchedModal from "./MatchedModal";
import { connect } from "react-redux";
import moment from "moment";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";
import { API_URL } from "../app.json";
import Gstyles from "../assets/styles";
import { color } from "react-native-reanimated";
import Demo from "../assets/data/demo.js";
const CardItem = ({
  actions,
  index,
  description,
  images,
  name,
  birthday,
  _id,
  person,
  matches,
  onPressLeft,
  onPressRight,
  onSuperLike,
  onPressBack,
  status,
  variant,
  state,
}) => {
  const { navigate, isFocused } = useNavigation();
  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  // const SlideItem = useRef(null);
  // const fullHeight = Dimensions.get("window").height;

  const imageStyle = [
    {
      width: fullWidth - 20,
      height: fullWidth - 20,
      margin: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      {images?.length > 1 && (
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 99999,
            backgroundColor: "#000000ad",
            borderRadius: 4,
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FIcon name={"image"} color={"#fff"} size={16} />
          <Text style={{ color: "#fff", marginLeft: 3 }}>{images?.length}</Text>
        </View>
      )}
      <TouchableWithoutFeedback
        onPress={() =>
          navigate("CardsInfoPage", {
            index: index,
          })
        }
      >
        {/* <Text>Navigate</Text> */}
        {/* // source={{
          //   uri: `https://img.freepik.com/free-vector/business-people-organization-office-freelance-job-character_40876-1291.jpg?size=338&ext=jpg`,
          // }} */}
        <SharedElement id={index}>
          <Image
            // source={Demo[3].image}
            source={
              state.exploreReducer.mcarousselCurrentImageId[_id]
                ? {
                    uri: `${API_URL}/${
                      images[state.exploreReducer.mcarousselCurrentImageId[_id]]
                        ? images[
                            state.exploreReducer.mcarousselCurrentImageId[_id]
                          ]
                        : ""
                    }`,
                  }
                : { uri: `${API_URL}/${images[0] ? images[0] : ""}` }
            }
            style={imageStyle}
            resizeMode={"cover"}
          />
        </SharedElement>
      </TouchableWithoutFeedback>

      {/* MATCHES */}
      {/* {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" /> {matches}% Match!
          </Text>
        </View>
      )} */}

      {/* NAME */}
      <View style={Gstyles.CardItemProfileInfo}>
        <Text style={Gstyles.CardItemNameStyle}>
          {name || ""}, {moment().diff(birthday, "years")}
        </Text>

        {/* <Text style={Lstyles.locationStyle}>{API_URL + "/" + image}</Text> */}
        <Text style={Gstyles.CardItemLocationStyle}>
          <IIcon name={"location-outline"} /> Casablanca
        </Text>
        {/* <Text style={Gstyles.CardItemLocationStyle}>
          {state.exploreReducer.currentInex}
        </Text> */}
        {/* <Text style={Gstyles.CardItemLocationStyle}>{index}</Text> */}
      </View>

      {/* DESCRIPTION */}
      {/* {fullHeight > 700 && description && (
        <Text style={styles.descriptionCardItem}>v</Text>
        // <Text style={styles.descriptionCardItem}>{description}</Text>
      )} */}

      {/* STATUS */}
      {/* {status && (
        <View style={styles.status}>
          <View style={status === "Online" ? styles.online : styles.offline} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )} */}
    </View>
  );
};

const Lstyles = StyleSheet.create({});

// export default CardItem;
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default MatchedModal;
export default connect(mapStateToProps)(CardItem);
