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
const Login = (props) => {
  const [login, setLoginValues] = useState({
    email: "",
    password: "",
    emailValid: true,
    error: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { navigate } = useNavigation();
  // useEffect(() => {
  // }, []);

  const onLogin = () => {
    setLoginValues((values) => ({ ...values, error: false }));
    // alert(JSON.stringify(login));
    if (!login.error && login.email && login.password)
      props.dispatch(loginUser(login));
    else {
      setLoginValues((values) => ({ ...values, error: true }));
    }
  };

  const LoginSetFormValue = (name, value) => {
    // abdel1@gmail.com
    if (name === "email") {
      let myEmail = value;
      myEmail = myEmail.replace(/\s+/g, "");
      setLoginValues((values) => ({ ...values, [name]: myEmail }));
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(myEmail).toLowerCase())) {
        setLoginValues((values) => ({ ...values, emailValid: true }));
      } else {
        setLoginValues((values) => ({
          ...values,
          emailValid: false,
        }));
      }
    } else {
      setLoginValues((values) => ({ ...values, [name]: value }));
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
            <Text style={Lstyles.loginTitle}>Welcome back to APPNAME</Text>
          </View>
        </View>
        <View style={Lstyles.loginBody}>
          <View style={{ width: "100%" }}>
            <View
              style={[
                styles.inputContainer,
                !login.emailValid || (login.error && !login.email)
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
            >
              <TextInput
                style={[styles.myInput]}
                placeholder="Email"
                placeholderTextColor={"#C7C7CD"}
                value={login["email"] || ""}
                onChangeText={(nextValue) =>
                  LoginSetFormValue("email", nextValue)
                }
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                login.error && !login.password
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
            >
              <TextInput
                style={styles.myInput}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={"#C7C7CD"}
                value={login["password"] || ""}
                onChangeText={(nextValue) =>
                  LoginSetFormValue("password", nextValue)
                }
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "red" }}>
                {props.state.loginReducer.loginError}
              </Text>
            </View>
          </View>
          <TouchableNativeFeedback onPress={() => null}>
            <Text style={Lstyles.forgotPassword}>Forgot Password ?</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => onLogin()}
            disabled={props.state.loginReducer.loading}
          >
            <View style={styles.myButtonContainer}>
              <Text style={styles.myButtonText}>
                {props.state.loginReducer.loading ? "Loading" : "Log in"}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={Lstyles.loginFooter}>
          <Text style={styles.myText}>Don't have an account? </Text>
          <TouchableNativeFeedback onPress={() => navigate("SignUp")}>
            <Text
              style={{
                color: "#FF3E56",
                fontWeight: "500",
                textDecorationLine: "underline",
              }}
            >
              Signup
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
    height: fullHeaight - 20,
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
export default connect(mapStateToProps)(Login);
