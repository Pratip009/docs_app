import React from "react";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity, Text, Dimensions, Alert } from "react-native";
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
        onLoginSuccess();
      } else {
      }
    } catch (err) {
      Alert("OAuth error", err);
    }
  }, [onLoginSuccess]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 16,
        backgroundColor: Colors.white,
        borderRadius: 90,
        alignItems: "center",
        marginTop: 20,
        width: Dimensions.get("screen").width * 0.8,
      }}
    >
      <Text
        style={{ fontSize: 17, color: Colors.blue, fontFamily: "appfontbold" }}
      >
        Login With Google
      </Text>
    </TouchableOpacity>
  );
};

export default SignInWithOAuth;
