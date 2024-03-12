// import React from "react";
// import * as WebBrowser from "expo-web-browser";
// import { Button, Dimensions, Text, TouchableOpacity } from "react-native";
// import { useOAuth } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "../../hooks/warmUpBrowser"; 
// import Colors from "../Shared/Colors";
// WebBrowser.maybeCompleteAuthSession();
 
// const SignInWithOAuth = () => {
//   // Warm up the android browser to improve UX
//   // https://docs.expo.dev/guides/authentication/#improving-user-experience
//   useWarmUpBrowser();
 
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
//   const onPress = React.useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } =
//         await startOAuthFlow();
 
//       if (createdSessionId) {
//         setActive({ session: createdSessionId });
//       } else {
//         // Use signIn or signUp for next steps such as MFA
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//     }
//   }, []);
 
//   return (
//     <TouchableOpacity 
//     onPress={onPress}
//     style={{padding:16,
//     backgroundColor:Colors.white,
//     borderRadius:90,
//     alignItems:'center',
//     marginTop:20,
//     width:Dimensions.get('screen').width*0.8,
//     }}>
      
//         <Text style={{fontSize:17,color:Colors.blue,fontFamily:"appfontbold"}}>
//           Login With Google</Text>
//     </TouchableOpacity>
//   );
// }
// export default SignInWithOAuth;


import React from "react";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import Colors from "../Shared/Colors";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = ({ onLoginSuccess }) => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        onLoginSuccess(); // Call the success callback after setting the active session
      } else {
        // Handle case without a created session ID
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [onLoginSuccess]); // Include onLoginSuccess in the dependency array

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{
        padding: 16,
        backgroundColor: Colors.white,
        borderRadius: 90,
        alignItems: 'center',
        marginTop: 20,
        width: Dimensions.get('screen').width * 0.8,
      }}
    >
      <Text style={{ fontSize: 17, color: Colors.blue, fontFamily: "appfontbold" }}>
        Login With Google
      </Text>
    </TouchableOpacity>
  );
};

export default SignInWithOAuth;
