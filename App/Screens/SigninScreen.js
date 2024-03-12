// import React, { useState } from "react";
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { useSignIn } from "@clerk/clerk-expo";
// import { useNavigation } from "@react-navigation/native";
// import appImage from "../../assets/Images/loginimage.jpg"; // Assuming you have an image for your app
// import Colors from "../Shared/Colors";

// export default function SignInScreen() {
//   const navigation = useNavigation();
//   const { signIn, setActive, isLoaded } = useSignIn();

//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   const onSignInPress = async () => {
//     if (!isLoaded) return;

//     try {
//       const completeSignIn = await signIn.create({
//         identifier: username,
//         password,
//       });

//       // This is an important step,
//       // This indicates the user is signed in
//       navigation.navigate("Home");
//       await setActive({ session: completeSignIn.createdSessionId });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={appImage} style={styles.image} />
//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           autoCapitalize="none"
//           value={username}
//           placeholder="Username"
//           onChangeText={(username) => setUserName(username)}
//         />
//         <TextInput
//           style={styles.input}
//           value={password}
//           placeholder="Password..."
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <TouchableOpacity style={styles.button} onPress={onSignInPress}>
//           <Text style={styles.buttonText}>Sign in</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("signup")}>
//           <Text style={styles.linkText}>Don't Have an Account? Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: "80%",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: Colors.PRIMARY,
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontFamily: "appfontsemibold",
//     fontSize: 16,
//   },
//   linkText: {
//     color: Colors.PRIMARY,
//     marginTop: 10,

//     textAlign: "center",
//     fontFamily: "appfont",
//   },
// });

import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import appImage from "../../assets/Images/loginimage.jpg"; // Assuming you have an image for your app
import Colors from "../Shared/Colors";

export default function SignInScreen() {
  const navigation = useNavigation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded || loading) return;

    try {
      setLoading(true); // Start loading
      const completeSignIn = await signIn.create({
        identifier: username,
        password,
      });

      // This is an important step,
      // This indicates the user is signed in
      navigation.navigate("Home");
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Image source={appImage} style={styles.image} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={username}
          placeholder="Username"
          onChangeText={(username) => setUserName(username)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          {loading ? (
            <ActivityIndicator color="#00A9FF" />
          ) : (
            <Text style={styles.buttonText}>Sign in</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("reset-screen")}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.linkText}>Don't Have an Account? Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
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
    fontFamily: "appfontsemibold",
    fontSize: 16,
  },
  linkText: {
    color: Colors.PRIMARY,
    marginTop: 10,

    textAlign: "center",
    fontFamily: "appfont",
  },
});
