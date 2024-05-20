import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (input.trim() === "") {
      setResults([]);
    } else {
      fetchData(input);
    }
  }, [input]);

  const fetchData = async (searchValue) => {
    try {
      // Fetch doctors
      const doctorsResponse = await fetch(
        "https://doc-back-new.onrender.com/api/doctors?populate=*"
      );
      const doctorsData = await doctorsResponse.json();
      const doctorsResults = doctorsData.data
        .map((item) => ({
          ...item,
          type: "doctor", // Add a type for distinguishing between doctors and categories
        }))
        .filter((item) =>
          item.attributes.Name.toLowerCase().includes(searchValue.toLowerCase())
        );

      // Fetch categories
      const categoriesResponse = await fetch(
        "https://doc-back-new.onrender.com/api/categories?populate=*"
      );
      const categoriesData = await categoriesResponse.json();
      const categoriesResults = categoriesData.data
        .map((item) => ({
          ...item,
          type: "category", // Add a type for distinguishing between doctors and categories
        }))
        .filter((item) =>
          item.attributes.Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      // Fetch chembers
      const chemberResponse = await fetch(
        "https://doc-back-new.onrender.com/api/hospitals/?populate=*"
      );
      const chemberData = await chemberResponse.json();
      const chemberResults = chemberData.data
        .map((item) => ({
          ...item,
          type: "hospital", // Add a type for distinguishing between doctors and categories
        }))
        .filter((item) =>
          item.attributes.Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      // Combine and set the results
      setResults([...doctorsResults, ...categoriesResults, ...chemberResults]);
    } catch (error) {
      Alert("Fetching error:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // Navigate based on the type with relevant data
        if (item.type === "doctor") {
          navigation.navigate("doctor-detail", { doctor: item });
        } else if (item.type === "category") {
          navigation.navigate("hospital-doctor-list-screen", {
            categoryName: item.attributes.Name,
          });
        } else if (item.type === "hospital") {
          navigation.navigate("hospital-detail", { hospital: item });
        }
      }}
    >
      <Text style={styles.title}>{item.attributes.Name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome5
          name="searchengin"
          size={24}
          color={Colors.PRIMARY}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Doctors,Chembers & Categories.."
          placeholderTextColor={Colors.deepgrey}
          value={input}
          onChangeText={setInput}
        />
      </View>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}-${item.type}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderColor: Colors.deepgrey,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 5,
  },
  searchIcon: {
    marginLeft: 10, // Add left margin to the search icon
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 12,
    fontFamily: "appfontlight",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#38B4ED",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    color: "#FFFFFF",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default SearchBar;
