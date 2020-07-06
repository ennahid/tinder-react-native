import axios from "axios";
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import axiosMiddleware from "redux-axios-middleware";
// import GitAccount from "./GitAccount";
import reducer from "./reducer";

// axios api client
const client = axios.create({
  baseURL: "https://api.github.com",
  responseType: "json",
});

// initializes axios api client with axiosMiddleware and create redux store with reducer.
const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  render() {
    return (
      // Provider is a wrapper to the application and responsible for providing access to the created store
      <Provider store={store}>
        <View style={styles.container}>
          {/* <GitAccount /> */}
          <Text>hello world htis</Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
