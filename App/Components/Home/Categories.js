// import { View, TouchableOpacity, Text, Image, FlatList } from "react-native";
// import React, { useEffect, useState } from "react";
// import GlobalApi from "../../Services/GlobalApi";
// import Colors from "../../../App/Shared/Colors";
// import SubHeading from "./SubHeading";
// import { useNavigation } from "@react-navigation/native";

// export default function Categories() {
//   const navigation = useNavigation();
//   const [categoryList, setCategoryList] = useState([]);
//   useEffect(() => {
//     getCategories();
//   }, []);
//   const getCategories = () => {
//     GlobalApi.getCategories().then((resp) => {
//       setCategoryList(resp.data.data);
//     });
//   };

//   if (!categoryList) {
//     return null;
//   }
//   return (
//     <View style={{ marginTop: 10 }}>
//       <SubHeading subHeadingTitle={"Doctor Spe"} />

//       <FlatList
//         data={categoryList}
//         numColumns={4}
//         columnWrapperStyle={{
//           flex: 1,
//           justifyContent: "space-between",
//         }}
//         renderItem={({ item, index }) =>
//           index < 4 && (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("hospital-doctor-list-screen", {
//                   categoryName: item.attributes.Name,
//                 })
//               }
//               style={{ alignItems: "center" }}
//             >
//               <View
//                 style={{
//                   backgroundColor: Colors.lightBlue,
//                   padding: 15,
//                   borderRadius: 99,
//                 }}
//               >
//                 <Image
//                   source={{
//                     uri: item.attributes.Icon.data.attributes.url,
//                   }}
//                   style={{
//                     width: 30,
//                     height: 30,
//                   }}
//                 />
//               </View>
//               <Text style={{ fontSize: 12, fontFamily: "appfont" }}>
//                 {item.attributes.Name}
//               </Text>
//             </TouchableOpacity>
//           )
//         }
//       />
//     </View>
//   );
// }
import { View, TouchableOpacity, Text, Image, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Services/GlobalApi";
import Colors from "../../../App/Shared/Colors";
import SubHeading from "./SubHeading";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    GlobalApi.getCategories().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  if (!categoryList) {
    return null;
  }
  return (
    <View style={{ marginTop: 10 }}>
      <SubHeading subHeadingTitle={"Doctor Specialties"} />

      <FlatList
        data={categoryList}
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Optionally hide the horizontal scroll indicator
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("hospital-doctor-list-screen", {
                categoryName: item.attributes.Name,
              })
            }
            style={styles.categoryItem}
          >
            <View
              style={styles.iconBackground}
            >
              <Image
                source={{
                  uri: item.attributes.Icon.data.attributes.url,
                }}
                style={styles.icon}
              />
            </View>
            <Text style={styles.categoryName}>
              {item.attributes.Name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} // It's good practice to provide a unique key
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    marginRight: 20, // Add spacing between items
  },
  iconBackground: {
    backgroundColor: Colors.lightBlue,
    padding: 15,
    borderRadius: 99,
    marginBottom: 5, // Add spacing between the icon and the text
  },
  icon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: "appfont", // Make sure you have this font loaded, or use a system default
  },
});
