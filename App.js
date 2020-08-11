import React, { Component } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { StatusBar } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import SetupContainer from "./SetupContainer";
import moment from "moment";
import BottomNav from "./BottomNav";
import { purgeStoredState } from "redux-persist";

moment().format();
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist: ["loginReducer"],
  whitelist: ["loginReducer", "chatReducer"],
};

const client = axios.create({
  baseURL: "https://api.github.com",
  responseType: "json",
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Mstore = createStore(persistedReducer, applyMiddleware(thunkMiddleware));

const persistor = persistStore(Mstore);

export const AppContainer = BottomNav;

export default class App extends Component {
  render() {
    return (
      <Provider store={Mstore}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationProvider {...eva} theme={eva.light}>
            {/* <Text onPress={() => purgeStoredState(persistConfig)}>
              Clear Cache Now
            </Text> */}
            <StatusBar backgroundColor="#FF3E56" barStyle={"default"} />
            <SetupContainer />
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    );
  }
}
