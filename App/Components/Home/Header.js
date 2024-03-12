import { View, Text, Image, TouchableOpacity,Alert } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import app from "../../../assets/Images/fill.png";
import Colors from "../../Shared/Colors";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

export default function Header() {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop

  const { isLoaded, isSignedIn, user } = useUser();
  const handleDoctorPress = () => {
    Alert.alert(
      "Confirmation",
      "Are you a doctor?",
      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("doctor-login"), // Navigate to DoctorLogin screen
        },
        {
          text: "No",
          onPress: () => console.log("Not a doctor"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  // If the user data is still loading, you may choose to return null or a loading indicator
  if (!isLoaded) {
    return null; // or a loading indicator
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginRight: 10, // Adjusted for spacing
        }}
      >
        {isSignedIn && user ? (
          <>
            <Image
              source={{ uri: user.imageUrl }} // Assuming user.imageUrl is always valid for signed-in users
              style={{
                width: 45,
                height: 45,
                borderRadius: 22.5,
                marginRight: 10,
              }}
            />
            <View>
              <Text style={{ fontFamily: "appfont" }}>Hello,👋</Text>
              <Text style={{ fontSize: 18, fontFamily: "appfontsemibold" }}>
                {user.fullName}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Image
              source={{
                uri: "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg",
              }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 22.5,
                marginRight: 10,
              }}
            />
            <View>
              <Text style={{ fontFamily: "appfont" }}>Hello,👋</Text>
              <Text style={{ fontSize: 18, fontFamily: "appfontsemibold" }}>
                Guest
              </Text>
            </View>
          </>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={handleDoctorPress}>
          <Image
            source={app}
            style={{ width: 28, height: 28, marginRight: 10 }}
          />
        </TouchableOpacity>
        <Ionicons name="md-notifications" size={28} color={Colors.PRIMARY} />
      </View>
    </View>
  );
}
