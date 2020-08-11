import React, { useEffect, useState } from "react";
import styles from "../assets/styles";
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
import Message from "../components/Message";
import Icon from "../components/Icon";
import Demo from "../assets/data/demo.js";
import { useNavigation } from "react-navigation-hooks";
import { connect } from "react-redux";
import { getMatches } from "../redux/actions/explore";
import { API_URL } from "../app.json";
import Header from "../components/Header";
import { RemoveAllNotif } from "../helpers/notification.helper";
import MatchCard from "../components/MatchCard";

const fullWidth = Dimensions.get("window").width;
const MatchesPage = ({ dispatch, state }) => {
  const { navigate } = useNavigation();
  const [myState, setMyState] = useState({ changed: false, refreshing: false });
  useEffect(() => {
    dispatch(getMatches());
  }, []);

  //   useEffect(() => {
  //     setMyState((values) => ({ ...values, changed: !myState.changed }));
  //   }, [state.chatReducer.messages]);

  //   useEffect(() => {
  //     if (myState.refreshing && !state.chatReducer.loadingConversations) {
  //       setMyState((values) => ({ ...values, refreshing: false }));
  //     }
  //   }, [state.chatReducer.loadingConversations]);
  return (
    <>
      <Header title="Matches" />
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={styles.containerMessages}>
          {state.exploreReducer.matchesList &&
            state.exploreReducer.matchesList.length < 1 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ opacity: 0.7 }}
                  source={require("../assets/images/rocket.png")}
                />
                <Text
                  style={{ fontSize: 24, fontWeight: "700", marginTop: 20 }}
                >
                  It's quiet in here 👈
                </Text>
                <Text style={{ fontSize: 13, opacity: 0.8, marginTop: 5 }}>
                  Start swiping to match and start new conversations.
                </Text>
              </View>
            )}

          {/* <Text>{JSON.stringify(state.chatReducer.conversations)}</Text> */}
          {state.exploreReducer.matchesList &&
            state.exploreReducer.matchesList.length > 0 && (
              <FlatList
                contentContainerStyle={{
                  paddingTop: 10,
                  paddingHorizontal: 10,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 1,
                }}
                data={state.exploreReducer.matchesList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <MatchCard
                    navigate={() =>
                      navigate("MatchInfoPage", {
                        item: item,
                      })
                    }
                    image={API_URL + "/" + item.images[0]}
                    name={item.name}
                  />
                )}
              />
            )}
        </View>
      </View>
    </>
  );
};

const Lstyles = StyleSheet.create({
  sectionTitle: {
    color: "#FF3E56",
    marginBottom: 20,
    fontWeight: "600",
    opacity: 0.9,
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;
export default connect(mapStateToProps)(MatchesPage);
