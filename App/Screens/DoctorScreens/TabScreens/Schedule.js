import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";

const Schedule = ({ route }) => {
  const { doctorId, token } = route.params;

  const [availabilities, setAvailabilities] = useState([]);
  const [updatedAvailabilities, setUpdatedAvailabilities] = useState([]);

  const fetchDoctorAvailabilities = async () => {
    try {
      const userResponse = await axios.get(
        `http://192.168.1.104:1337/api/users/${doctorId}?populate[doctor][populate]=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mainDoctorId = userResponse.data.doctor.id;

      const response = await axios.get(
        `http://192.168.1.104:1337/api/availabilities?filters[doctor][id][$eq]=${mainDoctorId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAvailabilities(response.data.data);
      setUpdatedAvailabilities(response.data.data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  };

  useEffect(() => {
    fetchDoctorAvailabilities();
  }, [doctorId, token]);

  const handleUpdate = async () => {
    try {
      const promises = updatedAvailabilities.map(async (availability) => {
        const { id, attributes } = availability;
        const data = {
          data: {
            id,
            attributes,
          },
        };

        await axios.put(
          `http://192.168.1.104:1337/api/availabilities/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      await Promise.all(promises);
      Alert.alert("Success", "Availabilities updated successfully.");
    } catch (error) {
      console.error("Error updating availabilities:", error);
      Alert.alert(
        "Error",
        "Failed to update availabilities. Please try again later."
      );
    }
  };

  const handleInputChange = (value, index, field) => {
    const newAvailabilities = [...updatedAvailabilities];
    const availability = { ...newAvailabilities[index] };

    // Check if each nested property exists before updating
    if (!availability.attributes) {
      availability.attributes = {};
    }
    if (!availability.attributes.hospital) {
      availability.attributes.hospital = { data: { attributes: {} } };
    }
    if (!availability.attributes.day) {
      availability.attributes.day = { data: { attributes: {} } };
    }
    if (!availability.attributes.area) {
      availability.attributes.area = { data: { attributes: {} } };
    }

    // Update the value for the specified field
    if (field === "StartTime" || field === "EndTime") {
      availability.attributes[field] = value;
    } else {
      // Update nested attributes
      availability.attributes[field].data.attributes[field] = value;
    }

    // Update the updatedAvailabilities state
    newAvailabilities[index] = availability;
    setUpdatedAvailabilities(newAvailabilities);
  };

  if (!availabilities || availabilities.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No availabilities found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Doctor's Availabilities</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.cell}>Start Time</Text>
          <Text style={styles.cell}>End Time</Text>
          <Text style={styles.cell}>Chember</Text>
          <Text style={styles.cell}>Day</Text>
          <Text style={styles.cell}>Area</Text>
        </View>
        {updatedAvailabilities.map((availability, index) => (
          <View key={availability.id} style={styles.row}>
            <TextInput
              style={styles.cell}
              value={availability.attributes.StartTime}
              onChangeText={(value) =>
                handleInputChange(value, index, "StartTime")
              }
            />
            <TextInput
              style={styles.cell}
              value={availability.attributes.EndTime}
              onChangeText={(value) =>
                handleInputChange(value, index, "EndTime")
              }
            />
            <TextInput
              style={styles.cell}
              value={availability.attributes.hospital.data.attributes.Name}
              onChangeText={(value) =>
                handleInputChange(value, index, "hospital")
              }
            />
            <TextInput
              style={styles.cell}
              value={availability.attributes.day.data.attributes.Day}
              onChangeText={(value) => handleInputChange(value, index, "day")}
            />
            <TextInput
              style={styles.cell}
              value={availability.attributes.area.data.attributes.Location}
              onChangeText={(value) => handleInputChange(value, index, "area")}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  table: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Schedule;
