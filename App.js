import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Login from "./App/Screens/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Home from "./App/Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";
import SignInWithOAuth from "./App/Components/SignInWithOAuth";
import HospitalDoctorsListScreen from "./App/Screens/HospitalDoctorsListScreen";
import HospitalDetails from "./App/Screens/HospitalDetails";
import DoctorDetails from "./App/Screens/DoctorDetails";
import BookAppointment from "./App/Screens/BookAppointment";
import SignInScreen from "./App/Screens/SignInScreen";
import SignUpScreen from "./App/Screens/SignUpScreen";
const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    appfont: require("./assets/fonts/Outfit-Regular.ttf"),
    appfontbold: require("./assets/fonts/Outfit-Bold.ttf"),
    appfontsemibold: require("./assets/fonts/Outfit-SemiBold.ttf"),
    appfontlight: require("./assets/fonts/Outfit-Light.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_c3RpcnJlZC1zY29ycGlvbi00MC5jbGVyay5hY2NvdW50cy5kZXYk"
      }
    >
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <NavigationContainer>
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
        </NavigationContainer>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
