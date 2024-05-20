import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../../../Shared/Colors";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import app from "../../../../assets/Images/stethoscope.png";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const DoctorLogin = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://doc-back-new.onrender.com/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );

      const { jwt, user } = response.data;

      const doctorId = user.id;

      if (jwt && doctorId) {
        await SecureStore.setItemAsync("userToken", jwt);
        await SecureStore.setItemAsync("doctorId", doctorId.toString());

        navigation.navigate("doctortab", {
          doctorId: doctorId.toString(),
          token: jwt,
        });
      } else {
        Alert.alert("Login Failed", "Please check your credentials");
      }
    } catch (error) {
      Alert.alert("Login Error", "An error occurred during login");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={app} style={styles.image} />
      <Text style={styles.title}>Please Login to Your Account</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "appfontsemibold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  loginButton: {
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    padding: 7,
    borderRadius: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontFamily: "appfontsemibold",
    textAlign: "center",
    color: "white",
  },
  forgotPassword: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.red,
    fontSize: 16,
    fontFamily: "appfontsemibold",
  },
});

export default DoctorLogin;
