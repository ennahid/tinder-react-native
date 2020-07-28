import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ViewPropTypes,
  TouchableOpacity,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import ImageViewer from "react-native-image-zoom-viewer";
import Icon from "react-native-vector-icons/AntDesign";

const MCaroussel = (props) => {
  const myScrollView = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(
    props.state.exploreReducer.mcarousselCurrentImageId[props.itemId]
      ? props.state.exploreReducer.mcarousselCurrentImageId[props.itemId]
      : 0
  );
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
  useEffect(() => {
    if (props.state.exploreReducer.mcarousselCurrentImageId[props.itemId]) {
      // alert("ffff");
      setTimeout(() => {
        myScrollView.current.scrollTo({
          x:
            props.width *
            props.state.exploreReducer.mcarousselCurrentImageId[props.itemId],
          y: 0,
          animated: false,
        });
      }, 0);
    }
  }, []);
  const MAX_DOTS_NUMBER = 10;
  const DOTS_NUMBER =
    props.images.length < MAX_DOTS_NUMBER
      ? props.images.length
      : MAX_DOTS_NUMBER;

  const setSelectedIndex = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(contentOffset / viewSize, 1.0);
    setCurrentIndex(selectedIndex);
    props.dispatch({
      type: "CAROUSSEL_SWIPE",
      itemId: props.itemId,
      payload: selectedIndex,
    });
  };

  const isCloseToStart = (length, current, index) => {
    return MAX_DOTS_NUMBER - DOTS_NUMBER === 0
      ? index === 0 && current > DOTS_NUMBER / 2
        ? false
        : true
      : true;
  };
  const isCloseToEnd = (length, current, index) => {
    // alert(MAX_DOTS_NUMBER - DOTS_NUMBER === 0);
    return MAX_DOTS_NUMBER - DOTS_NUMBER === 0
      ? index === DOTS_NUMBER - 1
        ? current < length - 3
          ? false
          : true
        : true
      : true;
  };
  const isActive = (length, current, index) => {
    let theLength = length - 1;
    let THE_DOTS_NUMBER = DOTS_NUMBER - 1;
    if (current === index && current <= THE_DOTS_NUMBER / 2) {
      return true;
    } else {
      if (current > THE_DOTS_NUMBER / 2) {
        switch (true) {
          case theLength - current > 2:
            return index === THE_DOTS_NUMBER - 3;
          case theLength - current > 1:
            return index === THE_DOTS_NUMBER - 2;
          case theLength - current > 0:
            return index === THE_DOTS_NUMBER - 1;
          case theLength - current < 1:
            return index === THE_DOTS_NUMBER;
          default:
            return false;
        }
      }
    }
  };
  return (
    <View
      style={{
        height: props.height ? props.height : "100%",
        width: "100%",
        backgroundColor: "#cccc",
        opacity: 1,
      }}
    >
      <Modal
        visible={imageGalleryOpen}
        transparent={true}
        onRequestClose={() => {
          setImageGalleryOpen(false);
        }}
      >
        <View style={styles.pageNavigation}>
          <TouchableOpacity onPress={() => setImageGalleryOpen(false)}>
            <View>
              <Icon name="close" color={"#fff"} size={30} />
            </View>
          </TouchableOpacity>
        </View>
        <ImageViewer
          index={currentIndex}
          imageUrls={props.images.map((item) => ({
            url: item.uri,
          }))}
        />
      </Modal>
      <ScrollView
        horizontal
        pagingEnabled
        ref={myScrollView}
        style={{
          backgroundColor: "#cccc",
          opacity: 1,
        }}
        // decelerationRate={'normal'}
        // snapToInterval={props.width} //your element width
        // snapToAlignment={"center"}
        pagingEnabled={true}
        disableIntervalMomentum={true}
        // onMomentumScrollEnd={setSelectedIndex}
        onMomentumScrollEnd={setSelectedIndex}
        showsHorizontalScrollIndicator={false}
      >
        {props.images.map((image, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={(currentIndex) =>
              props.onImagePress
                ? props.onImagePress(currentIndex)
                : setImageGalleryOpen(true)
            }
          >
            <View key={index}>
              <Image
                key={index}
                style={{ width: props.width, height: "100%" }}
                source={image}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {props.images.length > 1 &&
          props.images
            .slice(0, DOTS_NUMBER)
            .map((image, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  !isCloseToStart(props.images.length, currentIndex, index) &&
                    styles.smallDot,
                  !isCloseToEnd(props.images.length, currentIndex, index) &&
                    styles.smallDot,
                  isActive(props.images.length, currentIndex, index) &&
                    styles.activeDot,
                ]}
              />
            ))}
      </View>
    </View>
  );
};
var styles = StyleSheet.create({
  pageNavigation: {
    // backgroundColor: 'red',
    padding: 15,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
  },
  image: {
    height: "100%",
  },
  dotsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    bottom: 5,
  },
  dot: {
    backgroundColor: "#fff",
    height: 7,
    width: 7,
    margin: 5,
    borderRadius: 100,
    opacity: 0.4,
  },
  smallDot: {
    height: 3,
    width: 3,
    margin: 7,
  },
  activeDot: {
    height: 9,
    width: 9,
    margin: 4,
    opacity: 1,
  },
});
MCaroussel.propTypes = {
  // images: ViewPropTypes.array,
  // width: ViewPropTypes.number,
  // onImagePress: ViewPropTypes.func,
};

// export default MCaroussel;
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
// export default MatchedModal;
export default connect(mapStateToProps)(MCaroussel);
