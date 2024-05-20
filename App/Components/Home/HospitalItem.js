import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../App/Shared/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const HospitalItem = ({ hospital }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Image
        source={{ uri: hospital.attributes.Image.data.attributes.url }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{hospital.attributes.Name}</Text>
        <Text style={styles.address}>{hospital.attributes.Address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 10,
    backgroundColor: "#fff", // Background color for the item
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Android elevation for shadow
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    objectFit:'cover',

  },
  content: {
    padding: 10,
  },
  name: {
    fontFamily: "appfontsemibold",
    fontSize: 16,
    marginBottom: 5,
  },
  speciality: {
    color: Colors.deepgrey,
    fontSize: 12,
  },
  address: {
    color: Colors.deepgrey,
    fontSize: 12,
  },
});

export default HospitalItem;
