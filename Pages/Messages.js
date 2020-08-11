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
import { getConversations } from "../redux/actions/chat";
import { API_URL } from "../app.json";
import Header from "../components/Header";
import { RemoveAllNotif } from "../helpers/notification.helper";

const fullWidth = Dimensions.get("window").width;
const Messages = ({ dispatch, state }) => {
  const { navigate } = useNavigation();
  const [myState, setMyState] = useState({ changed: false, refreshing: false });
  useEffect(() => {
    dispatch(getConversations());
    RemoveAllNotif();
  }, []);

  useEffect(() => {
    setMyState((values) => ({ ...values, changed: !myState.changed }));
  }, [state.chatReducer.messages]);

  useEffect(() => {
    if (myState.refreshing && !state.chatReducer.loadingConversations) {
      setMyState((values) => ({ ...values, refreshing: false }));
    }
  }, [state.chatReducer.loadingConversations]);
  return (
    <>
      <Header title="Messages" />
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <View style={styles.containerMessages}>
          {state.chatReducer.conversations &&
            state.chatReducer.conversations.length < 1 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ opacity: 0.7 }}
                  source={require("../assets/images/inbox.png")}
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
          {state.chatReducer.conversations &&
            state.chatReducer.conversations.length > 0 &&
            state.chatReducer.conversations[0].participants &&
            state.chatReducer.conversations[0].participants.length > 0 && (
              <FlatList
                contentContainerStyle={{ paddingTop: 5 }}
                data={state.chatReducer.conversations.sort((a, b) =>
                  b.last_activity.localeCompare(a.last_activity)
                )}
                extraData={!myState.changed}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => {
                  dispatch(getConversations());
                  setMyState((values) => ({ ...values, refreshing: true }));
                }}
                refreshing={myState.refreshing}
                renderItem={({ item, index }) => (
                  <Message
                    navigate={() => {
                      console.log("-------------------------------------");
                      navigate("ChatScreen", {
                        conversationId: item._id,
                        id: item.participants[0]._id,
                        name: item.participants[0].name,
                        image: `${item.participants[0].images[0]}`,
                        lastSeen: `${item.participants[0].last_seen}`,
                      });
                    }}
                    image={API_URL + "/" + item.participants[0].images[0]}
                    name={item.participants[0].name}
                    lastSeen={item.participants[0].last_seen}
                    message={item.last_message[0]}
                    userId={state.loginReducer.userData._id}
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
export default connect(mapStateToProps)(Messages);
