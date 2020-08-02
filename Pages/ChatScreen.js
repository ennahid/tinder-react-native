import React, { useEffect } from "react";
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
} from "react-native";
import { connect } from "react-redux";
import { getConversations, getMessages } from "../redux/actions/chat";

const fullWidth = Dimensions.get("window").width;
const ChatScreen = ({
  image,
  lastMessage,
  name,
  navigation,
  state,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(getMessages(navigation.state.params.id));
  }, []);
  const { navigate } = useNavigation();
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
            {/* this is my best world here   */}
            {}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f7f9",
        }}
      >
        <ScrollView>
          <View style={{ height: 20 }}></View>
          <Text>{JSON.stringify(state.chatReducer.messages)}</Text>
          {/* {[...Array(3)].map((item, index) => ( */}
          {state.chatReducer.messages.map((item, index) => (
            <>
              <View style={Lstyles.ChatBubbleContainer}>
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: `${API_URL}/${navigation.state.params.image}`,
                  }}
                  style={{
                    backgroundColor: "#cecece",
                    height: 39,
                    width: 39,
                    borderRadius: 40,
                  }}
                />
                <Text style={Lstyles.ChatBubble} key={index}>
                  hell owrod tthis is a new message got here pleasedddddd
                </Text>
              </View>
              <View style={[Lstyles.ChatBubbleContainer, Lstyles.Mine]}>
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
                  style={[Lstyles.ChatBubble, Lstyles.MyBubble]}
                  key={index}
                >
                  hell owrod tthis is a new message got here pleasedddddd
                </Text>
              </View>
            </>
          ))}
          <View style={{ height: 20 }}></View>
        </ScrollView>
      </View>

      <View style={Lstyles.ChatPageFooter}>
        <TextInput
          style={Lstyles.MessageInput}
          placeholder="Type a message..."
          placeholderTextColor={"#C7C7CD"}
          multiline={true}
          // value={login["password"] || ""}
          // onChangeText={(nextValue) => LoginSetFormValue("password", nextValue)}
        />
        <TouchableNativeFeedback>
          <View style={Lstyles.ChatPageSendButton}>
            <Icon name={"send"} color={"#FF3E56"} size={25} />
            {/* <Text style={Lstyles.ChatPageSendButtonText}>Send</Text> */}
          </View>
        </TouchableNativeFeedback>
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
    marginVertical: 10,
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
