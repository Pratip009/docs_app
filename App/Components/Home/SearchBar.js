import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";

export default function SearchBar({ setSearchText }) {
  const [searchInput, setSearchInput] = useState();
  return (
    <View style={{ marginTop: 15 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          borderWidth: 0.7,
          borderColor: Colors.grey,
          padding: 8,
          borderRadius: 8,
        }}
      >
        <MaterialIcons name="search" size={24} color={Colors.blue} />
        <TextInput
          placeholder="Search"
          onChangeText={(value) => setSearchInput(value)}
          onSubmitEditing={() => setSearchText(searchInput)}
          style={{}}
        />
      </View>
    </View>
  );
}
