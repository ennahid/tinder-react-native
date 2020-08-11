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
  ToastAndroid,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Button } from "@ui-kitten/components";
import DatePicker from "react-native-datepicker";
import DialogAndroid from "react-native-dialogs";
import ImagePicker from "react-native-image-crop-picker";
import { editUserData, addUserPreferences } from "./redux/actions/client";
import Gstyles from "./assets/styles";
import { getUserIdFromUserData } from "./token.helper";
import moment from "moment";
// var ImagePicker = require("react-native-image-picker");

const fullWidth = Dimensions.get("window").width;
const ImagePickerWidth = fullWidth / 3;
const ProfileInfoPage = (props) => {
  const [userData, setUserData] = useState({
    name: props.state.loginReducer.userData.name || "",
    birthday: props.state.loginReducer.userData.birthday || "",
    nameError: false,
    birthdayError: false,
  });

  const onValueChange = (name, value) => {
    setUserData((values) => ({ ...values, [name]: value }));
  };
  const onSubmitUserData = () => {
    if (userData.name && userData.birthday) {
      let formdata = new FormData();
      formdata.append("name", userData.name);
      formdata.append("birthday", userData.birthday);
      formdata.append("no_images", true);
      props.dispatch(editUserData(formdata));
    } else {
      let myData = {
        nameError: userData.name ? false : true,
        birthdayError: userData.birthday ? false : true,
      };
      setUserData((values) => ({ ...values, ...myData }));
    }
  };
  return (
    <>
      <SafeAreaView
        style={styles.ProfileMakerPage}
        pointerEvents={props.state.clientsReducer.loading ? "none" : "auto"}
      >
        <ScrollView
          style={[
            { flex: 1 },
            props.state.clientsReducer.loading ? { opacity: 0.3 } : {},
          ]}
        >
          <View
            style={[
              styles.TextContainer,
              {
                paddingHorizontal: 25,
              },
            ]}
          >
            <View style={[Gstyles.inputContainer, { marginTop: 10 }]}>
              <TextInput
                autoCompleteType={"name"}
                style={Gstyles.myInput}
                placeholder="Name"
                placeholderTextColor={"#C7C7CD"}
                value={userData["name"] || ""}
                onChangeText={(text) => onValueChange("name", text)}
              />
            </View>

            <View style={[Gstyles.inputContainer]}>
              <DatePicker
                style={[Gstyles.myInput, { paddingHorizontal: 0 }]}
                date={userData["birthday"] || null}
                mode="date"
                placeholder="Birthdate"
                format="YYYY/MM/DD"
                minDate="1940-01-01"
                maxDate={moment().format("YYYY-MM-DD")}
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
                    backgroundColor: "#FFF",
                    height: "100%",
                    // width: "100%",
                    // marginVertical: 5,
                    // marginBottom: 10,
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
          </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>
        <View>
          <TouchableNativeFeedback
            onPress={() => onSubmitUserData()}
            disabled={props.state.clientsReducer.loading}
          >
            <View style={[Gstyles.myButtonContainer, { borderRadius: 0 }]}>
              <Text style={Gstyles.myButtonText}>
                {props.state.clientsReducer.loading ? "Loading" : "Save"}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  TextBlock: {
    paddingVertical: 5,
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
    backgroundColor: "#fafafa",
    paddingTop: 20,
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
export default connect(mapStateToProps)(ProfileInfoPage);
