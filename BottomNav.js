import React, { Component } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./assets/styles";
import HomeScreen from "./containers/Home";
import MatchesScreen from "./containers/Matches";
import MessagesScreen from "./containers/Messages";
import ProfileScreen from "./containers/Profile";
import CardsInfoPage from "./Pages/CardsInfoPage";

const AppNavigation = createBottomTabNavigator(
  {
    Explore: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? "#FF3E56" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <MIcon
                name="cards-outline"
                size={23}
                color={focused ? iconFocused : "#bbbbbb"}
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
          const iconFocused = focused ? "#FF3E56" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <Icon
                name="heart"
                size={23}
                color={focused ? iconFocused : "#bbbbbb"}
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
          const iconFocused = focused ? "#FF3E56" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <Icon
                name="message-circle"
                size={23}
                color={focused ? iconFocused : "#bbbbbb"}
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
          const iconFocused = focused ? "#FF3E56" : "#363636";
          return (
            <Text style={[styles.iconMenu, { color: iconFocused }]}>
              <Icon
                name="user"
                size={23}
                color={focused ? iconFocused : "#bbbbbb"}
              />
            </Text>
          );
        },
      },
    },
  },
  {
    initialRouteName: "Explore",
    // initialRouteName: "Profile",
    tabBarOptions: {
      activeTintColor: "#FF3E56",
      inactiveTintColor: "#bbbbbb",
      labelStyle: {
        fontSize: 9,
        // textTransform: "uppercase",
        paddingTop: 10,
      },
      style: {
        backgroundColor: "#FFF",
        borderTopWidth: 0,
        // paddingVertical: 1,
        paddingTop: 10,
        height: 50,
        marginBottom: 0,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: "#000",
        shadowOffset: { height: 0, width: 0 },
        // display: "none",
      },
    },
  }
);

export default createAppContainer(AppNavigation);
// export default AppContainer;
