import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function SearchResult({ result }) {
  return (
    <TouchableOpacity onPress={(e) => alert(`You selected ${result}!`)}>
      <Text>{result}</Text>
    </TouchableOpacity>
  );
}
