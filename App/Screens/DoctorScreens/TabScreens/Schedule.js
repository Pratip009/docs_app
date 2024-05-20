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
        `https://doc-back-new.onrender.com/api/users/${doctorId}?populate[doctor][populate]=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const mainDoctorId = userResponse.data.doctor.id;

      const response = await axios.get(
        `https://doc-back-new.onrender.com/api/availabilities?filters[doctor][id][$eq]=${mainDoctorId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAvailabilities(response.data.data);
      setUpdatedAvailabilities(response.data.data);
    } catch (error) {}
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
            StartTime: attributes.StartTime,
            EndTime: attributes.EndTime,
            day: {
              data: {
                attributes: {
                  Day: attributes.day.data.attributes.Day,
                },
              },
            },
          },
        };

        const response = await axios.put(
          `https://doc-back-new.onrender.com/api/availabilities/${id}?populate=*`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log the response from the backend

        return response.data; // Return the response data
      });

      const updatedData = await Promise.all(promises);

      Alert.alert("Success", "Availabilities updated successfully.");
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update availabilities. Please try again later."
      );
    }
  };

  const handleInputChange = (value, index, field) => {
    const newAvailabilities = [...updatedAvailabilities];
    const availability = { ...newAvailabilities[index] };

    if (!availability.attributes) {
      availability.attributes = {};
    }

    // Check if day data exists
    if (!availability.attributes.day || !availability.attributes.day.data) {
      availability.attributes.day = { data: { attributes: {} } }; // Initialize day data
    }

    // Update the value for the specified field
    if (field === "StartTime" || field === "EndTime") {
      availability.attributes[field] = value;
    } else if (field === "day") {
      availability.attributes.day.data.attributes.Day = value; // Update day attribute
    } else {
      // Handle nested data
      const [relation, nestedField] = field.split("."); // Extract relation and nested field
      if (!availability.attributes[relation]) {
        availability.attributes[relation] = { data: { attributes: {} } }; // Initialize relation data if not exist
      }
      availability.attributes[relation].data.attributes[nestedField] = value; // Update nested field attribute
    }

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
