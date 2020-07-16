import React from "react";
import styles from "../assets/styles";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "./Icon";
import { SharedElement } from "react-navigation-shared-element";
import MatchedModal from "./MatchedModal";
import { connect } from "react-redux";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";
import { API_URL } from "../app.json";
import Gstyles from "../assets/styles";

const CardItem = ({
  actions,
  index,
  description,
  image,
  name,
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
  // const fullHeight = Dimensions.get("window").height;

  const imageStyle = [
    {
      // borderRadius: "8 8 0 0",
      width: fullWidth - 20,
      height: fullWidth - 20,
      // height: fullWidth,
      // height: 200,
      margin: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <TouchableHighlight
        onPress={() =>
          navigate("CardsInfoPage", {
            item: {
              index: index,
              description: description,
              image: image,
              name: name,
            },
          })
        }
      >
        {/* <Text>Navigate</Text> */}
        {/* // source={{
          //   uri: `https://img.freepik.com/free-vector/business-people-organization-office-freelance-job-character_40876-1291.jpg?size=338&ext=jpg`,
          // }} */}
        <SharedElement id={index}>
          <Image
            source={{ uri: `${API_URL}/${image}` }}
            style={imageStyle}
            resizeMode={"cover"}
          />
        </SharedElement>
      </TouchableHighlight>

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
          {name || ""}, {"26"}
        </Text>
        <Text style={Lstyles.locationStyle}>{API_URL + "/" + image}</Text>
        {/* <Text style={Gstyles.CardItemLocationStyle}>Casablanca</Text> */}
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
