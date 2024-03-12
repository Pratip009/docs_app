import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../Services/GlobalApi";
import AppointmentCardItem from "../Components/Appointment/AppointmentCardItem";
import PageHeader from "../Components/Shared/PageHeader";
import Colors from "../Shared/Colors";
import appimage from "../../assets/Images/warn.png";

export default function Appointment() {
  const navigation = useNavigation();
  const { isSignedIn, user } = useUser();
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    if (isSignedIn && user) {
      getUserAppointments();
    } else {
      navigation.navigate("signin");
    }
  }, [isSignedIn, user, navigation]);

  const getUserAppointments = async () => {
    try {
      const userId = user.id;
      const userEmail = user.primaryEmailAddress.emailAddress;
      const response = await GlobalApi.getUserAppointments(userId);
      const filteredAppointments = response.data.data.filter(
        (appointment) => appointment.attributes.Email === userEmail
      );
      setAppointmentList(filteredAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments for user:", user, error);
    }
  };

  const handleRemoveAppointment = (appointmentId) => {
    setAppointmentList(
      appointmentList.filter((appointment) => appointment.id !== appointmentId)
    );
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
      <PageHeader title={"My Appointments"} backButton={false} />
      {appointmentList.length === 0 ? (
        <View style={styles.emptyListView}>
          <Image source={appimage} style={styles.emptyListImage} />
          <Text style={styles.noAppointmentText}>No appointments booked.</Text>
        </View>
      ) : (
        <FlatList
          data={appointmentList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AppointmentCardItem
              appointment={item}
              onRemove={() => handleRemoveAppointment(item.id)}
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
    backgroundColor: Colors.WHITE,
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
