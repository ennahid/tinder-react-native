import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
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
import { editUserData, addUserPreferences } from "../redux/actions/client";
import Gstyles from "../assets/styles";
import moment from "moment";

import { getUserIdFromUserData } from "../token.helper";
import { API_URL } from "../app.json";
// var ImagePicker = require("react-native-image-picker");

const fullWidth = Dimensions.get("window").width;
const ImagePickerWidth = fullWidth / 3;
const ProfileEditor = (props) => {
  const [images, setImages] = useState({});
  const [imagesData, setImagesData] = useState({});
  const [userData, setUserData] = useState({
    name: props.state.loginReducer.userData.name,
    bio: props.state.loginReducer.userData.bio,
    birthday: props.state.loginReducer.userData.birthday,
    school: props.state.loginReducer.userData.school,
    company: props.state.loginReducer.userData.company,
    job: props.state.loginReducer.userData.job,
    job: props.state.loginReducer.userData.job,
  });
  useEffect(() => {
    let images = {};
    props.state.loginReducer.userData.images.map((item, index) => {
      images[index + 1] = `${API_URL}/${item}`;
    });
    setImages(images);
  }, []);

  const showImagePicker = (imageNumber) => {
    ImagePicker.openPicker({ width: 400, height: 400, cropping: true })
      .then((response) => {
        // const source = { uri: response.path };
        let imageNum = imageNumber;
        for (let index = imageNumber; index >= 1; index--) {
          // alert(images[index - 1]);
          if (
            index !== 1 &&
            (images[index - 1] === "" ||
              images[index - 1] === undefined ||
              images[index - 1] === null)
          ) {
            imageNum = imageNum - 1;
            // alert(imageNum);
            continue;
          } else {
            setImages((values) => ({ ...values, [imageNum]: response.path }));
            setImagesData((values) => ({ ...values, [imageNum]: response }));
            break;
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
            let imageNum = imageNumber;
            for (let index = imageNumber; index >= 1; index--) {
              if (
                index !== 1 &&
                (images[index - 1] === "" ||
                  images[index - 1] === undefined ||
                  images[index - 1] === null)
              ) {
                // imageNum = imageNum - 1;
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
                break;
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
    // network error : fill fields with text
    setUserData((values) => ({ ...values, [name]: value }));
  };
  const onSubmitUserData = () => {
    let formdata = new FormData();
    let OldImages = [];
    for (const key in userData) {
      formdata.append(key, userData[key]);
    }
    for (const key in images) {
      if (images[key] !== "" && !images[key].includes(API_URL)) {
        formdata.append(`productImage${key}`, {
          uri: imagesData[key].path,
          name: getUserIdFromUserData(),
          type: imagesData[key].mime,
        });
      } else if (images[key].includes(API_URL)) {
        OldImages.push(images[key]);
      }
    }
    formdata.append("oldImages", JSON.stringify(OldImages));
    // alert(JSON.stringify(formdata));
    props.dispatch(editUserData(formdata));
  };
  return (
    <>
      <SafeAreaView
        style={[
          styles.ProfileMakerPage,
          props.state.clientsReducer.loading ? { opacity: 0.3 } : {},
        ]}
      >
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
                      source={{
                        uri: images["1"]
                          ? images["1"]
                          : `${API_URL}/${props.state.loginReducer.userData.images[0]}`,
                      }}
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
                      source={{
                        uri: images["6"]
                          ? images["6"]
                          : `${API_URL}/${props.state.loginReducer.userData.images[5]}`,
                      }}
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
                      source={{
                        uri: images["5"]
                          ? images["5"]
                          : `${API_URL}/${props.state.loginReducer.userData.images[4]}`,
                      }}
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
                      source={{
                        uri: images["2"]
                          ? images["2"]
                          : `${API_URL}/${props.state.loginReducer.userData.images[1]}`,
                      }}
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
                      source={{
                        uri: images["3"]
                          ? images["3"]
                          : `${API_URL}/${props.state.loginReducer.userData.images[2]}`,
                      }}
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
                      source={{
                        uri: images["4"]
                          ? images["4"]
                          : `${API_URL}/${props.state.loginReducer.userData.images[3]}`,
                      }}
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
            <View style={Gstyles.CardItemProfileInfo}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <View style={styles.sectionBlock}>
                <View style={{ paddingRight: 20 }}>
                  <Icon name={"edit"} color={"#ececec"} size={20} />
                </View>

                <TextInput
                  style={styles.specialInput}
                  multiline={true}
                  placeholder={"Describe yourself here"}
                  placeholderTextColor="#C7C7CD"
                  onChangeText={(text) => onValueChange("bio", text)}
                  value={userData["bio"]}
                />
              </View>
            </View>
            <View style={styles.spacerLine}></View>

            {/* ------------------------------------------- */}

            <View style={Gstyles.CardItemProfileInfo}>
              <Text style={styles.sectionTitle}>Personal Info</Text>
              <View style={styles.sectionBlock}>
                <View style={{ paddingRight: 20 }}>
                  <Icon name={"briefcase"} color={"#ececec"} size={20} />
                </View>
                {/* <Text style={styles.sectionInfo}>{userData["job"] || ""}</Text> */}

                <TextInput
                  style={styles.specialInput}
                  placeholder={"What is your job title ?"}
                  placeholderTextColor="#C7C7CD"
                  onChangeText={(text) => onValueChange("job", text)}
                  value={userData["job"]}
                />
              </View>
              <View style={styles.sectionBlock}>
                <View style={{ paddingRight: 20 }}>
                  <Icon name={"briefcase"} color={"#ececec"} size={20} />
                </View>
                {/* <Text style={styles.sectionInfo}>
                  {userData["company"] || ""}
                </Text> */}
                <TextInput
                  style={styles.specialInput}
                  placeholder={"What is your campany name ?"}
                  placeholderTextColor="#C7C7CD"
                  onChangeText={(text) => onValueChange("company", text)}
                  value={userData["company"]}
                />
              </View>
              <View style={styles.sectionBlock}>
                <View style={{ paddingRight: 20 }}>
                  <Icon name={"book"} color={"#ececec"} size={20} />
                </View>
                {/* <Text style={styles.sectionInfo}>
                  {userData["school"] || ""}
                </Text> */}
                <TextInput
                  style={styles.specialInput}
                  placeholder={"What School did you go to ?"}
                  placeholderTextColor="#C7C7CD"
                  onChangeText={(text) => onValueChange("school", text)}
                  value={userData["school"]}
                />
              </View>
            </View>
            {/* ------------------------------------------- */}
            <View style={styles.spacerLine}></View>
          </View>
          {/* <Button
            size={"large"}
            style={Gstyles.NextPageButton}
            onPress={() => onSubmitUserData()}
            disabled={props.state.clientsReducer.loading}
          >
            {props.state.clientsReducer.loading ? "Loading" : "Continue"}
          </Button> */}
          <View style={{ padding: 25 }}>
            <TouchableNativeFeedback
              onPress={() => onSubmitUserData()}
              disabled={props.state.clientsReducer.loading}
            >
              <View style={Gstyles.myButtonContainer}>
                <Text style={Gstyles.myButtonText}>
                  {props.state.clientsReducer.loading ? "Loading" : "Save"}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#FF3E56",
    marginBottom: 20,
    fontWeight: "600",
    opacity: 0.9,
  },
  specialInput: {
    fontSize: 16,
  },
  sectionInfo: {
    color: "#363636",
    fontSize: 15,
    textTransform: "capitalize",
  },
  sectionBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // marginVertical: 5,
  },
  spacerLine: {
    height: 1,
    backgroundColor: "#ececec",
    width: fullWidth,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: "CerealBook",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealBook",
    overflow: "hidden",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailText: {
    fontFamily: "CerealBook",
    fontSize: 14,
    color: "grey",
    marginLeft: 4,
    marginRight: 16,
  },
  smallDivider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
    width: fullWidth * 0.25,
  },
  divider: {
    height: 1,
    backgroundColor: "#DCDDDE",
    marginVertical: 16,
  },
  host: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 76 / 2,
  },
  mediumText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealMedium",
  },
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
export default connect(mapStateToProps)(ProfileEditor);
