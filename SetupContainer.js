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
      case 2:
        return <ProfileMaker />;
      case 1:
        return <ProfilePreferences />;
      case 0:
        return <AppContainer />;
      default:
        return <Login />;
    }
  }
  return (
    <>
      {/* <Text>userId : {getUserIdFromUserData()}</Text>
      <Text>token : {getToken()}</Text>
      <Text>-------------</Text>*/}
      <Text>{JSON.stringify(props.state.clientsReducer)}</Text>
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
