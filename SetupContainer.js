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
  return (
    <>
      <ProfileMaker />
      {/* {props?.state?.loginReducer?.step == "1" ? <Login /> : <AppContainer />}
      {!props?.state?.loginReducer?.loggedIn ||
      props?.state?.loginReducer?.step === 0 ? (
        <Login />
        ) : (
        // <Text>bb : {JSON.stringify(props.state.loginReducer)}</Text>
      )} */}
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
