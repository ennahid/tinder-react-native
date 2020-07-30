import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import ProfilePage from "../Pages/ProfilePage";
import ProfileEditor from "../Pages/ProfileEditor";

const Profile = createStackNavigator(
  {
    ProfilePage: {
      screen: ProfilePage,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    ProfileEditor: {
      screen: ProfileEditor,
      navigationOptions: () => ({
        headerShown: true,
        title: "Profile",
        headerStyle: {
          backgroundColor: "#FF3E56",
          shadowOpacity: 0,
          borderWidth: 0,
        },
        headerTintColor: "#ffff",
        headerTitleStyle: {
          color: "#fff",
        },
      }),
    },
  },
  {
    mode: "modal",
    // headerMode: "none",
    defaultNavigationOptions: {
      // animationEnabled: false,
      ...TransitionPresets.SlideFromRightIOS,
    },

    // defaultNavigationOptions: {
    //   cardStyleInterpolator: ({ current: { progress } }) => {
    //     const opacity = progress.interpolate({
    //       inputRange: [0, 1],
    //       outputRange: [0, 1],
    //       extrapolate: "clamp",
    //     });
    //     return { cardStyle: { opacity } };
    //   },
    //   gestureEnabled: false,
    //   cardStyle: {
    //     backgroundColor: "transparent",
    //   },
    // },
  }
);
Profile.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  let headerVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName === "ProfileEditor") {
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

export default Profile;
