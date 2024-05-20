import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import Colors from "../../../App/Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
export default function HospitalCardItem({ hospital }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Image
        source={{ uri: hospital.attributes.Image.data.attributes.url }}
        style={{
          width: "100%",
          height: 140,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      {hospital.attributes.Premium ? (
        <View
          style={{
            display: "flex",
            position: "absolute",
            margin: 10,
            flexDirection: "row",
            backgroundColor: Colors.SECONDARY,
            padding: 5,
            borderRadius: 99,
            paddingHorizontal: 10,
            gap: 4,
            alignItems: "center",
          }}
        >
          <Ionicons
            name="checkmark-done-circle-outline"
            size={18}
            color={Colors.PRIMARY}
          />
          <Text style={{ fontFamily: "appfont", color: Colors.PRIMARY }}>
            Premium Hospital
          </Text>
        </View>
      ) : null}
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.white,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "appfontsemibold" }}>
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
          <Ionicons name="location" size={20} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: "appfontlight" }}>
            {hospital.attributes.Address}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Ionicons name="mail" size={20} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: "appfontlight" }}>{hospital.attributes.Email}</Text>
        </View>
      </View>
    </View>
  );
}
