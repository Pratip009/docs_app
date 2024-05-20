import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet, Image } from "react-native";
import GlobalApi from "../../Services/GlobalApi";
import Colors from "../../Shared/Colors";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = () => {
    GlobalApi.getSlider().then((resp) => {
      setSliderList(resp.data.data);
    });
  };

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item.attributes.Image.data.attributes.url }}
      style={styles.sliderImage}
    />
  );

  const handlePagination = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={sliderList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={handlePagination}
      />
      <View style={styles.pagination}>
        {sliderList.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: activeIndex === index ? Colors.PRIMARY : Colors.grey,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 170,
    borderRadius: 10,
    margin: 2,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
