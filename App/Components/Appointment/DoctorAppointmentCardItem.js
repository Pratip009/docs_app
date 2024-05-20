import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import moment from "moment";
import HorizontalLine from "../Shared/HorizontalLine";
import { Ionicons } from "@expo/vector-icons";

export default function DoctorAppointmentCardItem({ appointment, onRemove }) {
  const handleCancelAppointment = () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",

          style: "cancel",
        },
        { text: "Yes", onPress: () => cancelAppointment() },
      ]
    );
  };

  const cancelAppointment = async () => {
    const appointmentId = appointment.id;
    const url = `https://doc-back-new.onrender.com/api/doctors-appointments/${appointmentId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            status: "canceled",
          },
        }),
      });

      if (!response.ok)
        throw new Error("Failed to update the appointment status");

      alert("Appointment canceled successfully!");
      onRemove(appointmentId);
    } catch (error) {
      alert(
        "An error occurred while updating the appointment status. Please try again."
      );
    }
  };
  const isCanceled = appointment?.attributes?.status === "canceled";
  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginTop: 15,
      }}
    >
      {isCanceled && (
        <View
          style={{
            backgroundColor: "white",
            padding: 5,
            borderRadius: 5,
            alignItems: "center",
            marginBottom: 10,
            borderWidth: 3,
            borderColor: "red",
            width: "50%",
          }}
        >
          <Text
            style={{
              color: "red",
              fontFamily: "appfontsemibold",
              fontSize: 14,
            }}
          >
            Canceled
          </Text>
        </View>
      )}

      <Text
        style={{
          fontSize: 16,
          marginTop: 10,
          fontFamily: "appfontsemibold",
        }}
      >
        {moment(appointment?.attributes?.Date).format("MMM Do, YYYY")} -{" "}
        {appointment?.attributes?.Time}
      </Text>
      <HorizontalLine />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?size=626&ext=jpg",
          }}
          style={{ height: 100, borderRadius: 10, width: 90 }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "appfontsemibold",
            }}
          >
            {appointment.attributes.hospital.data.attributes.Name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Ionicons name="medkit" size={20} color={Colors.PRIMARY} />
            <Text
              style={{ fontFamily: "appfont", color: "black", fontSize: 16 }}
            >
              {appointment.attributes.doctor.data.attributes.Name}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Ionicons name="location" size={20} color={Colors.PRIMARY} />
            <Text style={{ fontFamily: "appfont", color: "black" }}>
              {appointment.attributes.area}
            </Text>
            <Ionicons
              name="newspaper-outline"
              size={20}
              color={Colors.PRIMARY}
            />
            <Text style={{ fontFamily: "appfont", color: "black" }}>
              {appointment.attributes.day}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Ionicons name="document-text" size={20} color={Colors.PRIMARY} />
            <Text style={{ fontFamily: "appfont", color: Colors.grey }}>
              Booking Id: #{appointment.id}
            </Text>
          </View>
        </View>
      </View>
      {!isCanceled && (
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            onPress={handleCancelAppointment}
            style={{
              backgroundColor: Colors.red,
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: "appfontsemibold",
                fontSize: 15,
              }}
            >
              Cancel Appointment
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
