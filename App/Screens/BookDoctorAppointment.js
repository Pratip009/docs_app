import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import ActionButton from "../Components/HospitalDetail/ActionButton";
import HorizontalLine from "../Components/Shared/HorizontalLine";
import AppointmentDoctorInfo from "../Components/BookAppointment/AppointmentDoctorInfo";
import BookingDoctorSection from "../Components/BookAppointment/BookingDoctorSection";
import { ScrollView } from "react-native";

export default function BookDoctorAppointment() {
  
  const param = useRoute().params;
  return (
    <ScrollView style={{ padding: 20 }}>
      <AppointmentDoctorInfo doctor={param.doctor} />
      <ActionButton />
      <HorizontalLine />
      <BookingDoctorSection doctor={param.doctor} />
    </ScrollView>
  );
}
