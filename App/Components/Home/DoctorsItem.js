import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../../App/Shared/Colors";

export default function DoctorItem({ hospital }) {
  return (
    <View
      style={{
        width: 200,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 10,
        marginRight: 10,
      }}
    >
      <Image
        source={{ uri: hospital.imageUrl }}
        style={{
          width: "100%",
          height: 110,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View style={{ padding: 7 }}>
        <Text style={{ fontFamily: "appfontsemibold", fontSize: 16 }}>
          {hospital.Name}
        </Text>
        <Text style={{ color: Colors.deepgrey }}>{hospital.specialist}</Text>
        <Text style={{ color: Colors.deepgrey }}>{hospital.experience}</Text>
      </View>
    </View>
  );
}
