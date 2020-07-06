import React from "react";
import { View, ImageBackground, Image } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import City from "../components/City";
import Filters from "../components/Filters";
import CardItem from "../components/CardItem";
import { connect } from "react-redux";
import styles from "../assets/styles";
import Demo from "../assets/data/demo.js";

const Home = (props) => {
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
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

        <CardStack
          loop={true}
          // onSwipedAll={() => console.log("this is all")}
          // verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(swiper) => (this.swiper = swiper)}
        >
          {Demo.map((item, index) => (
            <Card key={index}>
              <CardItem
                image={item.image}
                name={item.name}
                // description={item.description}
                description={props?.state?.loginReducer?.email}
                matches={item.match}
                actions
                onPressLeft={() => this.swiper.swipeLeft()}
                onPressRight={() => this.swiper.swipeRight()}
                onSuperLike={() => this.swiper.swipeTop()}
                onPressStar={() => this.swiper.swipeBottom()}
              />
            </Card>
          ))}
        </CardStack>
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
