import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
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
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("hospital-doctor-list-screen", {
                categoryName: item.attributes.Name,
              })
            }
            style={styles.categoryItem}
          >
            <View style={styles.iconBackground}>
              <Image
                source={{
                  uri: item.attributes.Icon.data.attributes.url,
                }}
                style={styles.icon}
              />
            </View>
            <Text style={styles.categoryName}>{item.attributes.Name}</Text>
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
    marginRight: 20,
  },
  iconBackground: {
    backgroundColor: Colors.bg,
    padding: 15,
    borderRadius: 15,
    marginBottom: 5,
    borderColor: Colors.PRIMARY,
    borderWidth: 0.5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: "appfontsemibold",
  },
});
