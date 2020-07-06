import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Input,
  Button,
  CheckBox,
  Tab,
  TabBar,
  TabView,
  Layout,
} from "@ui-kitten/components";
import styles from "./assets/styles";
import { connect } from "react-redux";
import { createUser } from "./redux/actions/login";

const Login = (props) => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useEffect(() => {
  //   // alert(JSON.stringify(props));
  // }, []);

  const onSignUp = () => {
    props.dispatch(createUser(value));
  };

  const SetFormValue = (name, value) => {
    setValue((values) => ({ ...values, [name]: value }));
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
                    value={value["email"]}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      SetFormValue("email", nextValue)
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Password"
                    value={value["password"]}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      SetFormValue("password", nextValue)
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Confirm Password"
                    value={value["confirmPassword"]}
                    size={"large"}
                    onChangeText={(nextValue) =>
                      SetFormValue("confirmPassword", nextValue)
                    }
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={checked}
                    onChange={(nextChecked) => setChecked(nextChecked)}
                  >
                    {/* Keep me logged in */}
                    {props.state.loginReducer.email}
                  </CheckBox>
                </View>
                <View style={{ marginTop: 25, width: "100%" }}>
                  <View style={styles.inputContainer}>
                    <Button
                      style={Lstyles.button}
                      appearance="filled"
                      onPress={() => onSignUp()}
                    >
                      Sign Up
                    </Button>
                  </View>
                </View>
              </Layout>
            </Tab>
            <Tab title="Login">
              <Layout style={Lstyles.tabContainer}>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Email"
                    value={value}
                    size={"large"}
                    onChangeText={(nextValue) => setValue(nextValue)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    placeholder="Password"
                    value={value}
                    size={"large"}
                    onChangeText={(nextValue) => setValue(nextValue)}
                  />
                </View>

                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={checked}
                    onChange={(nextChecked) => setChecked(nextChecked)}
                  >
                    Keep me logged in
                  </CheckBox>
                </View>
                <View style={{ marginTop: 25, width: "100%" }}>
                  <View style={styles.inputContainer}>
                    <Button style={Lstyles.button} appearance="filled">
                      Login
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
    // backgroundColor: "#F1F1F1",
    // backgroundColor: "#f00",
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
