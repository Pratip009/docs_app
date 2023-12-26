import React from "react";
import { Text, TextInput, TouchableOpacity, View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import Colors from "../Shared/Colors";



export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/Images/dccc.jpg')}
      resizeMode={'cover'}
      style={{ flex: 1, width: '100%' }}>
      <View style={styles.mainView}>
        <View style={{
          backgroundColor: Colors.blue,
          width: "90%",
          height: "auto",
          borderRadius: 10,
          padding: 20
        }}>
          <View style={styles.SignupView}>
              <Text
                style={{

                  fontSize: 45,
                  fontFamily: 'appfontbold',
                  marginTop: 20,
                  color: Colors.white
                }}>
                Sign In
              </Text>
            </View>
            <View style={styles.SignupView}>
              <Text style={{
                fontSize: 25,
                fontFamily: 'appfont',
                color: Colors.white
              }}>
                Welcome Back!
              </Text>
            </View>
          <View style={styles.SignupView}>
            <View style={styles.level}>
              <Text style={styles.levelText}>Email</Text>
            </View>
            <TextInput
              style={styles.textfield}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
          </View>

          <View style={styles.SignupView}>
            <View style={styles.level}>
              <Text style={styles.levelText}>Password</Text>
            </View>
            <TextInput
              style={styles.textfield}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <View style={styles.SignupView}>
            <TouchableOpacity onPress={onSignInPress} style={{
              padding: 16,
              backgroundColor: Colors.white,
              borderRadius: 90,
              alignItems: "center",
              marginTop: 40,
              width: Dimensions.get("screen").width * 0.6,
            }}>
              <Text style={{ fontSize: 17, color: Colors.blue, fontFamily: "appfontbold" }}>Sign in</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </ImageBackground>

  );
}
const styles = StyleSheet.create({
  SignupView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  textfield: {
    width: '80%',
    height: 40,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    fontSize: 16,
    color: '#000000',
    backgroundColor: "#FFFFFF"
  },
  level: {
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: "80%",
    marginBottom: -20,
    marginTop: 15
  },
  levelText: {
    fontFamily: "appfontlight",
    fontSize: 17,
    color: "#FFFFFF"

  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})