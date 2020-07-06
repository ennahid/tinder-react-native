import React, { Component } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import styles from "./assets/styles";
import HomeScreen from "./containers/Home";
import MatchesScreen from "./containers/Matches";
import MessagesScreen from "./containers/Messages";
import ProfileScreen from "./containers/Profile";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
// import Icon from "./components/Icon";
import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import Login from "./Login";

const client = axios.create({
  baseURL: "https://api.github.com",
  responseType: "json",
});
const Mstore = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const AppNavigation = createBottomTabNavigator(
  {
    Explore: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <Icon
                name="search"
                size={23}
                color={focused ? iconFocused : "#525252"}
              />
            </Text>
          );
        },
      },
    },
    Matches: {
      screen: MatchesScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <Icon
                name="heart"
                size={23}
                color={focused ? iconFocused : "#525252"}
              />
            </Text>
          );
        },
      },
    },
    Chat: {
      screen: MessagesScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <Icon
                name="message-circle"
                size={23}
                color={focused ? iconFocused : "#525252"}
              />
            </Text>
          );
        },
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#7444C0" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <Icon
                name="user"
                size={23}
                color={focused ? iconFocused : "#525252"}
              />
            </Text>
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#7444C0",
      inactiveTintColor: "#363636",
      labelStyle: {
        fontSize: 14,
        // textTransform: "uppercase",
        paddingTop: 10,
      },
      style: {
        backgroundColor: "#FFF",
        borderTopWidth: 0,
        paddingVertical: 1,
        height: 60,
        marginBottom: 0,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: "#000",
        shadowOffset: { height: 0, width: 0 },
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigation);

// const App = () => {
//   return (
//     <Provider store={store}>
//       <AppContainer />
//     </Provider>
//   );
// };
// export default App;

// const store = configureStore({});
const store = createStore(
  rootReducer
  // applyMiddleware(axiosMiddleware(client))
);

const app = () => <AppContainer />;

// export default app;

export default class App extends Component {
  render() {
    return (
      // <AppContainer />
      // <View>
      // </View>
      <Provider store={Mstore}>
        {/* <Text>{JSON.stringify(Mstore)}</Text> */}
        <ApplicationProvider {...eva} theme={eva.light}>
          <Login />
        </ApplicationProvider>
        {/* <AppContainer /> */}
      </Provider>
    );
  }
}
