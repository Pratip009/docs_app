import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import HospitalDoctorsListScreen from "../Screens/HospitalDoctorsListScreen";
import HospitalDetails from "../Screens/HospitalDetails";
import DoctorDetails from "../Screens/DoctorDetails";
import BookAppointment from "../Screens/BookAppointment";

import Login from "../Screens/Login";
import BookDoctorAppointment from "../Screens/BookDoctorAppointment";
import BookingToDoctor from "../Screens/BookingToDoctor";
import BookingSection from "../Components/BookAppointment/BookingSection";
import SigninScreen from "../Screens/SigninScreen";
import SignupScreen from "../Screens/SignupScreen";
import DoctorLogin from "../Screens/DoctorScreens/DoctorAuth/DoctorLogin";
import DoctorProfile from "../Screens/DoctorScreens/TabScreens/DoctorProfile";
import DoctorTabNavigtion from "./DoctorTabNavigtion";
import DoctorHomeNavigation from "./DoctorHomeNavigation";
import MainScreenDoctor from "./MainScreenDoctor";
import DoctorAppointments from "../Screens/DoctorScreens/TabScreens/DoctorAppointment";
import DoctorHospitalAppointments from "../Screens/DoctorScreens/TabScreens/DcotorHospitalAppointment";
import Schedule from "../Screens/DoctorScreens/TabScreens/Schedule";
import ForgotPassword from "../Screens/ResetPassword";
import OnboardingScreen from "../Screens/OnboardingScreen";

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen
        name="hospital-doctor-list-screen"
        component={HospitalDoctorsListScreen}
      />
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="hospital-detail" component={HospitalDetails} />

      <Stack.Screen name="doctor-detail" component={DoctorDetails} />
      <Stack.Screen name="book-appointment" component={BookAppointment} />
      <Stack.Screen name="booking-to-doctor" component={BookingToDoctor} />

      <Stack.Screen
        name="book-doctor-appointment"
        component={BookDoctorAppointment}
      />
      <Stack.Screen name="sign-in" component={Login} />
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="doctor-login" component={DoctorLogin} />
      <Stack.Screen name="reset-screen" component={ForgotPassword} />

      <Stack.Screen
        name="doctor-home-navigation"
        component={DoctorHomeNavigation}
      />
      <Stack.Screen name="MainScreenDoctor" component={MainScreenDoctor} />
      <Stack.Screen name="doctortab" component={DoctorTabNavigtion} />
      <Stack.Screen
        name="doctor-panel"
        component={DoctorProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="doctor-appointment-screen"
        component={DoctorAppointments}
      />
      <Stack.Screen
        name="doctor-hospital-appointment-screen"
        component={DoctorHospitalAppointments}
      />
      <Stack.Screen name="Schedule" component={Schedule} />
    </Stack.Navigator>
  );
}
