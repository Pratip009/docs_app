import { View, Text } from "react-native";
import React, { Fragment } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home.js";
import Appointment from "../Screens/Appointment.js";
import Profile from "../Screens/Profile.js";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavigation from "./HomeNavigation.js";
import Explores from "../Screens/Explores.js";
import DocAppointment from "../Screens/DocAppointment.js";
import Colors from "../Shared/Colors.js";


const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarLabelStyle: {
        fontSize: 12, // Adjust the font size
        fontFamily: "appfontsemibold", // Set your custom font family
      },
      tabBarActiveTintColor: Colors.PRIMARY, // Change the active tab color
      tabBarInactiveTintColor: Colors.grey, // Change the inactive tab color
    }}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
          fontFamily: "appfont",
          }
        }}
      />
       <Tab.Screen
        name="Explore"
        component={Explores}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
          fontFamily: "appfont",
          }
        }}
      />
      <Tab.Screen
        name="Chemb. Appt."
        component={Appointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
          fontFamily: "appfont",
          }
        }}
      />
      <Tab.Screen
        name="Doc Appt."
        component={DocAppointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-plus-o" size={size} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
          fontFamily: "appfont",
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          tabBarLabelStyle:{
            fontSize: 13, 
          fontFamily: "appfont",
          }
        }}
      />
    </Tab.Navigator>
  );
}
