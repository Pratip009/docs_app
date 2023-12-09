import { View, Text, Image,TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../Shared/Colors";
import { ScrollView } from "react-native-gesture-handler";
import PageHeader from "../Components/Shared/PageHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import DoctorInfo from "../Components/DoctorDetails/DoctorInfo";


export default function DoctorDetails() {
  const [doctor, setDoctor] = useState();
  const param = useRoute().params;
  const navigation = useNavigation();
  useEffect(() => {
    setDoctor(param.doctor);
  }, []);
  return (
    doctor && (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView>
          <View style={{ position: "absolute", zIndex: 10, margin: 15 }}>
            <PageHeader title={""} />
          </View>
          <View>
            <Image
              source={{ uri: doctor.attributes.Image.data.attributes.url }}
              style={{
                width: "100%",
                height: 400,
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
              <DoctorInfo doctor={doctor} />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("book-appointment", {
              doctor: doctor,
            })
          }
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
