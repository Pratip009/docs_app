import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import app from "../../assets/Images/signup.gif";
import otherImage from "../../assets/Images/dw.png";
import Colors from "../Shared/Colors";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [verificationImage, setVerificationImage] = useState(app);
  const [signUpLoading, setSignUpLoading] = useState(false); // State for signup loading
  const [verificationLoading, setVerificationLoading] = useState(false); // State for verification loading

  useEffect(() => {
    if (!isLoaded) return;
  }, [isLoaded]);

  const onSignUpPress = async () => {
    if (!isLoaded || signUpLoading) return;

    try {
      setSignUpLoading(true); // Start signup loading
      await signUp.create({
        firstName,
        lastName,
        username,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      
    } finally {
      setSignUpLoading(false); // Stop signup loading
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded || verificationLoading) return;

    try {
      setVerificationLoading(true); // Start verification loading
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

  

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigation.navigate("Home");
      } else {

      }
    } catch (err) {
     
    } finally {
      setVerificationLoading(false); // Stop verification loading
    }
  };

  useEffect(() => {
    if (pendingVerification) {
      setVerificationImage(otherImage);
    }
  }, [pendingVerification]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={verificationImage} style={styles.image} />
        {!pendingVerification && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
            <TextInput
              style={styles.input}
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
            <TextInput
              style={styles.input}
              value={username}
              placeholder="Username..."
              onChangeText={(username) => setUserName(username)}
            />
            <TextInput
              style={styles.input}
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
              {signUpLoading ? (
                <ActivityIndicator color="#00A9FF" />
              ) : (
                <Text style={styles.buttonText}>Sign up</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("signin")}>
              <Text style={styles.linkText}>
                Already Have an Account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {pendingVerification && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Verification Code..."
              onChangeText={(code) => setCode(code)}
            />
            <TouchableOpacity style={styles.button} onPress={onPressVerify}>
              {verificationLoading ? (
                <ActivityIndicator color="#00A9FF" />
              ) : (
                <Text style={styles.buttonText}>Verify Email</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20, // Add padding bottom
    backgroundColor: "white",
    flex: 1, // Ensure the container takes up the entire screen
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  formContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "appfontsemibold",
  },
  linkText: {
    color: Colors.PRIMARY,
    marginTop: 10,
    textAlign: "center",
  },
});
