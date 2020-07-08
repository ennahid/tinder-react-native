import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-picker";
// var ImagePicker = require("react-native-image-picker");

const options = {
  title: "Pick Image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const options1 = {
  title: "Pick Image",
  customButtons: [{ name: "rm", title: "Delete" }],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const fullWidth = Dimensions.get("window").width;
const ImagePickerWidth = fullWidth / 3;
const ProfileMaker = (props) => {
  const [images, setImages] = useState({});
  useEffect(() => {}, []);

  const showImagePicker = (imageNumber) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // console.log("User cancelled image picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // console.log("User tapped custom button: ", response.customButton);
      } else {
        // const source = { uri: response.uri };
        let imageNum = imageNumber;
        for (let index = imageNumber; index >= 1; index--) {
          if (index !== 1 && images[index - 1] == null) {
            imageNum = imageNum - 1;
            continue;
          } else {
            setImages((values) => ({ ...values, [imageNum]: response.uri }));
          }
        }
      }
    });
  };
  const editImagePicker = (imageNumber) => {
    ImagePicker.showImagePicker(options1, (response) => {
      if (response.didCancel) {
        // console.log("User cancelled image picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // console.log("User tapped custom button: ", response.customButton);
        setImages((values) => ({
          ...values,
          [imageNumber]: "",
        }));
      } else {
        // const source = { uri: response.uri };
        let imageNum = imageNumber;
        for (let index = imageNumber; index >= 1; index--) {
          if (index !== 1 && images[index - 1] == null) {
            imageNum = imageNum - 1;
            continue;
          } else {
            setImages((values) => ({ ...values, [imageNum]: response.uri }));
          }
        }
      }
    });
  };
  return (
    <>
      <SafeAreaView style={styles.ProfileMakerPage}>
        <ScrollView>
          <View style={styles.ImagesContainer}>
            <View style={styles.ImagesContainerBig}>
              <TouchableWithoutFeedback
                onPress={() =>
                  images["1"] ? editImagePicker(1) : showImagePicker(1)
                }
              >
                <View style={[styles.ImagePicker, styles.BigImagePicker]}>
                  {images["1"] ? (
                    <Image
                      source={{ uri: images["1"] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <Icon color={"#cecece"} name="plus" size={25} />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  images["6"] ? editImagePicker(6) : showImagePicker(6)
                }
              >
                <View style={styles.ImagePicker}>
                  {images["6"] ? (
                    <Image
                      source={{ uri: images["6"] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <Icon color={"#cecece"} name="plus" size={25} />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  images["5"] ? editImagePicker(5) : showImagePicker(5)
                }
              >
                <View style={styles.ImagePicker}>
                  {images["5"] ? (
                    <Image
                      source={{ uri: images["5"] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <Icon color={"#cecece"} name="plus" size={25} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.ImagesContainerSmall}>
              <TouchableWithoutFeedback
                onPress={() =>
                  images["2"] ? editImagePicker(2) : showImagePicker(2)
                }
              >
                <View style={styles.ImagePicker}>
                  {images["2"] ? (
                    <Image
                      source={{ uri: images["2"] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <Icon color={"#cecece"} name="plus" size={25} />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  images["3"] ? editImagePicker(3) : showImagePicker(3)
                }
              >
                <View style={styles.ImagePicker}>
                  {images["3"] ? (
                    <Image
                      source={{ uri: images["3"] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <Icon color={"#cecece"} name="plus" size={25} />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  images["4"] ? editImagePicker(4) : showImagePicker(4)
                }
              >
                <View style={styles.ImagePicker}>
                  {images["4"] ? (
                    <Image
                      source={{ uri: images["4"] }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <Icon color={"#cecece"} name="plus" size={25} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.TextContainer}>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>Your Name</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"Jhon Doe"}
                //   onChangeText={(text) => onChangeText(text)}
                //   value={value}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>Your Age</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"01/01/1999"}
                //   onChangeText={(text) => onChangeText(text)}
                //   value={value}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>About You</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"Jhon Doe"}
                //   onChangeText={(text) => onChangeText(text)}
                //   value={value}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>Job Title</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"Add job title"}
                //   onChangeText={(text) => onChangeText(text)}
                //   value={value}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>Company</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"Add company"}
                //   onChangeText={(text) => onChangeText(text)}
                //   value={value}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>School</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"add Scool"}
                //   onChangeText={(text) => onChangeText(text)}
                //   value={value}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  TextBlock: {
    paddingVertical: 5,
  },
  TextBlockInput: {
    fontSize: 19,
    minHeight: 50,
    width: fullWidth,
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 20,
    // paddingTop: 15,
    // paddingBottom: 15,
  },
  TextBlockTitle: {
    fontSize: 20,
    // fontWeight: "500",
    color: "#4a4a4a",
    paddingHorizontal: 15,
  },
  ProfileMakerPage: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  ImagesContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  ImagesContainerBig: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    width: ImagePickerWidth * 2,
  },
  ImagesContainerSmal: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: ImagePickerWidth,
  },
  ImagePicker: {
    backgroundColor: "#eaedf2",
    height: ImagePickerWidth,
    width: ImagePickerWidth,
    borderWidth: 1,
    borderColor: "#dfe2e7",
    // borderStyle: "dotted",
    alignItems: "center",
    justifyContent: "center",
  },
  BigImagePicker: {
    height: ImagePickerWidth * 2,
    width: ImagePickerWidth * 2,
  },
});
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(ProfileMaker);
