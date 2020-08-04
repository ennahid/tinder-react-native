import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AppContainer } from "./App";
import { AppState } from "react-native";
import ProfileMaker from "./ProfileMaker";
import { getUserIdFromUserData, getToken } from "./token.helper";
import ProfilePreferences from "./ProfilePreferences";
import SignUp from "./SignUp";
import MyLoginNavigation from "./mLoginNavigation";
import { socket } from "./socket.helper";
import { PushNotif } from "./helpers/notification.helper";

const SetupContainer = (props) => {
  const appState = useRef(AppState.currentState);
  const [myState, setMyState] = useState({});

  useEffect(() => {
    props.dispatch({ type: "LOGIN_INIT" });
    props.dispatch({ type: "CLIENT_INIT" });
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = (nextAppState) => {
    // if (nextAppState) {
    //   PushNotif(nextAppState, "checkout who it is...😍🤭");
    // }
    appState.current = nextAppState;
    // alert(appState.current);
    setMyState((values) => ({ ...values, appState: appState.current }));
    // if (
    //   appState.current.match(/inactive|background/) &&
    //   nextAppState === "active"
    // ) {
    //   alert("App has come to the foreground!");
    //   console.log("App has come to the foreground!");
    // }

    // // setAppStateVisible(appState.current);

    // alert(appState.current);
    // // console.log("AppState", appState.current);
  };
  useEffect(() => {
    if (props.state.loginReducer.loggedIn) {
      // alert("connect");
      socket.on("connect", function (data) {});
      socket.on("disconnect", function (data) {});
      socket.emit("userInit", {
        userId: props.state.loginReducer.userData._id,
      });
      socket.on("message", function (message) {
        // alert("got message");
        if (appState.current !== "active") {
          PushNotif("You have a new message", "checkout who it is...😍🤭");
        }
        props.dispatch({ type: "APPEND_MESSAGE", message: message });
      });
    }
  }, [props.state.loginReducer.loggedIn]);

  function switchedComponent(step) {
    // return <Login />;

    switch (step) {
      case 1:
        return <ProfileMaker />;
      case 2:
        return <ProfilePreferences />;
      case 0:
        return <AppContainer />;
      // return <Text>hell</Text>;
      default:
        // return <Text>-------------</Text>;
        return <MyLoginNavigation />;
    }
  }
  return (
    <>
      {/* <Text>{JSON.stringify(props.state.exploreReducer.matches)}</Text> */}
      {/*  <Text>{JSON.stringify(props.state.exploreReducer.lastSwipes)}</Text>
      <Text>
        {JSON.stringify(
          props.state.exploreReducer.users.map((item) => item._id)
        )}
      </Text>{" "}
      */}
      {/* <Text>userId : {getUserIdFromUserData()}</Text>
      <Text>token : {getToken()}</Text>
      <Text>-------------</Text>*/}
      {/* <Text>hello : {getToken() ? "3Maer" : "khawi"}</Text>*/}
      {/* <Text>hello : {getToken()}</Text> */}
      {/* <Text>hello : {props.state.loginReducer.token}</Text> */}
      {/* <Text>{JSON.stringify(props.state.clientsReducer)}</Text> */}
      {/* <Text>{JSON.stringify(props?.state?.loginReducer.userData)}</Text> */}
      {/* <AppContainer /> */}
      {props?.state?.loginReducer?.loggedIn ? (
        switchedComponent(props?.state?.loginReducer?.step)
      ) : (
        <MyLoginNavigation />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(SetupContainer);
