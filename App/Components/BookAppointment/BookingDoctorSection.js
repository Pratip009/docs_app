

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import Colors from "../../Shared/Colors";
import moment from "moment";
import SubHeading from "../Home/SubHeading";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Services/GlobalApi";

const API_URL = `http://192.168.1.104:1337/api/doctors/`;

export default function BookingDoctorSection({ doctor }) {
  const { isLoaded, isSignedIn, user } = useUser();

  const [doctorDetails, setDoctorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [notes, setNotes] = useState();
  const [address, setAddress] = useState();
  const [loader, setLoader] = useState(false);

  const doctorId = doctor.id;

  useEffect(() => {
    console.log("Doctor's name:", doctor.attributes.Name);

    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}${doctorId}?populate[availabilities][populate][hospital]=*&populate[availabilities][populate][day]=*&populate[availabilities][populate][area]=*`
        );
        const availabilities =
          response?.data?.data?.attributes?.availabilities?.data ?? [];
        setDoctorDetails(availabilities);
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
        ToastAndroid.show("Failed to fetch data", ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const generateTimeSlots = (startTime, endTime) => {
    let start = moment(startTime, "HH:mm");
    let end = moment(endTime, "HH:mm");
    let slots = [];

    while (start < end) {
      slots.push(start.format("HH:mm"));
      start.add(15, "minutes");
    }

    return slots;
  };

  const uniqueAreas = [
    ...new Set(
      doctorDetails.map(
        (item) => item.attributes.area?.data?.attributes?.Location
      )
    ),
  ].filter(Boolean);

  const filterHospitalsByArea = (area) => {
    return doctorDetails.filter(
      (item) => item.attributes.area?.data?.attributes?.Location === area
    );
  };

  const filterDaysByHospital = (hospitalId) => {
    return doctorDetails.filter(
      (item) => item.attributes.hospital?.data?.id === hospitalId
    );
  };

  const filterTimesByDay = (day) => {
    return doctorDetails.filter(
      (item) => item.attributes.day?.data?.attributes?.Day === day
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  const bookDoctorAppointment = () => {
    console.log("Booking for Area:", selectedArea);
    console.log("Booking for day:", selectedDay);
    console.log("Booking for hospital:", selectedHospital);
    setLoader(true);
    const data = {
      data: {
        UserName: user.fullName,
        Email: user.primaryEmailAddress.emailAddress,
        doctor: doctorId,
        note: notes,
        day: selectedDay,
        area: selectedArea,
        hospital: selectedHospital,
        Time: selectedTimeSlot,
        address: address,
      },
    };
    console.log(data);

    GlobalApi.createDoctorAppointment(data).then(
      (resp) => {
        console.log(resp);
        if (resp.status >= 200 && resp.status < 300) {
          // Check if status code indicates success
          setLoader(false);
          ToastAndroid.show(
            "Appointment Booked Successfully!",
            ToastAndroid.LONG
          );
        } else {
          // Handle non-successful status codes
          setLoader(false);
          ToastAndroid.show(
            "Failed to book appointment. Please try again.",
            ToastAndroid.LONG
          );
        }
      },
      (error) => {
        console.error("Error booking appointment:", error);
        setLoader(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          ToastAndroid.show("Error: " + JSON.stringify(error.response.data), ToastAndroid.LONG);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    );
  };
  return (
    <ScrollView style={styles.container}>
      <SubHeading subHeadingTitle={"Areas"} />
      <FlatList
        horizontal
        data={uniqueAreas}
        keyExtractor={(item, index) => `area-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.Button,
              {
                backgroundColor:
                  item === selectedArea ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => setSelectedArea(item)}
          >
            <Text
              style={[
                styles.slotText,
                {
                  color: item === selectedArea ? "white" : "black",
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      <SubHeading subHeadingTitle={"Chembers"} />

      {selectedArea && (
        <FlatList
          data={filterHospitalsByArea(selectedArea)}
          keyExtractor={(item) =>
            `hospital-${item.attributes.hospital.data.id}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.Button,
                {
                  backgroundColor:
                    item.attributes.hospital.data.id === selectedHospital
                      ? Colors.PRIMARY // Color when selected
                      : "white", // Default color
                },
              ]}
              onPress={() =>
                setSelectedHospital(item.attributes.hospital.data.id)
              }
            >
              <Text
                style={[
                  styles.slotText,
                  {
                    color:
                      item.attributes.hospital.data.id === selectedHospital
                        ? "white"
                        : "black",
                  },
                ]}
              >
                {item.attributes.hospital.data.attributes.Name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <SubHeading subHeadingTitle={"Available Day"} />

      {selectedHospital && (
        <FlatList
          data={filterDaysByHospital(selectedHospital)}
          keyExtractor={(item) => `day-${item.attributes.day.data.id}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.Button,
                {
                  backgroundColor:
                    item.attributes.day.data.attributes.Day === selectedDay
                      ? Colors.PRIMARY // Color when selected
                      : "white", // Default color
                },
              ]}
              onPress={() =>
                setSelectedDay(item.attributes.day.data.attributes.Day)
              }
            >
              <Text
                style={[
                  styles.slotText,
                  {
                    color:
                      item.attributes.day.data.attributes.Day === selectedDay
                        ? "white"
                        : "black",
                  },
                ]}
              >
                {item.attributes.day.data.attributes.Day}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <SubHeading subHeadingTitle={"Time Slots"} />

      {selectedDay && (
        <FlatList
          data={filterTimesByDay(selectedDay)}
          keyExtractor={(item) => `time-${item.id}`}
          renderItem={({ item }) => {
            const timeSlots = generateTimeSlots(
              item.attributes.StartTime,
              item.attributes.EndTime
            );
            return (
              <View style={styles.item}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={timeSlots}
                  keyExtractor={(slot, index) => `slot-${index}`}
                  renderItem={({ item: slot }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedTimeSlot(slot)}
                      style={[
                        styles.slot,
                        {
                          backgroundColor:
                            slot === selectedTimeSlot
                              ? Colors.PRIMARY // Change the color when selected
                              : "white", // Default color
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          {
                            color:
                              slot === selectedTimeSlot
                                ? "white" // Change the color when selected
                                : "black", // Default color
                          },
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            );
          }}
        />
      )}
      <SubHeading subHeadingTitle={"Address"} />
      <TextInput
        numberOfLines={2}
        onChangeText={(value) => setAddress(value)}
        style={{
          backgroundColor: Colors.grey,
          padding: 10,
          borderRadius: 10,
          borderColor: Colors.SECONDARY,
          borderWidth: 1,
          textAlignVertical: "top",
        }}
        placeholder="Write Your Address Here"
      />

      <SubHeading subHeadingTitle={"Note"} />
      <TextInput
        numberOfLines={3}
        onChangeText={(value) => setNotes(value)}
        style={{
          backgroundColor: Colors.grey,
          padding: 10,
          borderRadius: 10,
          borderColor: Colors.SECONDARY,
          borderWidth: 1,
          textAlignVertical: "top",
        }}
        placeholder="Write Notes Here"
      />
      <TouchableOpacity
        onPress={() => bookDoctorAppointment()}
        disabled={loader}
        style={{
          padding: 13,
          backgroundColor: Colors.PRIMARY,
          margin: 10,
          borderRadius: 99,
          left: 0,
          right: 0,
          marginBottom: 10,
          zIndex: 20,
        }}
      >
        {!loader ? (
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "appfontsemibold",
              fontSize: 17,
            }}
          >
            Make Appointment
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  Button: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 99,

    alignSelf: "flex-start",
  },
  text: {
    color: "#fff",
  },
  item: {
    padding: 10,
    marginVertical: 8,
  },
  slot: {
    marginHorizontal: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 99,
    borderWidth: 1,
  },
  slotText: {
    color: "black",
    fontFamily: "appfontsemibold", // Adjusted for visibility
  },
});
