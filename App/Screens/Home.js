import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import Header from "../Components/Home/Header";
import SearchBar from "../Components/Home/SearchBar";
import Slider from "../Components/Home/Slider";
import Category from "../Components/Home/Categories";
import PremiumHospitals from "../Components/Home/PremiumHospitals";
import Categories from "../Components/Home/Categories";
import AllDoctors from "../Components/Home/AllDoctors";
import Responsive from "../Shared/Responsive";
import SearchResultsList from "../Components/Home/SearchResultList";
import { useState } from "react";
const Home = () => {
  const { isLoaded, signOut } = useAuth();
  const [results, setResults] = useState([]);

  return (
    <ScrollView
      style={{
        padding: Responsive.height10 * 2,
        paddingTop: Responsive.height10,
        marginTop: Responsive.height10,
      }}
    >
      <Header />
      <View
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </View>

      <Slider />
      <Categories />
      <PremiumHospitals />
      <PremiumHospitals />

      {/* <Button title="SignOut" onPress={() => signOut()}></Button> */}
      {/* <Text>Home</Text> */}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
