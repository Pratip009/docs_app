import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Shared/Colors";
import PageHeader from "../Components/Shared/PageHeader";
import DoctorInfo from "../Components/DoctorDetails/DoctorInfo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import HorizontalLine from "../Components/Shared/HorizontalLine";
import SubHeading from "../Components/Home/SubHeading";

export default function DoctorDetails() {
  const [doctor, setDoctor] = useState();
  const param = useRoute().params;
  const navigation = useNavigation();
  const { isSignedIn } = useUser();

  useEffect(() => {
    setDoctor(param.doctor);
  }, [param.doctor]);

  const handleBookAppointment = () => {
    if (isSignedIn) {
      navigation.navigate("book-doctor-appointment", {
        doctor: doctor,
      });
    } else {
      navigation.navigate("signin");
    }
  };

  return (
    doctor && (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView>
          <View style={{ position: "absolute", zIndex: 10, margin: 15 }}>
            <PageHeader title={""} />
          </View>
          <Image
            source={{
              uri:
                doctor?.attributes?.Image?.data?.attributes?.url || "default",
            }}
            style={{ width: "100%", height: 400 }}
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
            <DoctorInfo doctor={doctor} />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleBookAppointment}
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
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "appfontsemibold",
              fontSize: 17,
            }}
          >
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
}
