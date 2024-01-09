import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../../App/Shared/Colors";

export default function HospitalItem({ hospital }) {
  return (
    <View
      style={{
        width: 200,
        borderWidth: 0.8,
        borderColor: Colors.grey,
        borderRadius: 10,
        marginRight: 10,
      }}
    >
      <Image
        source={{ uri: hospital.attributes.Image.data.attributes.url }}
        style={{
          width: "100%",
          height: 110,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View style={{ padding: 7 }}>
        <Text style={{ fontFamily: "appfontsemibold", fontSize: 16 }}>
          {hospital.attributes.Name}
        </Text>
        <Text style={{ color: Colors.deepgrey, fontSize: 11 }}>
          {hospital.attributes.Address}
        </Text>
      </View>
    </View>
  );
}
