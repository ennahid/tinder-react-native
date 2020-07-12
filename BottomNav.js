import React, { Component } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import styles from "./assets/styles";
import HomeScreen from "./containers/Home";
import MatchesScreen from "./containers/Matches";
import MessagesScreen from "./containers/Messages";
import ProfileScreen from "./containers/Profile";

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

export default createAppContainer(AppNavigation);
// export default AppContainer;
