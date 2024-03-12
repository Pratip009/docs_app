import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../../Shared/Colors";
import { useNavigation } from "@react-navigation/native";
import DoctorDetailsItem from "../Shared/DoctorDetailsItem";
import { useRoute } from "@react-navigation/native";
export default function BookingSection({ hospital }) {
  const param = useRoute().params;
const hospitalId = hospital.id
  useEffect(() => {
    console.log("hospital:   ", hospital);
    console.log("Doctors data:", hospital?.attributes?.doctors?.data);
  }, [hospital]);

  const navigation = useNavigation();
  const renderDoctor = ({ item }) => {
    console.log("data", item);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("booking-to-doctor", {
              doctor: item,
              hospital: hospital,
            })
          }
        >
          <DoctorDetailsItem doctor={item} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {hospital?.attributes?.doctors?.data?.length > 0 ? (
        <FlatList
          data={hospital.attributes?.doctors?.data || []}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No doctors found for this hospital</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: "appfontbold",
    marginBottom: 10,
    textAlign: "center",
  },

  Registration: {
    fontSize: 16,
    color: "black",
    fontFamily: "appfontsemibold",
  },
  patients: {
    fontSize: 16,
    color: "black",
    fontFamily: "appfont",
  },
  button: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: "appfont",
    borderWidth: 1,
    borderColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: Colors.SECONDARY,
    margin: 5,
  },
});
