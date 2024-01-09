import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Colors from "../Shared/Colors";


export default function SignUpScreen(props) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");



  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/dccc.jpg')}
      resizeMode={'cover'}
      style={{ flex: 1, width: '100%' }}>

      <View style={styles.mainView}>

        {!pendingVerification && (
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
                Register
              </Text>
            </View>
            <View style={styles.SignupView}>
              <Text style={{
                fontSize: 25,
                fontFamily: 'appfont',
                color: Colors.white
              }}>
                Create a new account
              </Text>
            </View>

            <View style={styles.SignupView}>
              <View style={styles.level}>
                <Text style={styles.levelText}>First Name</Text>
              </View>
              <TextInput
                style={styles.textfield}
                autoCapitalize="none"
                value={firstName}
                placeholder="John"
                placeholderTextColor={Colors.grey}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View >
            <View style={styles.SignupView}>
              <View style={styles.level}>
                <Text style={styles.levelText}>Last Name</Text>
              </View>
              <TextInput
                style={styles.textfield}
                autoCapitalize="none"
                value={lastName}
                placeholder="Doe"
                placeholderTextColor={Colors.grey}
                onChangeText={(lastName) => setLastName(lastName)}
              />
            </View>
            <View style={styles.SignupView}>
              <View style={styles.level}>
                <Text style={styles.levelText}>Enail</Text>
              </View>
              <TextInput
                style={styles.textfield}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="johndoe@gmail.com"
                placeholderTextColor={Colors.grey}
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
                placeholder="********"
                placeholderTextColor={Colors.grey}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View style={styles.SignupView}>
              <TouchableOpacity onPress={onSignUpPress} style={{
                padding: 16,
                backgroundColor: Colors.white,
                borderRadius: 90,
                alignItems: "center",
                marginTop: 40,
                width: Dimensions.get("screen").width * 0.6,
              }}>
                <Text style={{ fontSize: 17, color: Colors.blue, fontFamily: "appfontbold" }}>Sign up</Text>
              </TouchableOpacity>
              <View style={styles.SignupView}>
                <Text style={{

                  fontSize: 20,
                  fontFamily: 'appfontbold',
                  marginTop: 20,
                  color: Colors.white
                }}>
                  Already have an account? 
                </Text>
                <TouchableOpacity >
                  <Text style={{color:"red",fontFamily:"appfontbold"}}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        )}
        {pendingVerification && (
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
                  Verification
                </Text>
              </View>
              <View style={styles.SignupView}>
                <Text style={{
                  fontSize: 25,
                  fontFamily: 'appfont',
                  color: Colors.white
                }}>
                  Please enter the OTP sent to your email address
                </Text>
              </View>
              <View style={styles.SignupView}>
                <View style={styles.level}>
                  <Text style={styles.levelText}>Password</Text>
                </View>
                <TextInput
                  style={styles.textfield}
                  value={code}
                  placeholder="Code"
                  onChangeText={(code) => setCode(code)}
                />
              </View>
              <TouchableOpacity onPress={onPressVerify} style={{
                padding: 16,
                backgroundColor: Colors.white,
                borderRadius: 90,
                alignItems: "center",
                marginTop: 20,
                width: Dimensions.get("screen").width * 0.8,
              }}>
                <Text style={{ fontSize: 17, color: Colors.blue, fontFamily: "appfontbold" }}>Verify Email</Text>
              </TouchableOpacity>
             
            </View>

          </View>
        )}
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