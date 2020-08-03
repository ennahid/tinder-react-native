import React, { useEffect } from "react";
import styles from "../assets/styles";

import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableHighlight,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import Message from "../components/Message";
import Icon from "../components/Icon";
import Demo from "../assets/data/demo.js";
import { useNavigation } from "react-navigation-hooks";
import { connect } from "react-redux";
import { getConversations } from "../redux/actions/chat";
import { API_URL } from "../app.json";
const Messages = ({ dispatch, state }) => {
  useEffect(() => {
    dispatch(getConversations());
  }, []);
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={styles.containerMessages}>
        <ScrollView>
          <View style={[styles.top, { marginVertical: 20 }]}>
            <Text style={[styles.title, { margin: 0, paddingBottom: 0 }]}>
              Messages {JSON.stringify(state.chatReducer.loadingConversations)}
            </Text>
            <Text style={{ fontSize: 11, opacity: 0.7 }}>
              You can find all the people you matched with here.
            </Text>
          </View>
          {state.chatReducer.conversations &&
            state.chatReducer.conversations.length > 0 &&
            state.chatReducer.conversations[0].participants &&
            state.chatReducer.conversations[0].participants.length > 0 && (
              <FlatList
                data={state.chatReducer.conversations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Message
                    navigate={() =>
                      navigate("ChatScreen", {
                        conversationId: item._id,
                        id: item.participants[0]._id,
                        name: item.participants[0].name,
                        image: `${item.participants[0].images[0]}`,
                      })
                    }
                    image={API_URL + "/" + item.participants[0].images[0]}
                    name={item.participants[0].name}
                    // lastMessage={item.message}
                  />
                )}
              />
            )}
        </ScrollView>
      </View>
    </View>
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
