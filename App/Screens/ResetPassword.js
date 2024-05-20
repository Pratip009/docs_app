import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export default function ForgotPassword() {
  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");
  const { isLoaded, setActive } = useSignIn();

  // Send the password reset code to the user's email
  async function sendPasswordResetCode() {
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
      setError("");
    } catch (err) {
      
      setError(err.message);
    }
  }

  // Reset the user's password
  async function resetPassword() {
    try {
      
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password",
        code,
        password,
      });
  
  
      if (result.status === "needs_second_factor") {
        setSecondFactor(true);
        setError("");
      } else if (result.status === "complete") {
        setActive({ session: result.createdSessionId });
        setError("");
      } else {
        // Handle unexpected result status
       
        setError("An unexpected error occurred while resetting the password. Please try again later.");
      }
    } catch (err) {
      // Log the error object to get more details
    
      
      // Check if the error object has a message property
      const errorMessage = err.message || "An unknown error occurred while resetting the password. Please try again later.";
  
      // Set the error message state
      setError(errorMessage);
    }
  }
  
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      {!successfulCreation ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={sendPasswordResetCode}>
            <Text style={styles.buttonText}>Send Password Reset Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter the password reset code"
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={resetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {secondFactor ? (
        <Text>2FA is required, but this UI does not handle that</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "80%",
  },
  button: {
    backgroundColor: "#00A9FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
