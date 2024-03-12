import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from "react-native";
import axios from "axios";
import { format, addDays, addMonths } from "date-fns";
import Colors from "../../../Shared/Colors";
const DoctorHospitalAppointments = ({ route }) => {
  const { doctorId, token } = route.params;

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchDoctorIdAndAppointments();
  }, [doctorId, token]);

  const fetchDoctorIdAndAppointments = async () => {
    try {
      const userResponse = await axios.get(
        `http://192.168.1.104:1337/api/users/${doctorId}?populate[doctor][populate]=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const maindoctorId = userResponse.data.doctor.id;

      const appointmentsResponse = await axios.get(
        `http://192.168.1.104:1337/api/hospital-appointments?filters[doctor][id][$eq]=${maindoctorId}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(appointmentsResponse.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Function to calculate the date range for the past 7 days
  const getPastWeekRange = () => {
    const today = new Date();
    const pastWeek = addDays(today, -6);
    return { start: pastWeek, end: today };
  };

  // Function to calculate the date range for the current month
  const getCurrentMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = addMonths(startOfMonth, 1);
    return { start: startOfMonth, end: endOfMonth };
  };

  // Function to filter appointments by date range
  const filterAppointmentsByDateRange = (start, end) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.attributes.createdAt);
      return appointmentDate >= start && appointmentDate <= end;
    });
  };

  // Function to handle weekly report
  const handleWeeklyReport = () => {
    const { start, end } = getPastWeekRange();
    const filteredAppointments = filterAppointmentsByDateRange(start, end);
    const numberOfBookings = filteredAppointments.length;
    const numberOfCanceledBookings = filteredAppointments.filter(
      (appointment) => appointment.attributes.status === "canceled"
    ).length;

    // Show the number of bookings and canceled bookings to the user
    Alert.alert(
      "Weekly Report",
      `Number of bookings in the past 7 days: ${numberOfBookings}\nNumber of canceled bookings: ${numberOfCanceledBookings}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };

  // Function to handle monthly report
  const handleMonthlyReport = () => {
    const { start, end } = getCurrentMonthRange();
    const filteredAppointments = filterAppointmentsByDateRange(start, end);
    const numberOfBookings = filteredAppointments.length;
    const numberOfCanceledBookings = filteredAppointments.filter(
      (appointment) => appointment.attributes.status === "canceled"
    ).length;

    // Show the number of bookings and canceled bookings to the user
    Alert.alert(
      "Monthly Report",
      `Number of bookings in the current month: ${numberOfBookings}\nNumber of canceled bookings: ${numberOfCanceledBookings}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };

  const handleConsulted = () => {
    // Show alert to confirm consultation
    Alert.alert(
      "Consulted",
      "Has the appointment been consulted?",
      [
        { text: "No", onPress: () => updateAppointmentBackground(Colors.red) },
        { text: "Yes", onPress: () => updateAppointmentBackground(Colors.lightgreen) },
      ],
      { cancelable: true }
    );

    setIsModalVisible(false); // Close the modal
  };

  const updateAppointmentBackground = (color) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) => {
        if (appointment === selectedAppointment) {
          return {
            ...appointment,
            backgroundColor: color,
          };
        }
        return appointment;
      })
    );
  };

  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Chamber Appointments</Text>
      <View style={styles.filterContainer}>
        <Button onPress={handleWeeklyReport} title="Weekly Report" />
        <Button onPress={handleMonthlyReport} title="Monthly Report" />
      </View>
      {appointments.map((appointment, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.row, { backgroundColor: appointment.backgroundColor }]}
          onPress={() => handleAppointmentPress(appointment)}
        >
          <View style={styles.appointmentDetails}>
            <Text style={styles.detailLabel}>
              Name: {appointment.attributes.UserName}
            </Text>
            <Text style={styles.detailLabel}>
              Email: {appointment.attributes.Email}
            </Text>
            <Text style={styles.detailLabel}>
              Age: {appointment.attributes.age}
            </Text>
            <Text style={styles.detailLabel}>
              Time: {appointment.attributes.Time}
            </Text>
            <Text style={styles.detailLabel}>
              Status: {appointment.attributes.status}
            </Text>
            <Text style={styles.detailLabel}>
              Address: {appointment.attributes.address}
            </Text>
            <Text style={styles.detailLabel}>
              Note: {appointment.attributes.note}
            </Text>

            <Text style={styles.detailLabel}>
              Chamber: {appointment.attributes.hospital.data.attributes.Name}
            </Text>
            <Text style={styles.detailLabel}>
              Booking Time: {appointment.attributes.createdAt}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>User Details:</Text>
            <Text>Name: {selectedAppointment?.attributes.UserName}</Text>
            <Text>Email: {selectedAppointment?.attributes.Email}</Text>
            <Text>Age: {selectedAppointment?.attributes.age}</Text>
            <Text>Time: {selectedAppointment?.attributes.Time}</Text>
            <Text>Status: {selectedAppointment?.attributes.status}</Text>
            <Text>
              Chamber:{" "}
              {selectedAppointment?.attributes.hospital.data.attributes.Name}
            </Text>
            <Text>
              Booking Time: {selectedAppointment?.attributes.createdAt}
            </Text>
            <Text>Address: {selectedAppointment?.attributes.address}</Text>

            <Text>Note: {selectedAppointment?.attributes.note}</Text>

            {/* Add other details here */}

            <TouchableOpacity
              style={styles.consultedButton}
              onPress={handleConsulted}
            >
              <Text style={styles.buttonText}>Consulted</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontFamily: "appfontsemibold",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  appointmentDetails: {
    marginBottom: 10,
  },
  detailLabel: {
    fontFamily: "appfontsemibold",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  consultedButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});

export default DoctorHospitalAppointments;
