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

const fullWidth = Dimensions.get("window").width;
const Messages = ({ dispatch, state }) => {
  const { navigate } = useNavigation();
  const [myState, setMyState] = useState({ refreshing: false });
  useEffect(() => {
    dispatch(getConversations());
  }, []);
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
          {state.chatReducer.conversations.length < 1 && (
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
              <Text style={{ fontSize: 26, fontWeight: "700", marginTop: 20 }}>
                It's quiet in here 👈
              </Text>
              <Text>Start swiping to match and start new conversations.</Text>
            </View>
          )}
          {state.chatReducer.conversations &&
            state.chatReducer.conversations.length > 0 &&
            state.chatReducer.conversations[0].participants &&
            state.chatReducer.conversations[0].participants.length > 0 && (
              <FlatList
                contentContainerStyle={{ paddingTop: 10 }}
                data={state.chatReducer.conversations}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => {
                  dispatch(getConversations());
                  setMyState((values) => ({ ...values, refreshing: true }));
                }}
                refreshing={myState.refreshing}
                renderItem={({ item, index }) => (
                  <Message
                    navigate={() =>
                      navigate("ChatScreen", {
                        conversationId: item._id,
                        id: item.participants[0]._id,
                        name: item.participants[0].name,
                        image: `${item.participants[0].images[0]}`,
                        lastSeen: `${item.participants[0].last_seen}`,
                      })
                    }
                    image={API_URL + "/" + item.participants[0].images[0]}
                    name={item.participants[0].name}
                    lastSeen={item.participants[0].last_seen}
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
