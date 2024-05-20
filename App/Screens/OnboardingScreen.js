import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const slides = [
  {
    key: "one",
    title: "Welcome to Our App",
    text: "Description.\nSay something cool",
    image: require("../../assets/Images/onboard1.png"), // Make sure you have this image in your assets
    backgroundColor: "#77C4F1",
  },

  {
    key: "two",
    title: "Organize Your Work",
    text: "Other cool stuff",
    image: require("../../assets/Images/onboard2.png"), // And this one
    backgroundColor: "#E0C78B",
  },
  {
    key: "three",
    title: "Achieve Your Goals",
    text: "I'm already out of descriptions\nLorem ipsum bla bla bla",
    image: require("../../assets/Images/onboard3.png"), // And this one
    backgroundColor: "#44BCB6",
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onDone = () => {
    navigation.replace("Home"); 
  };

  return (
    <AppIntroSlider renderItem={renderSlide} data={slides} onDone={onDone} />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 32,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontFamily: "appfont",
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    fontFamily: "appfontsemibold",
  },
});

export default OnboardingScreen;
