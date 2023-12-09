import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  
} from "react-native";
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

const Home = () => {
  const { isLoaded, signOut } = useAuth();

  return (
    <ScrollView style={{ padding: Responsive.height10*2, paddingTop: Responsive.height10, marginTop: Responsive.height10 }}>
      <Header />
      <SearchBar setSearchText={(value) => console.log(value)} />
      <Slider />
      <Categories/>
     <PremiumHospitals/>
     <PremiumHospitals/>


      {/* <Button title="SignOut" onPress={() => signOut()}></Button> */}
      {/* <Text>Home</Text> */}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
