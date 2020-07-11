import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AppContainer } from "./App";
import { Text } from "react-native";
import ProfileMaker from "./ProfileMaker";
import { getUserIdFromUserData, getToken } from "./token.helper";
import ProfilePreferences from "./ProfilePreferences";

const SetupContainer = (props) => {
  useEffect(() => {
    props.dispatch({ type: "LOGIN_INIT" });
    props.dispatch({ type: "CLIENT_INIT" });
  }, []);

  function switchedComponent(step) {
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
        return <Login />;
    }
  }
  return (
    <>
      <Text>{JSON.stringify(props.state.exploreReducer.matches)}</Text>
      {/* <Text>userId : {getUserIdFromUserData()}</Text>
      <Text>token : {getToken()}</Text>
      <Text>-------------</Text>*/}
      {/* <Text>hello : {getToken() ? "3Maer" : "khawi"}</Text>*/}
      {/* <Text>hello : {getToken()}</Text> */}
      {/* <Text>{JSON.stringify(props.state.clientsReducer)}</Text> */}
      {/* <Text>{JSON.stringify(props?.state?.loginReducer)}</Text> */}
      {/* <AppContainer /> */}
      {props?.state?.loginReducer?.loggedIn ? (
        switchedComponent(props?.state?.loginReducer?.step)
      ) : (
        <Login />
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
