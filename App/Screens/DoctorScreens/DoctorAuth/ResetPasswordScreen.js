import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

const ResetPasswordScreen = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = route.params?.token;

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert(
          "Password Mismatch",
          "Passwords do not match. Please try again."
        );
        return;
      }

      const response = await axios.post(
        "https://doc-back-new.onrender.com/api/auth/reset-password",
        { password, token }
      );
      Alert.alert(
        "Password Reset",
        "Your password has been successfully reset."
      );
      navigation.navigate("doctor-login");
    } catch (error) {
      Alert.alert(
        "Reset Password Error",
        "An error occurred while resetting your password."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="New Password"
        style={styles.input}
        secureTextEntry={true}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm New Password"
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={handleResetPassword}
        style={styles.resetButton}
      >
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "appfontsemibold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  resetButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 20,
    fontFamily: "appfontsemibold",
    textAlign: "center",
    color: "white",
  },
});

export default ResetPasswordScreen;
