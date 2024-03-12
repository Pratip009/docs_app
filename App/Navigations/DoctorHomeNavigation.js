
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DoctorProfile from "../Screens/DoctorScreens/TabScreens/DoctorProfile";
import DoctorAppointment from "../Screens/DoctorScreens/TabScreens/DoctorAppointment";
import Schedule from "../Screens/DoctorScreens/TabScreens/Schedule";
import DoctorLogin from "../Screens/DoctorScreens/DoctorAuth/DoctorLogin";
import MainScreenDoctor from "./MainScreenDoctor";
import DoctorTabNavigtion from "./DoctorTabNavigtion";
import DoctorHospitalAppointments from "../Screens/DoctorScreens/TabScreens/DcotorHospitalAppointment";
import HomeNavigation from "./HomeNavigation";
const Stack = createStackNavigator();

export default function DoctorHomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="doctor-login" component={DoctorLogin} />
      <Stack.Screen name="doctortab" component={DoctorTabNavigtion} />
      <Stack.Screen name="MainScreenDoctor" component={MainScreenDoctor} />
      <Stack.Screen
        name="doctor-panel"
        component={DoctorProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="doctor-appointment-screen"
        component={DoctorAppointment}
      />
      <Stack.Screen
        name="doctor-hospital-appointment-screen"
        component={DoctorHospitalAppointments}
      />
      <Stack.Screen name="doctor-availability" component={Schedule} />
      <Stack.Screen name="home-navigation" component={HomeNavigation} />
    </Stack.Navigator>
  );
}
