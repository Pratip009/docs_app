import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../../App/Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
export default function ActionButtonDoctor() {
  const actionButtonList = [
 
    {
      id: 1,
      name: "Email",
      icon: "chatbubble-ellipses",
    },
   
  
  ];

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={actionButtonList}
        columnWrapperStyle={{
          flex: 1,
          justifyContent:"start",
        }}
        numColumns={5}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                display:'flex',
                flexDirection:'row',
                backgroundColor: Colors.SECONDARY,
                padding: 13,
                borderRadius: 10,
                alignItems: "center",
                width: 120,
              }}
            >
              <Ionicons name={item.icon} size={25} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontFamily: "appfontsemibold",
                  
                  marginLeft:10
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
