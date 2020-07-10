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

const CardItem = ({
  actions,
  description,
  image,
  matches,
  name,
  onPressLeft,
  onPressRight,
  onSuperLike,
  onPressStar,
  status,
  variant,
}) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;
  const fullHeight = Dimensions.get("window").height;
  const imageStyle = [
    {
      // borderRadius: "8 8 0 0",
      width: fullWidth - 20,
      height: fullWidth - 80,
      margin: 0,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={imageStyle} />

      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" /> {matches}% Match!
          </Text>
        </View>
      )}

      {/* NAME */}
      <View style={Lstyles.profileInfo}>
        <Text style={Lstyles.nameStyle}>
          {name}, {"26"}
        </Text>
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
              onPress={() => onPressStar()}
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

export default CardItem;
