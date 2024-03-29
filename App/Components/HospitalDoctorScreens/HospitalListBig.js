import { View, TouchableOpacity, Text, FlatList } from "react-native";
import React from "react";
import HospitalCardItem from "../../Components/Shared/HospitalCardItem";
import { useNavigation } from "@react-navigation/native";

export default function HospitalListBig({ hospitalList }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 15,marginBottom:140 }}>
      <FlatList
        data={hospitalList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("hospital-detail", {
                hospital: item,
              })
            }
          >
            <HospitalCardItem hospital={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
