import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import MatchesPage from "../Pages/MatchesPage";
import MatchInfoPage from "../Pages/MatchInfoPage";

const MatchNav = createStackNavigator(
  {
    Matches: {
      screen: MatchesPage,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    MatchInfoPage: {
      screen: MatchInfoPage,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },

    // ProfileEditor: {
    //   screen: ProfileEditor,
    //   navigationOptions: () => ({
    //     headerShown: true,
    //     title: "Profile",
    //     headerStyle: {
    //       backgroundColor: "#FF3E56",
    //       shadowOpacity: 0,
    //       borderWidth: 0,
    //     },
    //     headerTintColor: "#ffff",
    //     headerTitleStyle: {
    //       color: "#fff",
    //     },
    //   }),
    // },
  },
  {
    mode: "modal",
    // headerMode: "none",
    defaultNavigationOptions: {
      // animationEnabled: false,
      ...TransitionPresets.SlideFromRightIOS,
    },
    // transitionConfig: () => {
    //   return {
    //     transitionSpec: {
    //       duration: 5000,
    //     },
    //   };
    // },
  }
);
MatchNav.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  let headerVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName === "MatchInfoPage") {
        tabBarVisible = false;
        headerVisible = true;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible,
    headerVisible: true,
  };
};

export default MatchNav;
