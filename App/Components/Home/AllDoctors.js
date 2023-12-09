import { View, Text,TouchableOpacity  } from "react-native";
import React from "react";
import SubHeading from "./SubHeading";
import { useState,useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import DoctorItem from "./DoctorsItem";
import { useNavigation } from '@react-navigation/native';
import GlobalApi from "../../Services/GlobalApi";



export default function AllDoctors() {
  const [doctorList, setDoctorList] = useState([]);



  const navigation=useNavigation();
  useEffect(()=>{
    getAllDoctorList()
  },[])
  const getAllDoctorList=()=>{
      GlobalApi.getAllDoctorList().then(resp=>{
        setDoctorList(resp.data.data)
      })
  }

  return doctorList&& (
    <View style={{ marginTop: 10 }}>
      <SubHeading subHeadingTitle={"Our Doctors"} />
      <FlatList
        data={doctorList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("doctor-detail", {
                hospital: item,
              })
            }
          >
            <DoctorItem hospital={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
