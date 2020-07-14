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
const CardItem = ({
  actions,
  index,
  description,
  image,
  matches,
  name,
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
  const fullHeight = Dimensions.get("window").height;

  const imageStyle = [
    {
      // borderRadius: "8 8 0 0",
      width: fullWidth - 20,
      height: fullWidth - 80,
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
      <TouchableHighlight onPress={() => navigate("CardsInfoPage", { index })}>
        {/* <Text>Navigate</Text> */}
        <SharedElement id={index}>
          <Image
            // source={{ uri: `${API_URL}/${image}` }}
            source={{
              uri: `https://img.freepik.com/free-vector/business-people-organization-office-freelance-job-character_40876-1291.jpg?size=338&ext=jpg`,
            }}
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
      <View style={Lstyles.profileInfo}>
        <Text style={Lstyles.nameStyle}>
          {name}, {"26"}
        </Text>
        <Text style={Lstyles.locationStyle}>{API_URL + "/" + image}</Text>
        <Text style={Lstyles.locationStyle}>Casablanca</Text>
      </View>

      {/* DESCRIPTION */}
      {fullHeight > 700 && description && (
        <Text style={styles.descriptionCardItem}>{description}</Text>
      )}

      {/* STATUS */}
      {status && (
        <View style={styles.status}>
          <View style={status === "Online" ? styles.online : styles.offline} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <View style={styles.miniButtonBorder}>
            <TouchableOpacity
              style={styles.miniButton}
              onPress={() => onPressBack()}
            >
              <Text style={styles.star}>
                <Icon name="star" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonBorder}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPressLeft()}
            >
              <Text style={styles.like}>
                <Icon name="like" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonBorder}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onPressRight()}
            >
              <Text style={styles.dislike}>
                <Icon name="dislike" />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.miniButtonBorder}>
            <TouchableOpacity
              style={styles.miniButton}
              onPress={() => onSuperLike()}
            >
              <Text style={styles.flash}>
                <Icon name="flash" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const Lstyles = StyleSheet.create({
  profileInfo: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: " 100%",
    padding: 20,
  },
  nameStyle: {
    color: "#363636",
    fontSize: 23,
    fontWeight: "500",
  },
  locationStyle: {
    fontStyle: "italic",
    color: "#ccc",
  },
});

// export default CardItem;
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default MatchedModal;
export default connect(mapStateToProps)(CardItem);
