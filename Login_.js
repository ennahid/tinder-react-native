import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Input,
  Button,
  CheckBox,
  Tab,
  TabView,
  Layout,
} from "@ui-kitten/components";
import styles from "./assets/styles";
import { connect } from "react-redux";
import { createUser, loginUser } from "./redux/actions/login";

const Login = (props) => {
  const [signup, setSignupValues] = useState({
    email: "abdel@gmail.com",
    password: "ffff",
  });
  const [login, setLoginValues] = useState({
    email: "abdel@gmail.com",
    password: "ffff",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useEffect(() => {
  // }, []);

  const onSignUp = () => {
    props.dispatch(createUser(signup));
  };
  const onLogin = () => {
    props.dispatch(loginUser(login));
  };

  const SignupSetFormValue = (name, value) => {
    setSignupValues((values) => ({ ...values, [name]: value }));
  };

  const LoginSetFormValue = (name, value) => {
    setLoginValues((values) => ({ ...values, [name]: value }));
  };
  return (
    <View style={Lstyles.loginPage}>
      <View style={Lstyles.loginContainer}>
        <View style={{ alignItems: "center", paddingVertical: 15 }}>
          <Image
            style={{
              width: 150,
              height: 60,
              resizeMode: "contain",
            }}
            source={require("./assets/images/dk.png")}
          />
        </View>

        <View style={Lstyles.loginTab}>
          <TabView
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
          >
            <Tab title="Sign Up">
              <Layout style={Lstyles.tabContainer}>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Email"
                    value={signup["email"] || ""}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      SignupSetFormValue("email", nextValue)
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    secureTextEntry={true}
                    placeholder="Password"
                    value={signup["password"] || ""}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      SignupSetFormValue("password", nextValue)
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    value={signup["confirmPassword"]}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      SignupSetFormValue("confirmPassword", nextValue)
                    }
                  />
                </View>
                {/* <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={signup["checked"]}
                    onChange={(nextChecked) =>
                      SignupSetFormValue("checked", nextChecked)
                    }
                  >
                  
                  </CheckBox>
                </View> */}
                <View style={{ marginTop: 25, width: "100%" }}>
                  <View style={styles.inputContainer}>
                    <Button
                      style={Lstyles.button}
                      appearance="filled"
                      onPress={() => onSignUp()}
                      disabled={props.state.loginReducer.loading}
                    >
                      {props.state.loginReducer.loading ? "Loading" : "Sign Up"}
                    </Button>
                    <Text></Text>
                  </View>
                </View>
              </Layout>
            </Tab>
            <Tab title="Login">
              <Layout style={Lstyles.tabContainer}>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Email"
                    value={login["email"] || ""}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      LoginSetFormValue("email", nextValue)
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Password"
                    value={login["password"] || ""}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      LoginSetFormValue("password", nextValue)
                    }
                  />
                </View>

                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={login["checked"]}
                    onChange={(nextChecked) =>
                      LoginSetFormValue("checked", nextChecked)
                    }
                  >
                    Keep me logged in
                  </CheckBox>
                </View>
                <View style={{ marginTop: 25, width: "100%" }}>
                  <View style={styles.inputContainer}>
                    <Button
                      style={Lstyles.button}
                      appearance="filled"
                      onPress={() => onLogin()}
                      disabled={props.state.loginReducer.loading}
                    >
                      {props.state.loginReducer.loading ? "Loading" : "Login"}
                    </Button>
                  </View>
                  <View style={styles.inputContainer}>
                    <Button style={Lstyles.button} appearance="outline">
                      Forgot Password
                    </Button>
                  </View>
                </View>
              </Layout>
            </Tab>
          </TabView>
        </View>
      </View>
    </View>
  );
};

const Lstyles = StyleSheet.create({
  loginPage: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    //
  },
  loginContainer: {
    // display: "none",
    borderRadius: 5,
    padding: 15,
    backgroundColor: "#ffff",
    // height: 200,
    width: "90%",
    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column",
    shadowRadius: 1,
    shadowColor: "#ECECEC",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 3,
    shadowOpacity: 0.5,
  },

  tabContainer: {
    marginTop: 30,
    paddingTop: 0,
    paddingHorizontal: 2,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    // height: 555,
    // width: 555,
    // backgroundColor: "#ccc",
  },
  button: {
    margin: 2,
    width: "99%",
  },
});

const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(Login);
