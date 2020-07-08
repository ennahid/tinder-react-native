import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AppContainer } from "./App";
import { Text } from "react-native";
import ProfileMaker from "./ProfileMaker";

const SetupContainer = (props) => {
  useEffect(() => {
    props.dispatch({
      type: "LOGIN_INIT",
    });
  }, []);

  function switchedComponent(step) {
    switch (step) {
      case 1:
        return <ProfileMaker />;
      case 2:
        return <Login />;
      case 0:
        return <AppContainer />;
      default:
        return <Login />;
    }
  }
  return (
    <>
      <Text>{JSON.stringify(props.state.loginReducer)}</Text>
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
