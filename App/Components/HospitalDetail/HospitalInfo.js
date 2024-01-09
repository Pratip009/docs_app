import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import SubHeading from "../Home/SubHeading";

export default function HospitalInfo({ hospital }) {
  return (
    hospital && (
      <View>
        <Text style={{ fontSize: 23, fontFamily: "appfontsemibold" }}>
          {hospital.attributes.Name}
        </Text>
        <FlatList
          data={hospital.attributes.categories.data}
          horizontal={true}
          renderItem={({ item }) => (
            <Text
              style={{
                marginRight: 10,
                color: Colors.deepgrey,
                fontFamily: "appfont",
              }}
            >
              {item.attributes.Name},
            </Text>
          )}
        />
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
            {hospital.attributes.Address}
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
          <Ionicons name="time" size={22} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: "appfont",
              fontSize: 16,
              color: Colors.deepgrey,
            }}
          >
            Monday , Sunday | 11am - 2pm
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
          {hospital.attributes.Description}
        </Text>
      </View>
    )
  );
}
