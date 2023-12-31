import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import HospitalDoctorsListScreen from "../Screens/HospitalDoctorsListScreen";
import HospitalDetails from "../Screens/HospitalDetails";
import DoctorDetails from "../Screens/DoctorDetails";
import BookAppointment from "../Screens/BookAppointment";
import SignInScreen from "../Screens/SignInScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import Login from "../Screens/Login";

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen
        name="hospital-doctor-list-screen"
        component={HospitalDoctorsListScreen}
      />
      <Stack.Screen name="hospital-detail" component={HospitalDetails} />
      <Stack.Screen name="doctor-detail" component={DoctorDetails} />
      <Stack.Screen name="book-appointment" component={BookAppointment} />
      <Stack.Screen name="sign-in" component={SignInScreen} />
      <Stack.Screen name="sign-up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
