import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableNativeFeedback,
  ScrollView,
  Switch,
} from "react-native";
import { Toggle, Button } from "@ui-kitten/components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Gstyles from "./assets/styles";
import { editUserPreferences } from "./redux/actions/client";

const fullWidth = Dimensions.get("window").width;
const SeetingsPage = (props) => {
  const [interest, setInterest] = useState({
    M: props.state.loginReducer.userData.wants.includes("M"),
    F: props.state.loginReducer.userData.wants.includes("F"),
  });
  const [gender, setGender] = useState(
    props.state.loginReducer.userData.gender || ""
  );
  const [ageRange, setAgeRange] = useState([
    props.state.loginReducer.userData.minAgeRange,
    props.state.loginReducer.userData.maxAgeRange,
  ]);

  const submitPreferencesData = () => {
    if (Object.keys(gender).length > 0 && Object.keys(interest).length > 0) {
      props.dispatch(
        editUserPreferences({
          gender: gender,
          interestedIn: interest,
          minAgeRange: ageRange[0],
          maxAgeRange: ageRange[1],
        })
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.ProfilePrefPage}
      pointerEvents={props.state.clientsReducer.loading ? "none" : "auto"}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={[
          { flex: 1 },
          props.state.clientsReducer.loading ? { opacity: 0.3 } : {},
        ]}
      >
        {/* <Text style={styles.prefTitle}>Discovery Settings</Text> */}
        <View style={styles.prefBlock}>
          <Text style={styles.prefBlockTitle}>My Gender</Text>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Man</Text>
            {/* <Toggle
              style={{ borderColor: "red" }}
              checked={gender === "M"}
              onChange={(e) => setGender("M")}
            /> */}
            <Switch
              value={gender === "M"}
              onChange={(e) => setGender("M")}
              thumbColor={gender === "M" ? "#ff3e56" : "#ededed"}
              // trackColor={gender === "M" ? "#ff3e56" : "#cccccc"}
              trackColor={{ false: "#cccccc", true: "#ff3e5635" }}
            />
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Woman</Text>
            {/* <Toggle checked={gender === "F"} onChange={(e) => setGender("F")} /> */}
            <Switch
              value={gender === "F"}
              onChange={(e) => setGender("F")}
              thumbColor={gender === "F" ? "#ff3e56" : "#ededed"}
              trackColor={{ false: "#cccccc", true: "#ff3e5635" }}
            />
          </View>
        </View>
        <View style={styles.prefBlock}>
          <Text style={styles.prefBlockTitle}>Show Me</Text>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Men</Text>
            <Switch
              value={interest["M"]}
              onValueChange={(e) =>
                setInterest((values) => ({ ...values, M: e }))
              }
              thumbColor={interest["M"] ? "#ff3e56" : "#ededed"}
              trackColor={{ false: "#cccccc", true: "#ff3e5635" }}
            />
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Women</Text>
            {/* <Toggle
              checked={interest["F"]}
              onChange={(e) => setInterest((values) => ({ ...values, F: e }))}
            /> */}
            <Switch
              value={interest["F"]}
              onValueChange={(e) =>
                setInterest((values) => ({ ...values, F: e }))
              }
              thumbColor={interest["F"] ? "#ff3e56" : "#ededed"}
              trackColor={{ false: "#cccccc", true: "#ff3e5635" }}
            />
          </View>
        </View>

        <View style={styles.prefBlock}>
          <View style={styles.SpaceAround}>
            <Text style={styles.prefBlockTitle}>Age Range</Text>
            <Text
              style={[
                styles.prefBlockTitle,
                { color: "#38537C", fontSize: 17 },
              ]}
            >{`${ageRange[0]} - ${ageRange[1]}${
              (ageRange[1] === 50 && "+") || ""
            }`}</Text>
          </View>
          <View style={[styles.prefRadioBlock, styles.sliderBlock]}>
            <MultiSlider
              values={ageRange}
              min={18}
              max={50}
              sliderLength={fullWidth - 90}
              trackStyle={{
                height: 3,
                backgroundColor: "#ff3e5620",
              }}
              selectedStyle={{
                backgroundColor: "#FF3E56",
              }}
              customMarker={() => (
                <View
                  style={{
                    backgroundColor: "#FF3E56",
                    height: 20,
                    width: 20,
                    borderRadius: 25,
                  }}
                ></View>
              )}
              // onValuesChangeStart={sliderOneValuesChangeStart}
              onValuesChange={(e) => setAgeRange(e)}
              // onValuesChangeFinish={sliderOneValuesChangeFinish}
            />
          </View>
        </View>
        <View
          style={{ paddingVertical: 20, paddingHorizontal: 15, width: "100%" }}
        >
          <TouchableNativeFeedback
            onPress={() => submitPreferencesData()}
            disabled={props.state.clientsReducer.loading}
          >
            <View style={[Gstyles.myButtonContainer]}>
              <Text style={Gstyles.myButtonText}>
                {props.state.clientsReducer.loading ? "Loading" : "Save"}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
      <View>
        {/* <TouchableNativeFeedback
          onPress={() => onSubmitUserData()}
          disabled={props.state.clientsReducer.loading}
        >
          <View style={Gstyles.myButtonContainer}>
            <Text style={Gstyles.myButtonText}>
              {props.state.clientsReducer.loading ? "Loading" : "Save"}
            </Text>
          </View>
        </TouchableNativeFeedback> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ProfilePrefPage: {
    flex: 1,
    backgroundColor: "#fafafa",
    // paddingHorizontal: 25,
    // alignItems: "center",
  },
  SpaceAround: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prefTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#565656",
    paddingHorizontal: 15,
    marginVertical: 10,
    marginBottom: 15,
    marginHorizontal: 25,
  },
  sliderBlock: {
    justifyContent: "center",
  },
  prefBlock: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: fullWidth - 25,
    // marginHorizontal: 12.5,
    marginVertical: 10,
    borderRadius: 6,
    shadowColor: "#00000001",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.005,
    shadowRadius: 5,
    elevation: 5,
  },
  prefBlockTitle: {
    color: "#FF3E56",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    marginBottom: 15,
    opacity: 0.9,
  },
  prefRadioText: {
    fontSize: 15,
    color: "#38537C",
    fontWeight: "500",
  },
  prefRadioBlock: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
});
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    state: state,
  };
};
export default connect(mapStateToProps)(SeetingsPage);
