import React, { useEffect } from "react";
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
import { Toggle, Radio } from "@ui-kitten/components";

const fullWidth = Dimensions.get("window").width;
const ProfilePreferences = (props) => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.ProfilePrefPage}>
      <ScrollView>
        <Text style={styles.prefTitle}>Discovery Settings</Text>
        <View style={styles.prefBlock}>
          <Text style={styles.prefBlockTitle}>My Gender</Text>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Man</Text>
            <Toggle />
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Women</Text>
            <Toggle />
          </View>
        </View>
        <View style={styles.prefBlock}>
          <Text style={styles.prefBlockTitle}>Show Me</Text>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Men</Text>
            <Toggle />
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Women</Text>
            <Toggle />
          </View>
        </View>
        <View style={styles.prefBlock}>
          <View>
            <Text style={styles.prefBlockTitle}>Age Range</Text>
            <Text style={styles.prefBlockTitle}>19 - 24</Text>
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Men</Text>
            <Toggle />
          </View>
          <View style={styles.prefRadioBlock}>
            <Text style={styles.prefRadioText}>Women</Text>
            <Toggle />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ProfilePrefPage: { flex: 1, backgroundColor: "#f5f5f5" },
  prefTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#464646",
    paddingHorizontal: 15,
    marginVertical: 10,
    marginBottom: 15,
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
    // color: "#464646",
    // paddingHorizontal: 15,
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
