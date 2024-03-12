import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "../HospitalDetail/ActionButton";
import SubHeading from "../Home/SubHeading";

export default function HospitalBookingDoctorInfo({ doctor }) {
  return (
    doctor && (
      <View>
        <Text style={{ fontSize: 23, fontFamily: "appfontsemibold" }}>
          {doctor.attributes?.Name}
        </Text>
        <Text
          style={{
            marginRight: 10,
            color: Colors.deepgrey,
            fontFamily: "appfont",
          }}
        >
          {doctor.attributes?.Speciality}
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.grey,
            margin: 5,
            marginBottom: 10,
          }}
        ></View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Ionicons name="location" size={22} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: "appfont",
              fontSize: 16,
              color: Colors.deepgrey,
            }}
          >
            {doctor.attributes?.Address}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          {/* <Ionicons name="time" size={22} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: "appfont",
              fontSize: 16,
              color: Colors.deepgrey,
            }}
          >
            Monday , Sunday | 11am - 2pm
          </Text> */}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="pricetags" size={22} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: "appfont",
              fontSize: 16,
              color: Colors.deepgrey,
            }}
          >
            {doctor.attributes?.Registration}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="cash" size={22} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: "appfont",
              fontSize: 16,
              color: Colors.deepgrey,
             
            }}
          >Fees: 
            {doctor.attributes?.Fees}
          </Text>
        </View>
        <ActionButton />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: Colors.grey,
            margin: 5,
            marginBottom: 10,
            marginTop: 10,
          }}
        ></View>
        <SubHeading subHeadingTitle={"About"} />
        <Text style={{ fontFamily: "appfontlight" }}>
          {doctor.attributes?.About}
        </Text>
      </View>
    )
  );
}
