import {
  createStackNavigator,
  TransitionPresets,
  // createAppContainer,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Login from "./Login";
import SignUp from "./SignUp";
const LoginNavigation = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    mode: "modal",
    // headerMode: "none",
    defaultNavigationOptions: {
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
// LoginNavigation.navigationOptions = ({ navigation }) => {
//   let tabBarVisible;
//   let headerVisible;
//   if (navigation.state.routes.length > 1) {
//     navigation.state.routes.map((route) => {
//       if (route.routeName === "Login") {
//         tabBarVisible = false;
//         headerVisible = true;
//       } else {
//         tabBarVisible = true;
//       }
//     });
//   }
//   return {
//     tabBarVisible,
//     headerVisible: true,
//   };
// };
const MyLoginNavigation = createAppContainer(LoginNavigation);
export default MyLoginNavigation;
