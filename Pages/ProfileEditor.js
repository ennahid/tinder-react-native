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
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CheckBox from "@react-native-community/checkbox";
import DialogAndroid from "react-native-dialogs";
import Modal from "react-native-modal";
import Content from "../assets/data/content";
import ImagePicker from "react-native-image-crop-picker";
import { editUserData } from "../redux/actions/client";
import Gstyles from "../assets/styles";

import { getUserIdFromUserData } from "../token.helper";
import { API_URL } from "../app.json";

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};
const fullWidth = Dimensions.get("window").width;
const ImagePickerWidth = fullWidth / 3;
const ProfileEditor = (props) => {
  const [images, setImages] = useState({});
  const [imagesData, setImagesData] = useState({});
  const [ModalData, setModalData] = useState({
    hashtags: Content.hashtags
      .concat(props.state.loginReducer.userData?.hashtags)
      .unique(),
    music: Content.music
      .concat(props.state.loginReducer.userData?.music)
      .unique(),
    sports: Content.sports
      .concat(props.state.loginReducer.userData?.sports)
      .unique(),
    shows: Content.shows
      .concat(props.state.loginReducer.userData?.shows)
      .unique(),
    books: Content.books
      .concat(props.state.loginReducer.userData?.books)
      .unique(),
    foods: Content.foods
      .concat(props.state.loginReducer.userData?.foods)
      .unique(),
    selectedModalData: {
      hashtags: props.state.loginReducer.userData?.hashtags,
      music: props.state.loginReducer.userData?.music,
      sports: props.state.loginReducer.userData?.sports,
      shows: props.state.loginReducer.userData?.shows,
      books: props.state.loginReducer.userData?.books,
      foods: props.state.loginReducer.userData?.foods,
    },
    savedModalData: {
      hashtags: props.state.loginReducer.userData?.hashtags,
      music: props.state.loginReducer.userData?.music,
      sports: props.state.loginReducer.userData?.sports,
      shows: props.state.loginReducer.userData?.shows,
      books: props.state.loginReducer.userData?.books,
      foods: props.state.loginReducer.userData?.foods,
    },
    currentModalData: "hashtags",
  });
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
  useEffect(() => {
    // alert(JSON.stringify(props.state.loginReducer.userData.images));
    for (key in props.state.loginReducer.userData.images) {
      if (key !== "unique") {
        Image.prefetch(
          `${API_URL}/${props.state.loginReducer.userData.images[key]}`
        );
      }
    }
  }, [props.state.loginReducer.userData.images]);

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

  const onSelectTag = (item) => {
    let current = ModalData.currentModalData;
    // alert(current);
    // alert(JSON.stringify(ModalData.selectedModalData));
    // // return;
    let tagIndex = ModalData.selectedModalData[current]?.indexOf(item);

    let allselectedTags = { ...ModalData.selectedModalData };
    if (tagIndex === -1) {
      //does not exist
      allselectedTags[current].push(item);
      setModalData((values) => ({
        ...values,
        selectedModalData: allselectedTags,
      }));
    } else {
      allselectedTags[current].splice(tagIndex, 1);
      setModalData((values) => ({
        ...values,
        selectedModalData: allselectedTags,
      }));
    }
    // alert(
    //   JSON.stringify({
    //     tagIndex: tagIndex,
    //     current: current,
    //     item: item,
    //   })
    // );
  };
  const addNewtag = () => {
    let tagsList = { ...ModalData };
    // alert(ModalData.currentModalData);
    tagsList[ModalData.currentModalData].unshift(userData["newTag"]);
    tagsList["selectedModalData"][ModalData.currentModalData].unshift(
      userData["newTag"]
    );
    setModalData((values) => ({
      ...values,
      ...tagsList,
    }));
    setUserData((values) => ({ ...values, newTag: null }));
  };
  const saveSelectedTags = () => {
    alert("save clicked");
    setUserData((values) => ({
      ...values,
      isOpen: false,
    }));
    setModalData((values) => ({
      ...values,
      savedModalData: { ...ModalData.selectedModalData },
    }));
  };

  const onSubmitUserData = () => {
    let formdata = new FormData();
    let OldImages = [];
    formdata.append("allTags", JSON.stringify(ModalData.savedModalData));
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
        OldImages.push(images[key].replace(`${API_URL}/`, ""));
      }
    }
    formdata.append("oldImages", JSON.stringify(OldImages));
    props.dispatch(editUserData(formdata));
  };
  return (
    <>
      <SafeAreaView
        pointerEvents={props.state.clientsReducer.loading ? "none" : "auto"}
        style={[
          styles.ProfileMakerPage,
          props.state.clientsReducer.loading ? { opacity: 0.3 } : {},
        ]}
      >
        <Modal
          isVisible={userData["isOpen"]}
          onBackdropPress={() =>
            setUserData((values) => ({
              ...values,
              isOpen: false,
            }))
          }
          // deviceWidth={deviceWidth}
          // deviceHeight={deviceHeight}
        >
          <View
            style={{
              flex: 1,
              padding: 15,
              backgroundColor: "#fff",
              borderRadius: 2,

              // flexGrow: 1,
            }}
          >
            <View style={styles.modalHead}>
              <Text style={styles.modalTitle}>Choose</Text>
              <View style={[styles.modalInputContainer]}>
                <Icon name={"plus"} color={"#FF3E5690"} size={10} />
                <TextInput
                  style={[styles.modalInput, { width: "100%" }]}
                  placeholder={"Add custom tags"}
                  placeholderTextColor="#C7C7CD"
                  onChangeText={(text) => onValueChange("newTag", text)}
                  value={userData["newTag"]}
                />
                {userData["newTag"] ? (
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      // margin: 10,
                    }}
                  >
                    <TouchableNativeFeedback onPress={() => addNewtag()}>
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          paddingVertical: 10,
                          paddingHorizontal: 13,
                          backgroundColor: "#FF3E56",
                          borderRadius: 4,
                        }}
                      >
                        Add
                      </Text>
                    </TouchableNativeFeedback>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={styles.modalBody}>
              <ScrollView>
                <View>
                  {ModalData[ModalData.currentModalData].map((item, index) => (
                    <TouchableNativeFeedback
                      onPress={() => onSelectTag(item)}
                      key={index}
                    >
                      <View
                        style={{
                          paddingVertical: 8,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <CheckBox
                          key={index}
                          disabled={false}
                          value={ModalData?.selectedModalData[
                            ModalData?.currentModalData
                          ]?.includes(item)}
                          tintColors={{ true: "#FF3E56" }}
                          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text style={styles.checkboxText}>{item}</Text>
                      </View>
                    </TouchableNativeFeedback>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.modalFooter}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  // backgroundColor: "red",
                }}
              >
                <TouchableNativeFeedback
                  onPress={() =>
                    setUserData((values) => ({
                      ...values,
                      isOpen: false,
                    }))
                  }
                >
                  <Text style={styles.modalButton}>CANCEL</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => saveSelectedTags()}>
                  <Text style={styles.modalButton}>OK</Text>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </Modal>
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
                  <Icon name={"edit"} color={"#89989b"} size={20} />
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
                  <Icon name={"briefcase"} color={"#89989b"} size={20} />
                </View>
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
                  <Icon name={"briefcase"} color={"#89989b"} size={20} />
                </View>
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
                  <Icon name={"book"} color={"#89989b"} size={20} />
                </View>
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
            {/* ------------------------------------------- */}
            <View style={Gstyles.CardItemProfileInfo}>
              <Text style={styles.sectionTitle}>Hashtags</Text>
              <TouchableNativeFeedback
                onPress={() => {
                  setModalData((values) => ({
                    ...values,
                    currentModalData: "hashtags",
                  }));
                  setUserData((values) => ({
                    ...values,
                    isOpen: true,
                  }));
                }}
              >
                <View style={styles.sectionBlock}>
                  <View style={{ paddingRight: 20 }}>
                    <View
                      style={{
                        backgroundColor: "#2c497d",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <Icon name={"hash"} color={"#ffff"} size={14} />
                    </View>
                  </View>
                  {ModalData?.savedModalData?.hashtags?.length > 0 ? (
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {ModalData?.savedModalData?.hashtags.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            { backgroundColor: "#2c497d50", color: "#2c497d" },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.specialDialogTrigger}>
                      Add your hashtags
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
            {/* ------------------------------------------- */}
            <View style={styles.spacerLine}></View>
            {/* ------------------------------------------- */}
            <View style={Gstyles.CardItemProfileInfo}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <TouchableNativeFeedback
                onPress={() => {
                  setModalData((values) => ({
                    ...values,
                    currentModalData: "sports",
                  }));
                  setUserData((values) => ({
                    ...values,
                    isOpen: true,
                  }));
                }}
              >
                <View style={[styles.sectionBlock, { paddingVertical: 10 }]}>
                  <View style={{ paddingRight: 20 }}>
                    <View
                      style={{
                        backgroundColor: "#237c3e",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <MIcon name={"dumbbell"} color={"#ffff"} size={14} />
                    </View>
                  </View>
                  {ModalData?.savedModalData?.sports?.length > 0 ? (
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {ModalData?.savedModalData?.sports.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            { backgroundColor: "#237c3e50", color: "#237c3e" },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.specialDialogTrigger}>
                      What sports are you into?
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setModalData((values) => ({
                    ...values,
                    currentModalData: "music",
                  }));
                  setUserData((values) => ({
                    ...values,
                    isOpen: true,
                  }));
                }}
              >
                <View style={[styles.sectionBlock, { paddingVertical: 10 }]}>
                  <View style={{ paddingRight: 20 }}>
                    <View
                      style={{
                        backgroundColor: "#0400ff",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <Icon name={"music"} color={"#ffff"} size={14} />
                    </View>
                  </View>
                  {ModalData?.savedModalData?.music?.length > 0 ? (
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {ModalData?.savedModalData?.music.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            { backgroundColor: "#0400ff50", color: "#0400ff" },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.specialDialogTrigger}>
                      What music do you like?
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setModalData((values) => ({
                    ...values,
                    currentModalData: "shows",
                  }));
                  setUserData((values) => ({
                    ...values,
                    isOpen: true,
                  }));
                }}
              >
                <View style={[styles.sectionBlock, { paddingVertical: 10 }]}>
                  <View style={{ paddingRight: 20 }}>
                    <View
                      style={{
                        backgroundColor: "#e06ed7",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <Icon name={"tv"} color={"#ffff"} size={14} />
                    </View>
                  </View>
                  {ModalData?.savedModalData?.shows?.length > 0 ? (
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {ModalData?.savedModalData?.shows.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            { backgroundColor: "#e06ed750", color: "#e06ed7" },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.specialDialogTrigger}>
                      What's your favorite TV shows?
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setModalData((values) => ({
                    ...values,
                    currentModalData: "foods",
                  }));
                  setUserData((values) => ({
                    ...values,
                    isOpen: true,
                  }));
                }}
              >
                <View style={[styles.sectionBlock, { paddingVertical: 10 }]}>
                  <View style={{ paddingRight: 20 }}>
                    <View
                      style={{
                        backgroundColor: "#13c3ab",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <MIcon
                        name={"silverware-fork-knife"}
                        color={"#ffff"}
                        size={14}
                      />
                    </View>
                  </View>
                  {ModalData?.savedModalData?.foods?.length > 0 ? (
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {ModalData?.savedModalData?.foods.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            { backgroundColor: "#13c3ab50", color: "#13c3ab" },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.specialDialogTrigger}>
                      What food do you prefer?
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setModalData((values) => ({
                    ...values,
                    currentModalData: "books",
                  }));
                  setUserData((values) => ({
                    ...values,
                    isOpen: true,
                  }));
                }}
              >
                <View style={[styles.sectionBlock, { paddingVertical: 10 }]}>
                  <View style={{ paddingRight: 20 }}>
                    <View
                      style={{
                        backgroundColor: "#52237c",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <Icon name={"book-open"} color={"#ffff"} size={14} />
                    </View>
                  </View>
                  {ModalData?.savedModalData?.books?.length > 0 ? (
                    <View
                      style={{
                        width: "90%",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {ModalData?.savedModalData?.books.map((item) => (
                        <Text
                          key={item}
                          style={[
                            styles.selectedTagItem,
                            { backgroundColor: "#52237c50", color: "#52237c" },
                          ]}
                        >
                          {item}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.specialDialogTrigger}>
                      What books do you like?
                    </Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
            {/* ------------------------------------------- */}
            <View style={styles.spacerLine}></View>
            {/* ------------------------------------------- */}
            <View style={Gstyles.CardItemProfileInfo}>
              <Text style={styles.sectionTitle}>My Account</Text>
              <Text>
                My Profile ID : {props?.state?.loginReducer?.userData?._id}
              </Text>
            </View>
            {/* ------------------------------------------- */}
            <View style={styles.spacerLine}></View>
          </View>
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
  specialDialogTrigger: {
    fontSize: 16,
    color: "#C7C7CD",
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
    width: "100%",
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
  modalHead: {
    minHeight: 90,
    // backgroundColor: "green",
  },
  modalBody: {
    overflow: "hidden",
    flex: 1,
  },

  modalFooter: {
    minHeight: 40,
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modalTitle: {
    color: "#363636",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  modalInput: {
    marginLeft: 5,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontWeight: "600",
    color: "#FF3E56",
  },
  checkboxText: {
    color: "#363636",
    fontSize: 16,
    paddingLeft: 5,
    textTransform: "capitalize",
  },
  selectedTagItem: {
    backgroundColor: "#ececec",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 2,
    marginVertical: 3,
    textAlign: "center",
    borderRadius: 5,
    width: "auto",
    textTransform: "capitalize",
  },
});
const mapStateToProps = (state) => {
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(ProfileEditor);
