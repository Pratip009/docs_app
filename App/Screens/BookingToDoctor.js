import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native"; // Import useRoute to access the passed parameters
import Colors from "../Shared/Colors";
import { ScrollView } from "react-native-gesture-handler";
import PageHeader from "../Components/Shared/PageHeader";
import HospitalBookingDoctorInfo from "../Components/DoctorDetails/HospitalBookingDoctorInfo";
import { useEffect } from "react";
import HorizontalLine from "../Components/Shared/HorizontalLine";
import SubHeading from "../Components/Home/SubHeading";
import { useState } from "react";
import moment from "moment";
import { useUser } from "@clerk/clerk-expo";
import { FlatList } from "react-native";
import GlobalApi from "../Services/GlobalApi";

export default function BookingToDoctor() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [next7Days, setNext7Days] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [notes, setNotes] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [age, setAge] = useState();

  useEffect(() => {
    getDays();

    getTime();
    if (isSignedIn && user?.fullName) {
      setName(user.fullName);
    }
  }, []);

  const getDays = () => {
    const today = moment();
    const nextSevenDays = [];
    for (let i = 1; i < 8; i++) {
      const date = moment().add(i, "days");
      nextSevenDays.push({
        date: date,
        day: date.format("ddd"), //Tue, Mon
        formmatedDate: date.format("Do MMM"), //4th Oct
      });
    }

    setNext7Days(nextSevenDays);
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeList(timeList);
  };

  const bookHospitalAppointment = () => {
    setLoader(true);
    const data = {
      data: {
        UserName: user.fullName,
        Date: selectedDate,
        Time: selectedTime,
        Email: user.primaryEmailAddress.emailAddress,
        doctor: doctor?.id,
        hospital: hospital?.id,
        name: name,
        address: address,
        age: age,
        note: notes,
      },
    };

    GlobalApi.createHospitalAppointment(data).then(
      (resp) => {
      
        setLoader(false); // Hide loader
        ToastAndroid.show(
          "Appointment Booked Successfully!",
          ToastAndroid.LONG
        );
      },
      (error) => {
        // More explicit error handling
        Alert("Error booking appointment:", error);
        setLoader(false); // Hide loader

        // Displaying the error message to the user might help in diagnosing
        ToastAndroid.show(
          `Error booking appointment: ${error.message || "Unknown error"}`,
          ToastAndroid.LONG
        );
      }
    );
  };

  const route = useRoute();
  const { doctor, hospital } = route.params;
  useEffect(() => {
    
  }, [hospital, doctor]);
  return (
    doctor && (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView>
          <View style={{ position: "absolute", zIndex: 10, margin: 15 }}>
            <PageHeader title={""} />
          </View>
          <View>
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg",
              }}
              style={{
                width: "100%",
                height: 300,
              }}
            />

            <View
              style={{
                marginTop: -20,
                backgroundColor: Colors.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              }}
            >
              <HospitalBookingDoctorInfo doctor={doctor} />
              <HorizontalLine />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "appfontsemibold",
                  color: Colors.deepgrey,
                }}
              >
                Book Appointment (Fill up the form below)
              </Text>
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <SubHeading subHeadingTitle={"Day"} seelAll={false} />
                <FlatList
                  data={next7Days}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.dayButton,
                        selectedDate == item.date
                          ? { backgroundColor: Colors.PRIMARY }
                          : null,
                      ]}
                      onPress={() => setSelectedDate(item.date)}
                    >
                      <Text
                        style={[
                          {
                            fontFamily: "appfont",
                          },
                          selectedDate == item.date
                            ? { color: Colors.white }
                            : null,
                        ]}
                      >
                        {item.day}
                      </Text>
                      <Text
                        style={[
                          {
                            fontFamily: "appfontsemibold",
                            fontSize: 16,
                          },
                          selectedDate == item.date
                            ? { color: Colors.white }
                            : null,
                        ]}
                      >
                        {item.formmatedDate}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <SubHeading subHeadingTitle={"Time"} seelAll={false} />
                <FlatList
                  data={timeList}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.dayButton,
                        {
                          paddingVertical: 16,
                        },
                        selectedTime == item.time
                          ? { backgroundColor: Colors.PRIMARY }
                          : null,
                      ]}
                      onPress={() => setSelectedTime(item.time)}
                    >
                      <Text
                        style={[
                          {
                            fontFamily: "appfontsemibold",
                            fontSize: 16,
                          },
                          selectedTime == item.time
                            ? { color: Colors.white }
                            : null,
                        ]}
                      >
                        {item.time}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <SubHeading subHeadingTitle={"Name"} seelAll={false} />
                <TextInput
                  numberOfLines={1}
                  onChangeText={(value) => setName(value)}
                  style={{
                    backgroundColor: Colors.grey,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: Colors.SECONDARY,
                    borderWidth: 1,
                    textAlignVertical: "top",
                  }}
                  placeholder="Write Your Name Here"
                  value={name}
                />
                <SubHeading subHeadingTitle={"Age"} seelAll={false} />
                <TextInput
                  numberOfLines={1}
                  onChangeText={(value) => setAge(value)}
                  style={{
                    backgroundColor: Colors.grey,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: Colors.SECONDARY,
                    borderWidth: 1,
                    textAlignVertical: "top",
                  }}
                  placeholder="Write Your Age Here"
                />
                <SubHeading subHeadingTitle={"Address"} seelAll={false} />
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
                <SubHeading subHeadingTitle={"Note"} seelAll={false} />

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
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => bookHospitalAppointment()}
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
      </View>
    )
  );
}
const styles = StyleSheet.create({
  dayButton: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 5,

    paddingHorizontal: 20,
    alignItems: "center",
    marginRight: 10,
    borderColor: Colors.grey,
  },
});
