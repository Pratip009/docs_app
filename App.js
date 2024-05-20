import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./AuthContext";
import SplashScreens from "./App/Screens/SplashScreens";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";


const Stack = createStackNavigator();
export default function App() {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);

  const [fontsLoaded] = useFonts({
    appfont: require("./assets/fonts/Outfit-Regular.ttf"),
    appfontbold: require("./assets/fonts/Outfit-Bold.ttf"),
    appfontsemibold: require("./assets/fonts/Outfit-SemiBold.ttf"),
    appfontlight: require("./assets/fonts/Outfit-Light.ttf"),
  });
  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);
    // Log the screen size
    const { width, height } = Dimensions.get("window");
    console.log(`Screen width: ${width}, Screen height: ${height}`);
  }, []);

  if (!fontsLoaded || isSplashScreenVisible) {
    return <SplashScreens />; // Show the splash screen while loading fonts or for the first 3 seconds
  }
  return (
    <ClerkProvider
      publishableKey={
        "pk_test_c3RpcnJlZC1zY29ycGlvbi00MC5jbGVyay5hY2NvdW50cy5kZXYk"
      }
    >
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
