import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Alert
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useUser } from "@clerk/clerk-expo";
import { Modal, TextInput, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SECTIONS = [
  {
    header: "Preferences",
    items: [
      { id: "language", icon: "globe", label: "Language", type: "select" },
      { id: "darkMode", icon: "moon", label: "Dark Mode", type: "toggle" },
      { id: "wifi", icon: "wifi", label: "Use Wi-Fi", type: "toggle" },
    ],
  },
  {
    header: "Help",
    items: [
      { id: "bug", icon: "flag", label: "Report", type: "link" },
      { id: "contact", icon: "mail", label: "Contact Us", type: "link" },
    ],
  },
  {
    header: "Content",
    items: [
      { id: "save", icon: "save", label: "Saved", type: "link" },
      { id: "download", icon: "download", label: "Downloads", type: "link" },
    ],
  },
];

export default function Profile() {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportForm, setReportForm] = useState({
    subject: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempForm, setTempForm] = useState({
    fullName: "",
    email: "",
    number: "",
  });
  const { isLoaded, isSignedIn, user } = useUser();
  const navigation = useNavigation();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const [form, setForm] = useState({
    language: "English",
    darkMode: true,
    wifi: false,
  });
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const handleSaveProfile = () => {
    setModalVisible(!modalVisible);
    // Assuming 'user' can be directly mutated; in a real scenario, you'd likely call an API
    user.fullName = tempForm.fullName;
    user.primaryEmailAddress.emailAddress = tempForm.email;
    user.primaryPhoneNumber = tempForm.number;
    // Reset tempForm or update actual form state as needed
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSignOutPress = async () => {
    try {
      // Show confirmation alert
      Alert.alert(
        "Confirm",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              // Remove the session token from AsyncStorage
              await AsyncStorage.removeItem("sessionToken");
              // Navigate to the sign-in screen or any other screen as needed
              navigation.navigate("signin");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#f6f6f6" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            presentationStyle="formsheet"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.modalTextInput}
                  onChangeText={(text) =>
                    setTempForm({ ...tempForm, fullName: text })
                  }
                  value={tempForm.fullName}
                  placeholder="Full Name"
                />

                <TextInput
                  style={styles.modalTextInput}
                  onChangeText={(text) =>
                    setTempForm({ ...tempForm, email: text })
                  }
                  value={tempForm.email}
                  placeholder="Email"
                />
                <TextInput
                  style={styles.modalTextInput}
                  onChangeText={(number) =>
                    setTempForm({ ...tempForm, number: number })
                  }
                  value={tempForm.number}
                  placeholder="Number"
                />
                <Button title="Save Changes" onPress={handleSaveProfile} />
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={onSignOutPress}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "appfontsemibold",
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profile}>
          {/* <View style={styles.container}>
            <View style={styles.imagePickerContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Text style={styles.placeholderText}>No image selected</Text>
                </View>
              )}
            </View>
            <Button title="Select Image" onPress={pickImage} />
          </View> */}
          <Image
            alt=""
            source={{ uri: user.imageUrl }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>{user.fullName}</Text>

          <Text style={styles.profileEmail}>
            {user.primaryEmailAddress.emailAddress}
          </Text>
          {/* <Text style={styles.profileEmail}>{user.id}</Text> */}
          <Text style={styles.profileEmail}>{user.primaryPhoneNumber}</Text>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                    >
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />

                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer} />

                        {type === "select" && (
                          <Text style={styles.rowValue}>{form[id]}</Text>
                        )}

                        {type === "toggle" && (
                          <Switch
                            onChange={(val) => setForm({ ...form, [id]: val })}
                            value={form[id]}
                          />
                        )}

                        {(type === "select" || type === "link") && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },

  title: {
    fontSize: 26,
    fontFamily: "appfontsemibold",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "appfont",
    color: "#929292",
  },
  /** Profile */
  profile: {
    padding: 16,

    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%", // Set width
    height: "50%", // Set height
    backgroundColor: "#007bff", // Set background color
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontFamily: "appfontsemibold",
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: "appfontlight",
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontFamily: "appfont",
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: "appfontsemibold",
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontFamily: "appfont",
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },
  imagePickerContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  placeholderContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#e1e4e8",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#64748b",
  },
});
