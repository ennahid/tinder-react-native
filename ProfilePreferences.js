import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Toggle, Button } from "@ui-kitten/components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Gstyles from "./assets/styles";
import { addUserPreferences } from "./redux/actions/client";

const fullWidth = Dimensions.get("window").width;
const ProfilePreferences = (props) => {
  const [interest, setInterest] = useState({});
  const [gender, setGender] = useState({});
  const [ageRange, setAgeRange] = useState([18, 25]);
  // useEffect(() => {}, []);

  const submitPreferencesData = () => {
    props.dispatch(
      addUserPreferences({
        gender: gender,
        interestedIn: interest,
        minAgeRange: ageRange[0],
        maxAgeRange: ageRange[1],
      })
    );
  };

  return (
    <SafeAreaView style={styles.ProfilePrefPage}>
      <ScrollView>
        <Text style={styles.prefTitle}>Discovery Settings</Text>
        <View style={styles.prefBlock}>
          <Text style={styles.prefBlockTitle}>My Gender</Text>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Man</Text>
            <Toggle checked={gender === "M"} onChange={(e) => setGender("M")} />
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Woman</Text>
            <Toggle checked={gender === "F"} onChange={(e) => setGender("F")} />
          </View>
        </View>
        <View style={styles.prefBlock}>
          <Text style={styles.prefBlockTitle}>Show Me</Text>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Men</Text>
            <Toggle
              checked={interest["M"]}
              onChange={(e) => setInterest((values) => ({ ...values, M: e }))}
            />
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Women</Text>
            <Toggle
              checked={interest["F"]}
              onChange={(e) => setInterest((values) => ({ ...values, F: e }))}
            />
          </View>
        </View>
        <View style={styles.prefBlock}>
          <View style={styles.SpaceAround}>
            <Text style={styles.prefBlockTitle}>Age Range</Text>
            <Text style={styles.prefBlockTitle}>{`${ageRange[0]} - ${
              ageRange[1]
            }${(ageRange[1] === 50 && "+") || ""}`}</Text>
          </View>
          <View style={[styles.prefRadioBlock, styles.sliderBlock]}>
            <MultiSlider
              values={ageRange}
              min={18}
              max={50}
              sliderLength={fullWidth - 60}
              trackStyle={{
                height: 3,
                backgroundColor: "blue",
              }}
              selectedStyle={{
                backgroundColor: "cyan",
              }}
              customMarker={() => (
                <View
                  style={{
                    backgroundColor: "blue",
                    height: 25,
                    width: 25,
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
        <Button
          size={"large"}
          style={Gstyles.NextPageButton}
          onPress={() => submitPreferencesData()}
          disabled={props.state.clientsReducer.loading}
        >
          {props.state.clientsReducer.loading ? "Loading" : "Continue"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ProfilePrefPage: { flex: 1, backgroundColor: "#f5f5f5" },
  SpaceAround: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prefTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#464646",
    paddingHorizontal: 15,
    marginVertical: 10,
    marginBottom: 15,
  },
  sliderBlock: {
    justifyContent: "center",
  },
  prefBlock: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: fullWidth,
    marginBottom: 25,
  },
  prefBlockTitle: {
    color: "red",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    marginBottom: 15,
  },
  prefRadioText: {
    fontSize: 16,
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
export default connect(mapStateToProps)(ProfilePreferences);
