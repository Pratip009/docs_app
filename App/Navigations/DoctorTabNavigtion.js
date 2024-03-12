import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BookDoctorAppointment from "../Screens/BookDoctorAppointment";
import Schedule from "../Screens/DoctorScreens/TabScreens/Schedule";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import DoctorProfile from "../Screens/DoctorScreens/TabScreens/DoctorProfile";
import DoctorAppointments from "../Screens/DoctorScreens/TabScreens/DoctorAppointment";
import DoctorHospitalAppointments from "../Screens/DoctorScreens/TabScreens/DcotorHospitalAppointment";
import Colors from "../Shared/Colors";
export default function DoctorTabNavigtion({ route }) {
  const { doctorId, token } = route.params;
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={DoctorProfile}
        initialParams={{ doctorId: doctorId, token: token }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Doc Appt."
        component={DoctorAppointments}
        initialParams={{ doctorId: doctorId, token: token }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chemb Appt."
        component={DoctorHospitalAppointments}
        initialParams={{ doctorId: doctorId, token: token }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hospital" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        initialParams={{ doctorId: doctorId, token: token }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
