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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Button } from "@ui-kitten/components";
import DatePicker from "react-native-datepicker";
import DialogAndroid from "react-native-dialogs";
import ImagePicker from "react-native-image-crop-picker";
import { addUserData } from "./redux/actions/client";
import Gstyles from "./assets/styles";
// var ImagePicker = require("react-native-image-picker");

const fullWidth = Dimensions.get("window").width;
const ImagePickerWidth = fullWidth / 3;
const ProfileMaker = (props) => {
  const [images, setImages] = useState({});
  const [imagesData, setImagesData] = useState({});
  const [userData, setUserData] = useState({});
  useEffect(() => {}, []);

  const showImagePicker = (imageNumber) => {
    ImagePicker.openPicker({ width: 400, height: 400, cropping: true })
      .then((response) => {
        // const source = { uri: response.path };
        let imageNum = imageNumber;
        for (let index = imageNumber; index >= 1; index--) {
          if (index !== 1 && images[index - 1] == null) {
            imageNum = imageNum - 1;
            continue;
          } else {
            setImages((values) => ({ ...values, [imageNum]: response.path }));
            setImagesData((values) => ({ ...values, [imageNum]: response }));
          }
        }
      })
      .catch((e) => {
        // alert(JSON.stringify(e));
      });
  };
  const editImagePicker = async (imageNumber) => {
    await DialogAndroid.showPicker("Options", null, {
      positiveText: "",
      negativeText: "",
      items: [
        { label: "Select Image", value: true },
        { label: "Delete", value: false },
      ],
    }).then((DialogResponse) => {
      if (DialogResponse?.selectedItem && DialogResponse?.selectedItem?.value) {
        ImagePicker.openPicker({ width: 400, height: 400, cropping: true })
          .then((response) => {
            alert(JSON.stringify(DialogResponse));
            let imageNum = imageNumber;
            for (let index = imageNumber; index >= 1; index--) {
              if (index !== 1 && images[index - 1] == null) {
                imageNum = imageNum - 1;
                continue;
              } else {
                setImages((values) => ({
                  ...values,
                  [imageNum]: response.path,
                }));
                setImagesData((values) => ({
                  ...values,
                  [imageNum]: response,
                }));
              }
            }
          })
          .catch((e) => {
            // alert(JSON.stringify(e));
          });
      } else if (
        DialogResponse?.selectedItem &&
        !DialogResponse?.selectedItem?.value
      ) {
        setImages((values) => ({
          ...values,
          [imageNumber]: "",
        }));
      }
    });
  };

  const onValueChange = (name, value) => {
    setUserData((values) => ({ ...values, [name]: value }));
  };
  const onSubmitUserData = () => {
    let formdata = new FormData();
    for (const key in userData) {
      formdata.append(key, userData[key]);
    }
    for (const key in images) {
      if (images[key] !== "") {
        formdata.append(`productImage${key}`, {
          uri: imagesData[key].path,
          name: imagesData[key].fileName,
          type: imagesData[key].type,
        });
      }
    }
    props.dispatch(addUserData(props.state.loginReducer.userId, formdata));
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
                placeholderTextColor="#C7C7CD"
                onChangeText={(text) => onValueChange("name", text)}
                value={userData["name"]}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>Your Age</Text>
              <DatePicker
                style={{ borderWidth: 0 }}
                date={userData["birthday"] || null}
                mode="date"
                placeholder="Birthday"
                format="YYYY/MM/DD"
                minDate="1940-01-01"
                maxDate="2019-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: "none",
                  },
                  dateInput: {
                    borderWidth: 0,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingHorizontal: 15,
                    height: 0,
                  },
                  dateTouchBody: {
                    width: fullWidth,
                    backgroundColor: "#fff",
                    height: 70,
                    marginVertical: 5,
                    marginBottom: 10,
                  },
                  placeholderText: {
                    fontSize: 16,
                    color: "#C7C7CD",
                  },
                }}
                onDateChange={(date) => {
                  setUserData((values) => ({ ...values, birthday: date }));
                }}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>About You</Text>
              <TextInput
                style={styles.TextBlockInput}
                multiline={true}
                // numberOfLines={10}
                blurOnSubmit={false}
                editable={true}
                placeholder={"Your bio"}
                placeholderTextColor="#C7C7CD"
                onChangeText={(text) => onValueChange("bio", text)}
                value={userData["bio"]}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>Job Title</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"Add job title"}
                placeholderTextColor="#C7C7CD"
                onChangeText={(text) => onValueChange("job", text)}
                value={userData["job"]}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>Company</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"Add company"}
                placeholderTextColor="#C7C7CD"
                onChangeText={(text) => onValueChange("company", text)}
                value={userData["company"]}
              />
            </View>
            <View style={styles.TextBlock}>
              <Text style={styles.TextBlockTitle}>School</Text>
              <TextInput
                style={styles.TextBlockInput}
                placeholder={"Add School"}
                placeholderTextColor="#C7C7CD"
                onChangeText={(text) => onValueChange("school", text)}
                value={userData["school"]}
              />
            </View>
          </View>
          <Button
            size={"large"}
            style={Gstyles.NextPageButton}
            onPress={() => onSubmitUserData()}
            disabled={props.state.clientsReducer.loading}
          >
            {props.state.clientsReducer.loading ? "Loading" : "Continue"}
          </Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  TextBlock: {
    paddingVertical: 5,
  },
  TextBlockTitle: {
    fontSize: 15,
    color: "#4a4a4a",
    fontWeight: "500",
    paddingHorizontal: 15,
  },
  TextBlockInput: {
    fontSize: 16,
    minHeight: 50,
    width: fullWidth,
    marginVertical: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  ProfileMakerPage: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
