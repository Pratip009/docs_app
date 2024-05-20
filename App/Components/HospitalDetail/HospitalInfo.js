import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "./ActionButton";
import SubHeading from "../Home/SubHeading";

export default function HospitalInfo({ hospital }) {
  const openEmail = () => {
    if (hospital && hospital.attributes && hospital.attributes.Email) {
      const email = hospital.attributes.Email.toString();

      const url = `mailto:${email}`;

      Linking.openURL(url)
        .then(() => console.log("Email client opened successfully"))
        .catch((error) => console.error("Failed to open email client:", error));
    } else {
      Alert("Email address not available.");
    }
  };
  const openPhoneCall = () => {
    if (hospital && hospital.attributes && hospital.attributes.Phone) {
      const phoneNumber = hospital.attributes.Phone.toString();

      const url = `tel:${phoneNumber}`;

      Linking.openURL(url)
        .then(() => console.log("Phone call initiated successfully"))
        .catch((error) =>
          console.error("Failed to initiate phone call:", error)
        );
    } else {
      Alert("Phone number not available.");
    }
  };
  const openGoogleMaps = () => {
    if (hospital && hospital.attributes && hospital.attributes.GoogleMapsURL) {
      const url = hospital.attributes.GoogleMapsURL;

      Linking.openURL(url)
        .then(() => console.log("Google Maps opened successfully"))
        .catch((error) => console.error("Failed to open Google Maps:", error));
    } else {
      Alert("Google Maps URL not available in the API response.");
    }
  };

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

        {/* <ActionButton /> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={openEmail}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: Colors.SECONDARY,
                padding: 13,
                borderRadius: 10,
                alignItems: "center",
                width: 120,
                marginTop: 15,
              }}
            >
              <Ionicons name="mail" size={25} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontFamily: "appfontsemibold",

                  marginLeft: 10,
                }}
              >
                Email
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openPhoneCall}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: Colors.SECONDARY,
                padding: 13,
                borderRadius: 10,
                alignItems: "center",
                width: 120,
                marginTop: 15,
              }}
            >
              <Ionicons name="call" size={25} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontFamily: "appfontsemibold",

                  marginLeft: 10,
                }}
              >
                Phone
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGoogleMaps}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: Colors.SECONDARY,
                padding: 13,
                borderRadius: 10,
                alignItems: "center",
                width: 120,
                marginTop: 15,
              }}
            >
              <Ionicons name="earth" size={25} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontFamily: "appfontsemibold",

                  marginLeft: 10,
                }}
              >
                Map
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
