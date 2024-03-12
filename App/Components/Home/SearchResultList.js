import { View, Text } from "react-native";
import React from "react";
import SearchResult from "./SearchResult";
import Colors from "../../Shared/Colors";

export default function SearchResultList({ results }) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: Colors.white,
        display: "flex",
        flexDirection: "column",
        borderRadius:10,
        marginTop:10,
        maxHeight:200,
        overflow:'scroll'
      }}
    >
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </View>
  );
}
