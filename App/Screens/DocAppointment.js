import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import DoctorAppointmentCardItem from "../Components/Appointment/DoctorAppointmentCardItem";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Shared/Colors";
import PageHeader from "../Components/Shared/PageHeader";
import appimage from "../../assets/Images/warn.png";
import GlobalApi from "../Services/GlobalApi";
export default function DocAppointment() {
  const navigation = useNavigation();
  const { isSignedIn, user } = useUser();
  const [doctorAppointmentList, setDoctorAppointmentList] = useState([]);

  useEffect(() => {
    if (isSignedIn && user) {
      getUserDoctorAppointment();
    } else {
      navigation.navigate("signin");
    }
  }, [isSignedIn, user, navigation]);

  const getUserDoctorAppointment = async () => {
    try {
      const userId = user.id;
      const userEmail = user.primaryEmailAddress.emailAddress;
      const response = await GlobalApi.getUserDoctorAppointment(userId);
      const filteredAppointments = response.data.data.filter(
        (appointment) => appointment.attributes.Email === userEmail
      );
      setDoctorAppointmentList(filteredAppointments);
    } catch (error) {
     
    }
  };

  const handleRemoveDoctorAppointment = (appointmentId) => {
    // Remove the appointment from the list
    setDoctorAppointmentList(
      doctorAppointmentList.filter(
        (appointment) => appointment.id !== appointmentId
      )
    );
    getUserDoctorAppointment();
  };
  if (!isSignedIn) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.signInText}>
          Please sign in to view your appointments.
        </Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("signin")} // Change to your custom signin screen name
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <PageHeader title={"Doctor Appointments"} backButton={false} />
      {doctorAppointmentList.length === 0 ? (
        <View style={styles.emptyListView}>
          <Image source={appimage} style={styles.emptyListImage} />
          <Text style={styles.noAppointmentText}>No appointments booked.</Text>
        </View>
      ) : (
        <FlatList
          data={doctorAppointmentList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DoctorAppointmentCardItem
              appointment={item}
              onRemove={() => handleRemoveDoctorAppointment(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  signInText: {
    fontFamily: "appfontsemibold",
    fontSize: 16,
  },
  signInButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
  },
  signInButtonText: {
    color: "white",
    fontFamily: "appfontbold",
    fontSize: 20,
  },
  emptyListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noAppointmentText: {
    fontFamily: "appfontsemibold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
