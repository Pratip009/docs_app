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
  Alert,
} from "react-native";
import axios from "axios";
import Colors from "../../Shared/Colors";
import moment from "moment";
import SubHeading from "../Home/SubHeading";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Services/GlobalApi";

const API_URL = `https://doc-back-new.onrender.com/api/doctors/`;

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const doctorId = doctor.id;

  useEffect(() => {
    if (selectedHospital) {
      const detailsForHospital = filterDaysByHospital(selectedHospital);

      const days = detailsForHospital.map(
        (item) => item.attributes.day.data.attributes.Day
      );

      setAvailableDays(days);
    }
  }, [selectedHospital]);

  useEffect(() => {
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
        ToastAndroid.show("Failed to fetch data", ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const generateDatesForNextTwoMonths = (selectedDay) => {
    const dates = [];
    let currentDate = moment().startOf("month");
    const endOfMonth = moment().add(2, "months").endOf("month");

    while (currentDate.isBefore(endOfMonth)) {
      const currentDay = currentDate.format("dddd");
      if (currentDay === selectedDay) {
        dates.push(currentDate.format("YYYY-MM-DD"));
      }
      currentDate.add(1, "day");
    }

    return dates;
  };
  const generateTimeSlots = (startTime, endTime) => {
    let start = moment(startTime, "h:mm A");
    let end = moment(endTime, "h:mm A");
    let slots = [];

    while (start.isBefore(end)) {
      const formattedSlot = start.format("hh:mm A");
      slots.push(formattedSlot);
      start.add(15, "minutes");
    }

    return slots;
  };

  const filterUniqueChambers = (chambers) => {
    const uniqueChambers = [];
    const chamberNames = new Set();

    chambers.forEach((chamber) => {
      if (!chamberNames.has(chamber.attributes.hospital.data.id)) {
        uniqueChambers.push(chamber);
        chamberNames.add(chamber.attributes.hospital.data.id);
      }
    });

    return uniqueChambers;
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

  const filterAvailableDays = () => {
    const availableDays = [];

    for (
      let date = moment(startDate);
      date.isBefore(endDate);
      date.add(1, "day")
    ) {
      const day = date.format("dddd");
      if (
        doctorDetails.some(
          (item) =>
            item.attributes.day?.data?.attributes?.Day === day &&
            item.attributes.area?.data?.attributes?.Location === selectedArea &&
            item.attributes.hospital?.data?.id === selectedHospital
        )
      ) {
        availableDays.push(day);
      }
    }

    return availableDays;
  };

  const bookDoctorAppointment = () => {
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
        date: selectedDate,
      },
    };

    GlobalApi.createDoctorAppointment(data).then(
      (resp) => {
        if (resp.status >= 200 && resp.status < 300) {
          setLoader(false);
          ToastAndroid.show(
            "Appointment Booked Successfully!",
            ToastAndroid.LONG
          );
        } else {
          setLoader(false);
          ToastAndroid.show(
            "Failed to book appointment. Please try again.",
            ToastAndroid.LONG
          );
        }
      },
      (error) => {
        setLoader(false);
        if (error.response) {
          ToastAndroid.show(
            "Error: " + JSON.stringify(error.response.data),
            ToastAndroid.LONG
          );
        } else if (error.request) {
        } else {
          Alert(error);
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
        showsHorizontalScrollIndicator={false}
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
      <SubHeading subHeadingTitle={"Chambers"} />

      {selectedArea && (
        <FlatList
          data={filterUniqueChambers(filterHospitalsByArea(selectedArea))}
          keyExtractor={(item, index) =>
            `hospital-${item.attributes.hospital.data.id}-${index}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.Button,
                {
                  backgroundColor:
                    item.attributes.hospital.data.id === selectedHospital
                      ? Colors.PRIMARY
                      : "white",
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
          keyExtractor={(item, index) =>
            `day-${item.attributes.day.data.id}-${index}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.Button,
                {
                  backgroundColor:
                    item.attributes.day.data.attributes.Day === selectedDay
                      ? Colors.PRIMARY
                      : "white",
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
      <SubHeading subHeadingTitle={"Available Dates"} />

      {selectedDay && (
        <View style={styles.dateContainer}>
          {generateDatesForNextTwoMonths(selectedDay).map((item, index) => (
            <View key={`date-row-${index}`} style={styles.dateRow}>
              {generateDatesForNextTwoMonths(selectedDay)
                .slice(index * 3, index * 3 + 3)
                .map((date, subIndex) => (
                  <TouchableOpacity
                    key={`date-${index}-${subIndex}`}
                    style={[
                      styles.datebutton,
                      {
                        backgroundColor:
                          date === selectedDate ? Colors.PRIMARY : "white",
                      },
                    ]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text
                      style={[
                        styles.slottextdate,
                        {
                          color: date === selectedDate ? "white" : "black",
                        },
                      ]}
                    >
                      {moment(date).format("DD MMM YYYY")}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          ))}
        </View>
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
                              ? Colors.PRIMARY
                              : "white",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          {
                            color:
                              slot === selectedTimeSlot ? "white" : "black",
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
        style={styles.input}
        placeholder="Write Your Address Here"
      />

      <SubHeading subHeadingTitle={"Note"} />
      <TextInput
        numberOfLines={3}
        onChangeText={(value) => setNotes(value)}
        style={styles.input}
        placeholder="Write Notes Here"
      />
      <TouchableOpacity
        onPress={() => bookDoctorAppointment()}
        disabled={loader}
        style={styles.button}
      >
        {!loader ? (
          <Text style={styles.buttonText}>Make Appointment</Text>
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
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  datebutton: {
    margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
    alignSelf: "flex-start",
    width: "31%",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dateRow: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
    textAlignVertical: "top",
    marginVertical: 10,
  },
  button: {
    padding: 13,
    backgroundColor: Colors.PRIMARY,
    margin: 10,
    borderRadius: 99,
    left: 0,
    right: 0,
    marginBottom: 10,
    zIndex: 20,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: "appfontsemibold",
    fontSize: 17,
  },
  item: {
    padding: 10,
    marginVertical: 8,
  },
  slot: {
    marginHorizontal: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  slotText: {
    color: "black",
    fontFamily: "appfontsemibold",
  },
  slottextdate: {
    fontSize: 13,
    fontFamily: "appfontsemibold",
  },
});
