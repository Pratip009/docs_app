import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../App/Shared/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo

const DoctorItem = ({ doctor }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Image
        source={{ uri: doctor.attributes.Image.data.attributes.url }}
        style={styles.image}
        resizeMode="cover"
      />
      {/* Verified icon */}
      <View style={styles.verifiedIcon}>
        <Ionicons name="checkmark-circle" size={24} color={Colors.PRIMARY} />
      </View>
      {/* End of verified icon */}
      <View style={styles.content}>
        <Text style={styles.name}>{doctor.attributes.Name}</Text>
        <Text style={styles.speciality}>{doctor.attributes.Speciality}</Text>
        <Text style={styles.text}>
          Experience:{" "}
          <Text style={styles.experience}>
            {doctor.attributes.Year_of_Experience}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 10,
    borderWidth:1,
    borderColor:Colors.grey,
    backgroundColor: "#fff", 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
   
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    objectFit: "cover",
  },
  verifiedIcon: {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1, 
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
    fontFamily: "appfont",
    fontSize: 12,
  },
  experience: {
    color: Colors.red,
    fontSize: 12,
    fontFamily: "appfont",
  },
  text: {
    color: Colors.deepgrey,
    fontSize: 12,
    fontFamily: "appfont",
  },
  address: {
    color: Colors.deepgrey,
    fontSize: 12,
  },
});

export default DoctorItem;
