import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AppContainer } from "./App";
import { Text } from "react-native";
import ProfileMaker from "./ProfileMaker";
import { getUserIdFromUserData, getToken } from "./token.helper";
import ProfilePreferences from "./ProfilePreferences";

const SetupContainer = (props) => {
  // const [currentStep, setCurrentStep] = useState(null);
  useEffect(() => {
    props.dispatch({ type: "LOGIN_INIT" });
    props.dispatch({ type: "CLIENT_INIT" });
  }, []);
  // useEffect(() => {
  //   setCurrentStep(props?.state?.loginReducer?.step);
  // }, [props?.state?.loginReducer?.step]);

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
