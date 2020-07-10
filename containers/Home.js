import React, { useEffect } from "react";
import { View, ImageBackground, Image, Dimensions, Text } from "react-native";

import { connect } from "react-redux";
import styles from "../assets/styles";
import MyCardStack from "../components/MyCardStack";

const fullHeight = Dimensions.get("window").height;
const Home = (props) => {
  useEffect(() => {
    // alert(JSON.stringify(props));
  }, [props]);
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
      // style={{ backgroundColor: "red" }}
    >
      {/* <View style={styles.containerHome}> */}
      <View style={styles.containerHome}>
        {/* <Text>{JSON.stringify(Demo)}</Text> */}
        {fullHeight > 700 && (
          <View style={styles.top}>
            <Image
              style={{
                width: 150,
                height: 60,
                resizeMode: "contain",
                // backgroundColor: "#cecece",
              }}
              source={require("../assets/images/dk.png")}
            />

            {/* <City />
          <Filters />  */}
          </View>
        )}

        <MyCardStack />
      </View>
    </ImageBackground>
  );
};
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default Home;
export default connect(mapStateToProps)(Home);
