import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import CardsPage from "../Pages/CardsPage";
import CardsInfoPage from "../Pages/CardsInfoPage";

const MyStack = createSharedElementStackNavigator(
  {
    CardsPage: {
      screen: CardsPage,
    },
    CardsInfoPage: {
      screen: CardsInfoPage,
      navigationOptions: () => {
        return {
          tabBarVisible: false,
        };
      },
    },
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyleInterpolator: ({ current: { progress } }) => {
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        });
        return { cardStyle: { opacity } };
      },
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: "transparent",
      },
    },
  }
);
MyStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName === "CardsInfoPage") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

export default MyStack;
