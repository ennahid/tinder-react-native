import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { Button, CheckBox, Tab, TabView, Layout } from "@ui-kitten/components";
import styles from "./assets/styles";
import { connect } from "react-redux";
import { createUser, loginUser } from "./redux/actions/login";
import { useNavigation } from "react-navigation-hooks";
import { color } from "react-native-reanimated";

const SignUp = (props) => {
  const [signup, setSignupValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    emailValid: true,
    passwordValid: true,
  });

  const { navigate } = useNavigation();
  useEffect(() => {
    if (
      signup.confirmPassword &&
      signup.password &&
      signup.confirmPassword === signup.password
    ) {
      setSignupValues((values) => ({
        ...values,
        error: false,
        passwordValid: true,
      }));
    } else if (signup.confirmPassword || signup.password || signup.email) {
      // alert("zz");
      setSignupValues((values) => ({
        ...values,
        error: true,
        passwordValid: false,
      }));
    }
  }, [signup]);

  const onSignUp = () => {
    setSignupValues((values) => ({ ...values, error: false }));
    // alert(JSON.stringify(login));
    if (
      !signup.error &&
      signup.email &&
      signup.password &&
      signup.confirmPassword
    )
      props.dispatch(createUser(signup));
    else {
      setSignupValues((values) => ({ ...values, error: true }));
    }
  };

  const SignupSetFormValue = (name, value) => {
    if (name === "email") {
      let myEmail = value;
      myEmail = myEmail.replace(/\s+/g, "");
      setSignupValues((values) => ({ ...values, [name]: myEmail }));
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(myEmail).toLowerCase())) {
        setSignupValues((values) => ({
          ...values,
          emailValid: true,
        }));
      } else {
        setSignupValues((values) => ({
          ...values,
          emailValid: false,
        }));
      }
    } else {
      setSignupValues((values) => ({ ...values, [name]: value }));
      // abdel1@gmail.com
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={Lstyles.loginPage}>
        <View style={Lstyles.loginHead}>
          <Image
            style={{
              height: 100,
              resizeMode: "contain",
            }}
            source={require("./assets/images/app-logo.png")}
          />
          <View style={styles.formContainer}>
            <Text style={Lstyles.loginTitle}>Welcome to APPNAME</Text>
          </View>
        </View>
        <View style={Lstyles.loginBody}>
          <View style={{ width: "100%" }}>
            <View
              style={[
                styles.inputContainer,
                !signup.emailValid || (signup.error && !signup.email)
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
            >
              <TextInput
                autoCompleteType={"email"}
                style={styles.myInput}
                placeholder="Email"
                placeholderTextColor={"#C7C7CD"}
                value={signup["email"] || ""}
                onChangeText={(nextValue) =>
                  SignupSetFormValue("email", nextValue)
                }
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                !signup.passwordValid || (signup.error && !signup.password)
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
            >
              <TextInput
                style={styles.myInput}
                placeholder="Password"
                placeholderTextColor={"#C7C7CD"}
                secureTextEntry={true}
                value={signup["password"] || ""}
                onChangeText={(nextValue) =>
                  SignupSetFormValue("password", nextValue)
                }
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                !signup.passwordValid ||
                (signup.error && !signup.confirmPassword)
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
            >
              <TextInput
                style={styles.myInput}
                secureTextEntry={true}
                placeholder="Confirm password"
                placeholderTextColor={"#C7C7CD"}
                value={signup["confirmPassword"] || ""}
                onChangeText={(nextValue) =>
                  SignupSetFormValue("confirmPassword", nextValue)
                }
              />
            </View>
          </View>
          <Text style={{ color: "red" }}>
            {props.state.loginReducer.loginError}
          </Text>
          <Text> </Text>
          <TouchableNativeFeedback
            onPress={() => onSignUp()}
            disabled={props.state.loginReducer.loading}
          >
            <View style={styles.myButtonContainer}>
              <Text style={styles.myButtonText}>
                {props.state.loginReducer.loading ? "Loading" : "Sign Up"}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={Lstyles.loginFooter}>
          <Text style={styles.myText}>Already have an account? </Text>
          <TouchableNativeFeedback onPress={() => navigate("Login")}>
            <Text
              style={{
                color: "#FF3E56",
                fontWeight: "500",
                textDecorationLine: "underline",
              }}
            >
              Login
            </Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
  );
};
const fullHeaight = Dimensions.get("window").height;
const Lstyles = StyleSheet.create({
  loginPage: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    // backgroundColor: "red",
    height: fullHeaight,
    //
  },
  loginHead: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    // backgroundColor: "red",
  },
  loginBody: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: "40%",
    // backgroundColor: "green",
  },
  loginFooter: {
    // backgroundColor: "blue",
    height: "20%",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingBottom: 20,
  },
  forgotPassword: {
    color: "#38537C",
    fontWeight: "700",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  loginTitle: {
    color: "#38537C",
    fontWeight: "700",
    fontSize: 24,
    marginVertical: 20,
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(SignUp);
