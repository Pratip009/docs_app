import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../App/Shared/Colors";

const DoctorDetailsItem = ({ doctor }) => {
  

  const doctorName = doctor.attributes?.Name || "Unknown";
  const doctorCategory = doctor.attributes?.Speciality || "No Category";
  const doctorExperience =
    doctor.attributes?.Year_of_Experience || "Not provided";
  const doctorAddress = doctor.attributes?.Address || "Address not available";
  const doctorPatientsCured = doctor.attributes?.Patients || "0";
  const doctorImage = doctor.attributes?.Image?.url || null;

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 20 }}>
      {doctorImage && (
          <Image
            source={{ uri: doctorImage }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        )}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "appfontsemibold",
              marginTop: 5,
            }}
          >
            {doctorName}
          </Text>
          <Text
            style={{ color: Colors.GRAY, fontFamily: "appfont", marginTop: 1 }}
          >
            {doctorCategory}
          </Text>
          <Text
            style={{
              fontFamily: "appfont",
              color: Colors.PRIMARY,
              marginTop: 3,
            }}
          >
            {`${doctorExperience} years of experience`}
          </Text>
          <Text
            style={{ fontFamily: "appfont", color: Colors.grey, marginTop: 3 }}
          >
            {doctorAddress}
          </Text>
          <Text
            style={{
              fontFamily: "appfont",
              color: Colors.deepgrey,
              marginTop: 3,
            }}
          >
            Cured: {doctorPatientsCured} patients
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: Colors.SECONDARY,
          borderRadius: 10,
          alignItems: "center", // This ensures content is centered horizontally.
          justifyContent: "center", // This ensures content is centered vertically.
          width: "100%",
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center", // Keeps text centered within the Text component.
            fontFamily: "appfontsemibold",
          }}
        >
          View Doctor Details
        </Text>
      </TouchableOpacity>

      {/* Other details and buttons can be added here */}
    </View>
  );
};

export default DoctorDetailsItem;
