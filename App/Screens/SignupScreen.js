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
  Alert,
} from "react-native";
import { useSignUp, useSession, useClerk } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import app from "../../assets/Images/signup.gif";
import otherImage from "../../assets/Images/dw.png";
import Colors from "../Shared/Colors";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useClerk();
  const session = useSession();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [verificationImage, setVerificationImage] = useState(app);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
  }, [isLoaded]);

  const handleExistingSession = async () => {
    if (session && session.id) {
      console.log("An existing session was found, signing out...");
      await signOut();
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded || signUpLoading) return;

    try {
      await handleExistingSession();
      setSignUpLoading(true);
      const signUpResult = await signUp.create({
        firstName,
        lastName,
        username,
        emailAddress,
        password,
      });

      console.log("Sign-up success: ", signUpResult);

      if (signUpResult.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setPendingVerification(true);
      } else {
        Alert.alert(
          "Sign-up Error",
          "Missing required fields or other issues."
        );
      }
    } catch (err) {
      console.error("Sign-up error: ", err);
      Alert.alert(
        "Sign-up Error",
        err?.message ||
          JSON.stringify(err) ||
          "An unknown error occurred during sign-up."
      );
    } finally {
      setSignUpLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded || verificationLoading) return;

    try {
      setVerificationLoading(true);

      // Send the verification code as plain text
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });

      console.log("Verification response:", completeSignUp); // Log full response object

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigation.navigate("Home");
      } else {
        console.error("Verification incomplete:", completeSignUp); // Log if verification is incomplete
        Alert.alert("Verification Error", "Verification incomplete. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err); // Log the verification error

      // Check if there's a specific message in the error response
      if (err?.response?.data?.message) {
        console.log("Error message from API:", err.response.data.message);
        Alert.alert("Verification Error", err.response.data.message);
      } else {
        Alert.alert(
          "Verification Error",
          err?.message || "An unknown error occurred during verification."
        );
      }
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
    paddingBottom: 20,
    backgroundColor: "white",
    flex: 1,
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
