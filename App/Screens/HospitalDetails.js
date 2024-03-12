import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo"; // Assuming you're using Clerk for authentication
import PageHeader from "../Components/Shared/PageHeader";
import HospitalInfo from "../Components/HospitalDetail/HospitalInfo";
import Colors from "../../App/Shared/Colors";
import DoctorInfo from "../Components/DoctorDetails/DoctorInfo";

export default function HospitalDetails() {
  const [hospital, setHospital] = useState();
  const [doctor, setDoctor] = useState();
  const param = useRoute().params;
  const navigation = useNavigation();
  const { isSignedIn } = useUser(); // Use the useUser hook to check if the user is signed in

  useEffect(() => {
    setHospital(param.hospital);
    setDoctor(param.doctor);
  }, [param.hospital, param.doctor]);

  const handleViewDoctors = () => {
    if (isSignedIn) {
      // User is signed in, navigate to the book-appointment screen
      navigation.navigate("book-appointment", {
        hospital: hospital,
        doctor: doctor,
      });
    } else {
      // User is not signed in, navigate to the sign-in screen
      navigation.navigate("signin"); // Replace "SignIn" with the actual route name of your sign-in screen
    }
  };

  return (
    hospital && (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView>
          <View style={{ position: "absolute", zIndex: 10, margin: 15 }}>
            <PageHeader title={""} />
          </View>
          <View>
            <Image
              source={{ uri: hospital.attributes.Image.data.attributes.url }}
              style={{
                width: "100%",
                height: 260,
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
              <HospitalInfo hospital={hospital} />
              <DoctorInfo doctor={doctor} />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleViewDoctors}
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
            View Doctors
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
}
