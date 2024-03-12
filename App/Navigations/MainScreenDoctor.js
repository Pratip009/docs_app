import { View, Text } from "react-native";
import React from "react";
import DoctorTabNavigtion from "./DoctorTabNavigtion";

export default function MainScreenDoctor({ route, navigation }) {
  // Check if route.params is defined, and if not, provide default values
  const { doctorId = "", token = "" } = route.params || {};

  return (
    <View style={{ flex: 1 }}>
      <DoctorTabNavigtion />
    </View>
  );
}
