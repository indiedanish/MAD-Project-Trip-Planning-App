import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Button,
  View,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { Dimensions } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Restaurants({route,navigation}) {

  const [clickedFav, setClickedFav] =  useState(false);

 

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
  const storeData = async (id,image,title,rating,price) => {
    try {
      const existingUsers = await AsyncStorage.getItem("Res_Favourites");
      let jsonExistingUsers = JSON.parse(existingUsers);
      if (!jsonExistingUsers) {
        console.log("Null array");
        jsonExistingUsers = [];
      }

      jsonExistingUsers.push({ id: id, image:image,title:title,rating:rating,price:price});

      await AsyncStorage.setItem(
        "Res_Favourites",
        JSON.stringify(jsonExistingUsers)
      );

      console.log("This is added",jsonExistingUsers);
      getData()
      console.log("saved");

      
    } catch (e) {
      // saving error
      console.log(e);
    }
  };


  const apiKey = "b05abdad24mshc4b58fa4d5d26d9p1f8d7bjsnfa1159e091b2";
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [getImage, setImage] = useState([]);
  const [getTitle, setTitle]  = useState([]);

  const [getCheckIn , setCheckIn] =
  route.params === undefined
  ? useState("2020-01-08") : useState(route.params.checkIn) ;

  const [getCheckOut , setCheckOut] = route.params === undefined
  ?  useState("2020-01-15") : useState(route.params.checkOut) ;

  const [getAdults, setAdults] = route.params === undefined
  ?  useState("4") : useState(route.params.adults) ;

  const numberOfHotelsToDisplay = 20;

  const list = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list',
    params: {
      location_id: '293919',
      restaurant_tagcategory: '10591',
      restaurant_tagcategory_standalone: '10591',
      currency: 'USD',
      lunit: 'km',
      limit: '30',
      open_now: 'false',
      lang: 'en_US'
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': 'ec6f3942a7mshb76d57ec2b2ea2bp1d12c0jsna5b17c45c58e'
    }
  
  };


  const getData = async () => {
    await axios
      .request(list)
      .then(function (response) {
        setImage([]);
        


        Array.from(Array(numberOfHotelsToDisplay).keys()).map((ele) => {
         console.log("THIS URLL",response.data.data[ele].photo.images.large.url)

        
          
        const title = response.data.data[ele].name
        const rating = response.data.data[ele].rating
        const price = response.data.data[ele].price
        const image = []
        const id = response.data.data[ele].location_id
         
        
          image.push(response.data.data[ele].photo.images.large.url)
        
       
      


        setImage((getImage) => [...getImage, {ImageUrl: image, ID: id , Title: title, Rating: rating, Price:price}]);

          setTitle((getTitle) => [...getTitle, title]);

        //  callPhotosApi(response.data.data.body.searchResults.results[ele].id,title,rating,price);

          return;
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (getImage.length > 3) {
    return (
      <View style={styles.container}>
        

        <SafeAreaView style={styles.safeViewStyle}>
          <FlatList
            data={getImage}
            renderItem={(item,index) => {
              return (
                <TouchableOpacity style={styles.blockStyle}

    

                onPress={()=>{
              
                  navigation.navigate('RestaurantsBookingScreen' , {hotelId : item.item.ID , imageUrl: item.item.ImageUrl, title: item.item.Title , rating: item.item.Rating , price : item.item.Price })


                }}
                
                >
                <Image
                  style={styles.imageStyle}
                  source={{
                    uri: `${item.item.ImageUrl}`,
                    width: windowWidth-5,
                    height: windowHeight / 4,
                  }}
                  
                />

                <Text style={styles.titleStyle} >{getTitle[item.index]}</Text>

                <MaterialIcons onPress={()=>{

storeData(item.item.ID,item.item.ImageUrl,item.item.Title,item.item.Rating,item.item.Price )


}} style={styles.iconStyle}  name="add" size={30} color="#d27200"  />
       
               

                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>

        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View>

<ActivityIndicator size="large" color="#D27200" /> 
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  safeViewStyle: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  blockStyle:{
      position : "relative",
  },

  titleStyle: {
      
    position : "absolute",
    color:"white",
    fontSize:24,
    padding: "3%",
    
    
    textShadowColor: 'rgb(210, 114, 0.1)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10

  },

  iconStyle:{

    position : "absolute",
    color:"white",
    fontSize:24,
    padding: "3%",
    fontWeight: 'bold',
    textShadowColor: 'rgb(210, 114, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
  top:10,
  right:0,
  marginRight:20

  },
  imageStyle: {
    borderRadius: 10,
    marginTop: 3,
    marginBottom: 3,
    position: "relative",
    
  },


});
