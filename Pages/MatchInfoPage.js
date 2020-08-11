import React, { useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
  ScrollView,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import IIcon from "react-native-vector-icons/dist/Ionicons";
import FIcon from "react-native-vector-icons/dist/Feather";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Demo from "../assets/data/demo.js";
import { useNavigation } from "react-navigation-hooks";
import { API_URL } from "../app.json";
import moment from "moment";
import { connect } from "react-redux";
import Gstyles from "../assets/styles";
import MCaroussel from "../components/Mcaroussel.js";

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;
const imageStyle = [
  {
    // borderRadius: "8 8 0 0",
    width: fullWidth,
    height: fullWidth,
    // height: 200,
    margin: 0,
  },
];
const MatchInfoPage = ({ state }) => {
  const { navigate, isFocused, getParam } = useNavigation();
  // const gSwiper = useRef(null);
  return (
    <View style={styles.containerCardInfo}>
      <ScrollView>
        <SharedElement id={getParam("item")}>
          {/* <Image
          source={{ uri: `${API_URL}/${getParam("item").image}` }}
          resizeMode={"cover"}
          style={imageStyle}
        /> */}
          <MCaroussel
            width={fullWidth}
            height={fullWidth}
            itemId={getParam("item")._id}
            // onImagePress={(e) => navigate("MatchPage")}
            images={getParam("item").images.map((image) => ({
              uri: `${API_URL}/${image}`,
            }))}
          />
        </SharedElement>
        <View style={styles.container}>
          <View style={Gstyles.CardItemProfileInfo}>
            <Text style={Gstyles.CardItemNameStyle}>
              {getParam("item").name || ""},{" "}
              {moment().diff(getParam("item").birthday, "years") || ""}
            </Text>
            {/* <Text style={Gstyles.locationStyle}>{API_URL + "/" + image}</Text> */}
            <Text style={Gstyles.CardItemLocationStyle}>
              <IIcon name={"location-outline"} /> Casablanca
            </Text>
          </View>
          <View style={styles.spacerLine}></View>
          {/* ------------------------------------------- */}
          {getParam("item").bio ? (
            <>
              <View style={Gstyles.CardItemProfileInfo}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <View style={styles.sectionBlockTop}>
                  <View style={{ paddingRight: 20 }}>
                    <FIcon name={"edit"} color={"#89989b"} size={20} />
                  </View>
                  <Text style={[styles.sectionInfo, { textTransform: "none" }]}>
                    {getParam("item").bio || ""}
                  </Text>
                </View>
              </View>
              <View style={styles.spacerLine}></View>
            </>
          ) : (
            <></>
          )}
          {/* ------------------------------------------- */}
          {getParam("item").job ||
          getParam("item").company ||
          getParam("item").school ? (
            <>
              <View style={Gstyles.CardItemProfileInfo}>
                <Text style={styles.sectionTitle}>Personal Info</Text>
                {getParam("item").job ? (
                  <View style={styles.sectionBlockTop}>
                    <View style={{ paddingRight: 20 }}>
                      <FIcon name={"briefcase"} color={"#89989b"} size={20} />
                    </View>
                    <Text style={styles.sectionInfo}>
                      {getParam("item").job || ""}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {getParam("item").company ? (
                  <View style={styles.sectionBlockTop}>
                    <View style={{ paddingRight: 20 }}>
                      <FIcon name={"briefcase"} color={"#89989b"} size={20} />
                    </View>
                    <Text style={styles.sectionInfo}>
                      {getParam("item").company || ""}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {getParam("item").school ? (
                  <View style={styles.sectionBlockTop}>
                    <View style={{ paddingRight: 20 }}>
                      <FIcon name={"book"} color={"#89989b"} size={20} />
                    </View>
                    <Text style={styles.sectionInfo}>
                      {getParam("item").school || ""}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
              {/* ------------------------------------------- */}
              <View style={styles.spacerLine}></View>
            </>
          ) : (
            <></>
          )}
          {/* ------------------------------------------- */}
          {getParam("item").hashtags.length > 0 && (
            <View style={Gstyles.CardItemProfileInfo}>
              <Text style={styles.sectionTitle}>Hashtags</Text>
              <View style={styles.sectionBlock}>
                <View style={{ paddingRight: 20 }}>
                  <View
                    style={{
                      backgroundColor: "#2c497d",
                      padding: 4,
                      borderRadius: 4,
                    }}
                  >
                    <FIcon name={"hash"} color={"#ffff"} size={14} />
                  </View>
                </View>
                <View
                  style={{
                    width: "90%",
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  {getParam("item").hashtags.map((item) => (
                    <Text
                      key={item}
                      style={[
                        styles.selectedTagItem,
                        { backgroundColor: "#2c497d50", color: "#2c497d" },
                      ]}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          )}
          {/* ------------------------------------------- */}

          {(getParam("item").sports.length > 0 ||
            getParam("item").music.length > 0 ||
            getParam("item").shows.length > 0 ||
            getParam("item").books.length > 0 ||
            getParam("item").foods.length > 0) && (
            <>
              <View style={styles.spacerLine}></View>
              {/* ------------------------------------------- */}
              <View style={Gstyles.CardItemProfileInfo}>
                <Text style={styles.sectionTitle}>Interests</Text>
                {getParam("item").sports.length > 0 && (
                  <View style={[styles.sectionBlock, { paddingVertical: 5 }]}>
                    <View style={{ paddingRight: 20 }}>
                      <View
                        style={{
                          backgroundColor: "#237c3e",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <MIcon name={"dumbbell"} color={"#ffff"} size={14} />
                      </View>
                    </View>
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {getParam("item").sports.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            {
                              backgroundColor: "#237c3e50",
                              color: "#237c3e",
                            },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {getParam("item").music.length > 0 && (
                  <View style={[styles.sectionBlock, { paddingVertical: 5 }]}>
                    <View style={{ paddingRight: 20 }}>
                      <View
                        style={{
                          backgroundColor: "#0400ff",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <FIcon name={"music"} color={"#ffff"} size={14} />
                      </View>
                    </View>
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {getParam("item").music.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            {
                              backgroundColor: "#0400ff50",
                              color: "#0400ff",
                            },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {getParam("item").shows.length > 0 && (
                  <View style={[styles.sectionBlock, { paddingVertical: 5 }]}>
                    <View style={{ paddingRight: 20 }}>
                      <View
                        style={{
                          backgroundColor: "#e06ed7",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <FIcon name={"tv"} color={"#ffff"} size={14} />
                      </View>
                    </View>
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {getParam("item").shows.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            {
                              backgroundColor: "#e06ed750",
                              color: "#e06ed7",
                            },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {getParam("item").foods.length > 0 && (
                  <View style={[styles.sectionBlock, { paddingVertical: 5 }]}>
                    <View style={{ paddingRight: 20 }}>
                      <View
                        style={{
                          backgroundColor: "#13c3ab",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <MIcon
                          name={"silverware-fork-knife"}
                          color={"#ffff"}
                          size={14}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {getParam("item").foods.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            {
                              backgroundColor: "#13c3ab50",
                              color: "#13c3ab",
                            },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {getParam("item").books.length > 0 && (
                  <View style={[styles.sectionBlock, { paddingVertical: 5 }]}>
                    <View style={{ paddingRight: 20 }}>
                      <View
                        style={{
                          backgroundColor: "#52237c",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <FIcon name={"book-open"} color={"#ffff"} size={14} />
                      </View>
                    </View>
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {getParam("item").books.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            {
                              backgroundColor: "#52237c50",
                              color: "#52237c",
                            },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </>
          )}
          <View style={{ height: 50 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    // overflow: "hidden",
    backgroundColor: "#fff",
    minHeight: fullHeight,
  },
  sectionTitle: {
    color: "#FF3E56",
    marginBottom: 25,
    fontWeight: "600",
    opacity: 0.9,
  },
  sectionInfo: {
    color: "#363636",
    fontSize: 15,
    textTransform: "capitalize",
  },
  sectionBlockTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 15,
  },
  sectionBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  spacerLine: {
    height: 1,
    backgroundColor: "#ececec",
    width: fullWidth,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "CerealBook",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealBook",
    overflow: "hidden",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailText: {
    fontFamily: "CerealBook",
    fontSize: 14,
    color: "grey",
    marginLeft: 4,
    marginRight: 16,
  },
  smallDivider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
    width: fullWidth * 0.25,
  },
  divider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
  },
  host: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2,
  },
  mediumText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealMedium",
  },
  selectedTagItem: {
    backgroundColor: "#ececec",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 2,
    marginVertical: 3,
    textAlign: "center",
    borderRadius: 5,
    width: "auto",
    textTransform: "capitalize",
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;

export default connect(mapStateToProps)(MatchInfoPage);
