// import { View, Text, FlatList, Image, Dimensions } from "react-native";
// import React, { useEffect, useState } from "react";
// import GlobalApi from "../../Services/GlobalApi";

// export default function Slider() {
//   // const [sliderList, setSliderList] = useState();
//   // const sliderList = [
//   //   {
//   //     id: 1,
//   //     name: "Slider 1",
//   //     imageUrl:
//   //       "https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png",
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Slider 2",
//   //     imageUrl:
//   //       "https://img.freepik.com/premium-vector/medical-healthcare-online-consultation-banner_42775-520.jpg",
//   //   },
//   //   {
//   //     id: 3,
//   //     name: "Slider 3",
//   //     imageUrl:
//   //       "https://img.freepik.com/free-photo/beds-medical-equipment-stand-out-with-soothing-blue-tones-hospital-room_157027-3248.jpg?t=st=1701538330~exp=1701541930~hmac=a008160dbcb0b4b878dbc283708141355426b22b4f40fbd36c2b51c88d72903a&w=1060",
//   //   },
//   // ];

//   // useEffect(() => {
//   //   getSlider();
//   // }, []);

//   // const getSlider = () => {
//   //   GlobalApi.getSlider().then((resp) => {
//   //     console.log(resp.data.data);
//   //     setSliderList(resp.data.data);
//   //   });
//   // };
//   return (
//     <View style={{ marginTop: 10 }}>
//       <FlatList
//         data={sliderList}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <Image
//             source={{ uri: item.imageUrl }}
//             style={{
//               width: Dimensions.get("screen").width * 0.9,
//               height: 170,
//               borderRadius: 10,
//               margin: 2,
//             }}
//           />
//         )}
//       />
//     </View>
//   );
// }
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Services/GlobalApi";

export default function Slider() {
  const [sliderList, setSliderList] = useState();
  // const sliderList=[
  //     {
  //         id:1,
  //         name:'Slider 1',
  //         imageUrl:'https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png'
  //     },
  //     {
  //         id:2,
  //         name:'Slider 2',
  //         imageUrl:'https://img.freepik.com/premium-vector/medical-healthcare-online-consultation-banner_42775-520.jpg'
  //     }
  // ]

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = () => {
    GlobalApi.getSlider().then((resp) => {
      setSliderList(resp.data.data);
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.attributes.Image.data.attributes.url }}
            style={{
              width: Dimensions.get("screen").width * 0.9,
              height: 170,
              borderRadius: 10,
              margin: 2,
            }}
          />
        )}
      />
    </View>
  );
}
