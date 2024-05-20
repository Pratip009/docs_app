import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import SubHeading from "./SubHeading";
import GlobalApi from "../../Services/GlobalApi";
import HospitalItem from "./HospitalItem";
import { useNavigation } from "@react-navigation/native";
import DoctorItem from "./DoctorItem";

export default function OurDoctors() {
  const [doctorList, setDoctorList] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    getAllDoctorList();
  }, []);
  const getAllDoctorList = () => {
    GlobalApi.getAllDoctorList().then((resp) => {
      setDoctorList(resp.data.data);
    });
  };
  return (
    doctorList && (
      <View style={{ marginTop: 10 }}>
        <SubHeading subHeadingTitle={"Our Doctors"} />
        <View style={{}}>
          <FlatList
            data={doctorList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("doctor-detail", {
                    doctor: item,
                  })
                }
              >
                <DoctorItem doctor={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    )
  );
}
