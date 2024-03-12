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
import { format } from "date-fns";
import Colors from "../../../Shared/Colors";

const DoctorAppointments = ({ route }) => {
  const { doctorId, token } = route.params;

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        `http://192.168.1.104:1337/api/doctors-appointments?filters[doctor][id][$eq]=${maindoctorId}&populate=*`,
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

  useEffect(() => {
    fetchDoctorIdAndAppointments();
  }, [doctorId, token]);

  // Function to calculate the date range for the past 7 days
  const getPastWeekRange = () => {
    const today = new Date();
    const pastWeek = new Date(today);
    pastWeek.setDate(today.getDate() - 6); // Subtract 6 to get the past 7 days
    return { start: pastWeek, end: today };
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
    const bookingDetails = filteredAppointments.map((appointment) => ({
      name: appointment.attributes.UserName,
      email: appointment.attributes.Email,
      bookingDate: format(
        new Date(appointment.attributes.createdAt),
        "MM/dd/yyyy"
      ),
    }));

    // Format start and end dates
    const startDateString = format(start, "MM/dd/yyyy");
    const endDateString = format(end, "MM/dd/yyyy");

    // Show the number of bookings and details to the user
    Alert.alert(
      "Weekly Report",
      `Number of bookings in the past 7 days: ${numberOfBookings}\n\nBooking details:\n\n${bookingDetails
        .map(
          (detail) => `${detail.name} (${detail.email}) - ${detail.bookingDate}`
        )
        .join("\n")}\n\nReport from: ${startDateString} to ${endDateString}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };
  const getCurrentMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { start: startOfMonth, end: endOfMonth };
  };

  // Function to filter appointments by date range
  const filterAppointmentsMonthByDateRange = (start, end) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.attributes.createdAt);
      return appointmentDate >= start && appointmentDate <= end;
    });
  };

  // Function to handle monthly report
  // Function to handle monthly report
  const handleMonthlyReport = () => {
    const { start, end } = getCurrentMonthRange();
    const filteredAppointments = filterAppointmentsMonthByDateRange(start, end);
    const numberOfBookings = filteredAppointments.length;
    const bookingDetails = filteredAppointments.map((appointment) => ({
      name: appointment.attributes.UserName,
      email: appointment.attributes.Email,
      bookingDate: format(
        new Date(appointment.attributes.createdAt),
        "MM/dd/yyyy"
      ),
    }));

    // Format start and end dates
    const startDateString = format(start, "MM/dd/yyyy");
    const endDateString = format(end, "MM/dd/yyyy");

    // Show the number of bookings and details to the user
    Alert.alert(
      "Monthly Report",
      `Number of bookings in the current month: ${numberOfBookings}\n\nBooking details:\n\n${bookingDetails
        .map(
          (detail) => `${detail.name} (${detail.email}) - ${detail.bookingDate}`
        )
        .join("\n")}\n\nDate Range: ${startDateString} to ${endDateString}`,
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
      <View style={styles.table}>
        <Text style={styles.header}>Doctor's Appointments</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Name</Text>
          <Text style={styles.tableHeaderCell}>Email</Text>
          <Text style={styles.tableHeaderCell}>Day</Text>
          <Text style={styles.tableHeaderCell}>Time</Text>
          <Text style={styles.tableHeaderCell}>Area</Text>
          <Text style={styles.tableHeaderCell}>Chember</Text>
          <Text style={styles.tableHeaderCell}>Booking Time</Text>
        </View>
        {appointments.map((appointment, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.row,
              { backgroundColor: appointment.backgroundColor },
            ]}
            onPress={() => handleAppointmentPress(appointment)}
          >
            <Text style={styles.cell}>{appointment.attributes.UserName}</Text>
            <Text style={styles.cell}>{appointment.attributes.Email}</Text>
            <Text style={styles.cell}>{appointment.attributes.day}</Text>
            <Text style={styles.cell}>{appointment.attributes.Time}</Text>
            <Text style={styles.cell}>{appointment.attributes.area}</Text>
            <Text style={styles.cell}>
              {appointment.attributes.hospital.data.attributes.Name}
            </Text>
            <Text style={styles.cell}>{appointment.attributes.createdAt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>User Details:</Text>
            <Text>Name: {selectedAppointment?.attributes.UserName}</Text>
            <Text>Email: {selectedAppointment?.attributes.Email}</Text>
            <Text>Day: {selectedAppointment?.attributes.day}</Text>
            <Text>Time: {selectedAppointment?.attributes.Time}</Text>
            <Text>Area: {selectedAppointment?.attributes.area}</Text>
            <Text>
              Chember:{" "}
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
      <View style={styles.filterContainer}>
        <Button onPress={handleWeeklyReport} title="Weekly Booking Stats" />
        <Button onPress={handleMonthlyReport} title="Monthly Booking Stats" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontFamily: "appfontsemibold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tableHeaderCell: {
    flex: 1,
    fontFamily: "appfontsemibold",
    padding: 10,
    textAlign: "center",
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
    fontFamily: "appfont",
    fontSize: 12,
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

export default DoctorAppointments;
