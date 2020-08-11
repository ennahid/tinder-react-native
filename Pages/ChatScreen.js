import React, { useEffect, useState } from "react";
import styles from "../assets/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import IIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "react-navigation-hooks";
import FastImage from "react-native-fast-image";
import { API_URL } from "../app.json";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { setMessagesAsSeen, getMessages } from "../redux/actions/chat";
import { socket } from "../socket.helper";
import moment from "moment";

const fullWidth = Dimensions.get("window").width;
const ChatScreen = ({ navigation, state, dispatch }) => {
  const { navigate } = useNavigation();
  let myScrollView = React.useRef(null);
  const [myState, setMyState] = useState({
    offset: 0,
    messageText: "",
    changed: false,
  });
  useEffect(() => {
    // console.log("OOFFSET : " + myState.offset);
    if (!state.chatReducer.messages[navigation.state.params.conversationId]) {
      dispatch(
        getMessages(navigation.state.params.conversationId, myState.offset)
      );
    }
    dispatch(setMessagesAsSeen(navigation.state.params.conversationId));
  }, []);
  useEffect(() => {
    setMyState((values) => ({ ...values, changed: !myState.changed }));
  }, [state.chatReducer.messages]);
  useEffect(() => {
    if (myState.offset > 0) {
      dispatch(
        getMessages(navigation.state.params.conversationId, myState.offset)
      );
    }
  }, [myState.offset]);

  const sendMessage = () => {
    if (navigation.state.params.conversationId) {
      let messageObj = {
        conversation_id: navigation.state.params.conversationId,
        sender: state.loginReducer.userData._id,
        reciever: navigation.state.params.id,
        message: myState.messageText.replace(/\s*$|\n*$/, ""),
      };
      setMyState((values) => ({ ...values, messageText: "" }));
      socket.emit("message", messageObj);
      dispatch({
        type: "APPEND_MESSAGE",
        message: messageObj,
      });
    }
  };
  const onMessageTextChange = (text) => {
    setMyState((values) => ({ ...values, messageText: text }));
  };
  return (
    <View style={Lstyles.ChatPage}>
      <View style={Lstyles.ChatPageHeader}>
        <TouchableNativeFeedback onPress={() => navigate("Messages")}>
          <Icon
            style={{ padding: 15 }}
            name={"arrow-back"}
            color={"#fff"}
            size={25}
          />
        </TouchableNativeFeedback>
        {/* <Image style={Lstyles.ChatPageHeaderImage} /> */}
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: `${API_URL}/${navigation.state.params.image}`,
          }}
          style={Lstyles.ChatPageHeaderImage}
        />
        <View>
          <Text style={Lstyles.ChatPageHeaderPersonName}>
            {navigation.state.params.name}
          </Text>
          <Text style={Lstyles.ChatPageHeaderPersonDesc}>
            {moment(navigation.state.params.lastSeen).fromNow(true)} ago
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f7f9",
        }}
      >
        <SafeAreaView>
          <KeyboardAvoidingView enabled>
            {/* <Text>{JSON.stringify(navigation.state.params, null, 1)}</Text> */}
            {/* {[...Array(3)].map((item, index) => ( */}
            {state.chatReducer.messages[
              navigation.state.params.conversationId
            ] && (
              <FlatList
                contentContainerStyle={{ paddingVertical: 20 }}
                extraData={myState.changed}
                inverted
                ref={(ref) => {
                  myScrollView = ref;
                }}
                onMomentumScrollBegin={() => {
                  setMyState((values) => ({
                    ...values,
                    onEndReachedCalledDuringMomentum: false,
                  }));
                }}
                onEndReached={({ distanceFromEnd }) => {
                  if (!myState.onEndReachedCalledDuringMomentum) {
                    setMyState((values) => ({
                      ...values,
                      offset: myState.offset + 15,
                      onEndReachedCalledDuringMomentum: true,
                    }));
                  }
                }}
                onEndReachedThreshold={1}
                data={
                  state.chatReducer.messages[
                    navigation.state.params.conversationId
                  ]
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View
                    key={item._id}
                    style={[
                      Lstyles.ChatBubbleContainer,
                      item.sender === state.loginReducer.userData._id
                        ? Lstyles.Mine
                        : {},
                    ]}
                  >
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      source={{
                        uri: `${API_URL}/${state.loginReducer.userData.images[0]}`,
                      }}
                      style={{
                        backgroundColor: "#cecece",
                        height: 39,
                        width: 39,
                        borderRadius: 40,
                      }}
                    />
                    <Text
                      style={[
                        Lstyles.ChatBubble,
                        item.sender === state.loginReducer.userData._id
                          ? Lstyles.MyBubble
                          : {},
                      ]}
                      key={index}
                    >
                      {item.message}
                    </Text>
                  </View>
                )}
              />
            )}

            {/* <ScrollView
                ref={(ref) => {
                  myScrollView = ref;
                }}
                onContentSizeChange={() =>
                  myScrollView.scrollToEnd({ animated: true })
                }
        >
          <View style={{ height: 20 }}></View>
          {state.chatReducer.messages[
            navigation.state.params.conversationId
          ]?.map((item, index) => (
            <View
              key={item._id}
              style={[
                Lstyles.ChatBubbleContainer,
                item.sender === state.loginReducer.userData._id
                  ? Lstyles.Mine
                  : {},
              ]}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: `${API_URL}/${state.loginReducer.userData.images[0]}`,
                }}
                style={{
                  backgroundColor: "#cecece",
                  height: 39,
                  width: 39,
                  borderRadius: 40,
                }}
              />
              <Text
                style={[
                  Lstyles.ChatBubble,
                  item.sender === state.loginReducer.userData._id
                    ? Lstyles.MyBubble
                    : {},
                ]}
                key={index}
              >
                {item.message}
              </Text>
            </View>
          ))}
          <View style={{ height: 20 }}></View>
        </ScrollView> */}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
      <View style={Lstyles.ChatPageFooter}>
        <TextInput
          style={Lstyles.MessageInput}
          placeholder="Type a message..."
          placeholderTextColor={"#C7C7CD"}
          multiline={true}
          value={myState.messageText || ""}
          onChangeText={onMessageTextChange}
          onFocus={() => {
            // state.chatReducer.messages[navigation.state.params.conversationId]
            //   ? setTimeout(() => {
            //       myScrollView.scrollToEnd();
            //     }, 200)
            //   : null;
          }}
        />
        {myState.messageText.trim() !== "" ? (
          <TouchableNativeFeedback onPress={() => sendMessage()}>
            <View style={Lstyles.ChatPageSendButton}>
              <Icon name={"send"} color={"#FF3E56"} size={25} />
              {/* <Text style={Lstyles.ChatPageSendButtonText}>Send</Text> */}
            </View>
          </TouchableNativeFeedback>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const Lstyles = StyleSheet.create({
  ChatPage: { flex: 1 },
  ChatPageHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3E56",
    height: 65,
  },
  ChatPageHeaderImage: {
    backgroundColor: "#fff",
    height: 45,
    width: 45,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
  },
  ChatPageHeaderPersonName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  ChatPageHeaderPersonDesc: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "400",
    opacity: 0.5,
  },
  ChatPageFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 50,
    maxHeight: 130,
    backgroundColor: "#fff",
    borderTopColor: "#ececec",
    borderTopWidth: 1,
  },
  MessageInput: {
    // backgroundColor: "red",
    paddingLeft: 15,
    // paddingRight: 20,
    width: "90%",
  },
  ChatPageSendButton: {
    // backgroundColor: "#FF3E56",
    // padding: 10,
    // paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  ChatPageSendButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  ChatBubbleContainer: {
    flexDirection: "row",
    marginVertical: 8,
    paddingHorizontal: 10,
    width: "100%",
  },
  Mine: {
    flexDirection: "row-reverse",
  },
  ChatBubble: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    paddingVertical: 10,
    color: "#2d2d2d",
    marginHorizontal: 5,
    maxWidth: fullWidth / 1.5,
    // fontWeight: "600",
    borderWidth: 1,
    borderColor: "#ececec",
  },
  MyBubble: {
    backgroundColor: "#f33149",
    color: "#fff",
    borderColor: "#0000",
    borderWidth: 0,
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;
export default connect(mapStateToProps)(ChatScreen);
