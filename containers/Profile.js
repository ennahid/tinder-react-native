import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import ProfilePage from "../Pages/ProfilePage";
import ProfileEditor from "../Pages/ProfileEditor";
import SeetingsPage from "../SeetingsPage";
import ProfileInfoPage from "../ProfileInfoPage";

const Profile = createStackNavigator(
  {
    ProfilePage: {
      screen: ProfilePage,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    SeetingsPage: {
      screen: SeetingsPage,
      navigationOptions: () => ({
        headerShown: true,
        title: "Discovery Settings",
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
    ProfileInfoPage: {
      screen: ProfileInfoPage,
      navigationOptions: () => ({
        headerShown: true,
        title: "Personal Info",
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
  }
);
Profile.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  let headerVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (
        route.routeName === "ProfileEditor" ||
        route.routeName === "SeetingsPage" ||
        route.routeName === "ProfileInfoPage"
      ) {
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
