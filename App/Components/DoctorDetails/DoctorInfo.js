import { View, Text, Linking, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import SubHeading from "../Home/SubHeading";
import HorizontalLine from "../Shared/HorizontalLine";

export default function DoctorInfo({ doctor }) {
  const openEmail = () => {
    if (doctor && doctor.attributes && doctor.attributes.Email) {
      const email = doctor.attributes.Email.toString();

      const url = `mailto:${email}`;

      Linking.openURL(url)
        .then(() => console.log("Email client opened successfully"))
        .catch((error) => console.error("Failed to open email client:", error));
    } else {
    }
  };

  return (
    doctor && (
      <View>
        <Text style={{ fontSize: 23, fontFamily: "appfontsemibold" }}>
          {doctor.attributes.Name}
        </Text>
        <FlatList
          data={doctor.attributes.categories.data}
          horizontal={true}
          renderItem={({ item }) => (
            <Text
              style={{
                marginRight: 10,
                color: Colors.deepgrey,
                fontFamily: "appfont",
              }}
            >
              {item.attributes.Name}
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
            {doctor.attributes.Address}
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
          <Ionicons name="pricetags" size={22} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: "appfont",
              fontSize: 16,
              color: Colors.deepgrey,
            }}
          >
            Registration: {doctor.attributes.Registration}
          </Text>
        </View>

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

        <HorizontalLine />
        <SubHeading subHeadingTitle={"About"} />
        <Text style={{ fontFamily: "appfontlight" }}>
          {doctor.attributes.About}
        </Text>
        <SubHeading subHeadingTitle={"Doctor's Time Schedule"} />
        <View
          style={{
            borderWidth: 1.5,
            borderColor: "black",
            padding: 5,
          }}
        >
          <Text style={{ fontFamily: "appfont" }}>
            {doctor.attributes.Schedule}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            padding: 5,
          }}
        >
          {/* <Ionicons name="star" size={22} color={Colors.PRIMARY} /> */}

          <Text
            style={{
              fontSize: 16,
              fontFamily: "appfontsemibold",
            }}
          >
            You can see the above list and book the appointment as per your
            requirement on the next screen, the list is changed as per the date
            of doctor's appointment.
          </Text>
        </View>
      </View>
    )
  );
}
