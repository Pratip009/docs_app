// import { View, Text, TextInput } from "react-native";
// import React, { useState } from "react";
// import { MaterialIcons } from "@expo/vector-icons";
// import Colors from "../../Shared/Colors";
// import GlobalApi from "../../Services/GlobalApi";
// import { useEffect } from "react";

// export default function SearchBar({ setResults }) {
//   const [input, setInput] = useState("");
//   // const fetchData = () => {
//   //   fetch("http://192.168.1.104:1337/api/doctors")
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       if (data && data.data && data.data.length > 0) {
//   //         const results = data.data.forEach((item) => {
//   //           results = item.attributes.Name
//   //         });

//   //         setResults(results);
//   //       }
//   //     });
//   // };
//   const fetchData = (value) => {
//     fetch("http://192.168.1.104:1337/api/doctors?populate=*")
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         const results = json.filter((item) => {
//           return (
//             value &&
//             item.attributes &&
//             item.attributes.Name &&
//             item.attributes.Name.toLowerCase().includes(
//               searchValue.toLowerCase()
//             )
//           );
//         });
//        console.log(results);
//         setResults(results);
//       });
//   };

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value.toLowerCase());
//   };

//   return (
//     <View style={{ marginTop: 15 }}>
//       <View
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           gap: 5,
//           alignItems: "center",
//           borderWidth: 0.7,
//           borderColor: Colors.grey,
//           padding: 8,
//           borderRadius: 8,
//         }}
//       >
//         <MaterialIcons name="search" size={24} color={Colors.blue} />
//         {/* <TextInput
//           placeholder="Search"
//           onChangeText={(value) => setSearchInput(value)}
//           onSubmitEditing={handleSearchSubmit}
//           style={{}}
//         /> */}
//         <TextInput
//           placeholder="Search"
//           value={input}
//           onChangeText={(value) => handleChange(value)}
//         />
//       </View>
//     </View>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

// const SearchBar = () => {
//   const [input, setInput] = useState('');
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     if (input.trim() !== '') {
//       fetchData(input);
//     } else {
//       setResults([]);
//     }
//   }, [input]);

//   const fetchData = (searchValue) => {
//     fetch('http://192.168.1.104:1337/api/doctors?populate=*')
//       .then((response) => response.json())
//       .then((data) => {
//         const filteredResults = data.data.filter((item) =>
//           item.attributes.Name.toLowerCase().includes(searchValue.toLowerCase())
//         );
//         setResults(filteredResults);
//       })
//       .catch((error) => console.error('Fetching error:', error));
//   };

//   const renderDoctor = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{item.attributes.Name}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <MaterialIcons name="search" size={24} color="black" />
//         <TextInput
//           style={styles.input}
//           placeholder="Search.."
//           value={input}
//           onChangeText={setInput}
//         />
//       </View>
//       <FlatList
//         data={results}
//         renderItem={renderDoctor}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width:'100%'
//   },
//   searchContainer: {
//     width:'auto',
//     flexDirection: 'row',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   input: {
//     width:'100%',
//     marginLeft: 10,
//     flex: 1,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 16,
//   },
// });

// export default SearchBar;

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";

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
        "http://192.168.1.104:1337/api/doctors?populate=*"
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
        "http://192.168.1.104:1337/api/categories?populate=*"
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
        "http://192.168.1.104:1337/api/hospitals/?populate=*"
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
      console.error("Fetching error:", error);
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
      <TextInput
        style={styles.input}
        placeholder="Search.."
        value={input}
        onChangeText={setInput}
      />
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
  input: {
    height: 45,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
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
