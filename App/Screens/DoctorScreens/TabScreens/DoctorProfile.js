import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import Colors from "../../../Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DoctorProfile = ({ route, navigation }) => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [editableDetails, setEditableDetails] = useState({});
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const { doctorId, token } = route.params;
  const handleScreenNavigation = (screenName) => {
    navigation.navigate(screenName);
  };
  const handleLogout = async () => {
    try {
      Alert.alert(
        "Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              // Clear the user token from AsyncStorage
              await AsyncStorage.removeItem("userToken");
              console.log("clickedddd");
              // Navigate back to the login screen
              navigation.replace("doctor-login");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTextChange = (text, field) => {
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      [field]: text,
    }));
  };

  const handleSave = async () => {
    try {
      const doctorEntryId = doctorDetails.id;
      const updateEndpoint = `http://192.168.1.104:1337/api/doctors/${doctorEntryId}`;

      const updatePayload = {
        data: {
          Name: doctorDetails.Name,
          Address: doctorDetails.Address,
          Patients: doctorDetails.Patients,
          Year_of_Experience: doctorDetails.Year_of_Experience,
          About: doctorDetails.About,
          Registration: doctorDetails.Registration,
          Fees: doctorDetails.Fees,
          Speciality: doctorDetails.Speciality,
          Schedule: doctorDetails.Schedule.replace(/->/g, " at "),
          Image: selectedImageUri,
        },
      };

      const response = await axios.put(updateEndpoint, updatePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Doctor details updated successfully!");
    } catch (error) {
      console.error("Error updating doctor details:", error);
      alert("Failed to update details.");
    }
  };

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.104:1337/api/users/${doctorId}?populate[doctor][populate]=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Doctor Details:", response.data);

        // Assuming the doctor's details are within a nested structure under 'doctor'
        setDoctorDetails(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, [doctorId, token]);

  if (!doctorDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading Doctor Details...</Text>
      </View>
    );
  }
  const TableRow = ({ title, value }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cellTitle}>{title}</Text>
      <Text style={styles.cellValue}>{value}</Text>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "appfontbold",
          }}
        >
          Profile
        </Text>

        <Ionicons
          name="log-out"
          size={28}
          color={Colors.PRIMARY}
          onPress={handleLogout}
        />
      </View>
      <View style={styles.table}>
        {doctorDetails.Image && (
          <Image
            source={{ uri: doctorDetails.Image.url }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              alignSelf: "center",
              marginTop: 20,
            }}
            resizeMode="cover"
          />
        )}

        <Text style={styles.cellTitle}>Name:</Text>
        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Name")}
          value={doctorDetails.Name}
        />
        <Text style={styles.cellTitle}>Address:</Text>
        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Address")}
          value={doctorDetails.Address}
        />

        <Text style={styles.cellTitle}>Patients:</Text>
        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Patients")}
          value={doctorDetails.Patients}
        />
        <Text style={styles.cellTitle}>Year of Experience:</Text>
        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Year_of_Experience")}
          value={doctorDetails.Year_of_Experience}
        />
        <Text style={styles.cellTitle}>About:</Text>
        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "About")}
          value={doctorDetails.About}
          multiline={true}
          numberOfLines={4}
        />
        <Text style={styles.cellTitle}>Registration Number:</Text>
        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Registration")}
          value={doctorDetails.Registration}
        />
        <Text style={styles.cellTitle}>Consultation Fees:</Text>
        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Fees")}
          value={doctorDetails.Fees}
        />

        <Text style={styles.cellTitle}>Speciality:</Text>

        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Speciality")}
          value={doctorDetails.Speciality}
        />

        <Text style={styles.cellTitle}>Schedule:</Text>

        <TextInput
          style={styles.cellValue}
          onChangeText={(text) => handleTextChange(text, "Schedule")}
          value={doctorDetails.Schedule.replace(/->/g, " at ")}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 40,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "appfont",
          }}
        >
          Save Changes
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingVertical: 10,
  },
  cellTitle: {
    fontSize: 20,
    flex: 1,
    paddingLeft: 5,
    fontFamily: "appfontsemibold",
  },
  cellValue: {
    flex: 3,
    fontSize: 16,

    paddingRight: 5,
    borderWidth: 1,
    borderRadius: 10, // Added to visually distinguish the input field
    borderColor: Colors.grey,
    padding: 5, // Padding for the input field
    marginLeft: 5,
    fontFamily: "appfont",
  },
});

export default DoctorProfile;
