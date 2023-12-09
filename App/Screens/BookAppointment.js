import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import AppointmentHospitalInfo from "../Components/BookAppointment/AppointmentHospitalInfo";
import ActionButton from "../Components/HospitalDetail/ActionButton";
import HorizontalLine from "../Components/Shared/HorizontalLine";
import BookingSection from "../Components/BookAppointment/BookingSection";
import { ScrollView } from "react-native";

export default function BookAppointment() {
  const param = useRoute().params;
  return (
    <ScrollView style={{ padding: 20 }}>
      <AppointmentHospitalInfo hospital={param.hospital} />
      <ActionButton/>
      <HorizontalLine/>
      <BookingSection hospital={param.hospital}/>
    </ScrollView>
  );
}
