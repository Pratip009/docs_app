import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Colors from "../Shared/Colors";

const SplashScreens = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Images/logo.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/Images/TS-CuroHub1.png")}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontFamily: "appfontbold",
    color: "#333333",
  },
});

export default SplashScreens;
