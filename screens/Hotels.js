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


export default function Hotels({route,navigation}) {

  const [clickedFav, setClickedFav] =  useState(false);

 

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
  const storeData = async (id,image,title,rating,price) => {
    try {
      const existingUsers = await AsyncStorage.getItem("Favourites");
      let jsonExistingUsers = JSON.parse(existingUsers);
      if (!jsonExistingUsers) {
        console.log("Null array");
        jsonExistingUsers = [];
      }

      jsonExistingUsers.push({ id: id, image:image,title:title,rating:rating,price:price});

      await AsyncStorage.setItem(
        "Favourites",
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


  const apiKey = "d67d226487msh37401c709f596bap136232jsn8bc8ac8d6cb2";
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
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/properties/list",
    params: {
      destinationId: "1506246",
      pageNumber: "1",
      pageSize: "25",
      checkIn:getCheckIn ,
      checkOut: getCheckOut,
      adults1: getAdults,
      sortOrder: "PRICE",
      locale: "en_US",
      currency: "USD",
    },
    headers: {
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
      "x-rapidapi-key": `${apiKey}`,
    },
  };

  const callPhotosApi = async (id,title,rating,price) => {

   
    const images = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/properties/get-hotel-photos",
      params: { id: `${id}` },
      headers: {
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": `${apiKey}`,
      },
    };

    await axios
      .request(images)
      .then(function (response) {
        console.log(
          "Images",
          response.data.hotelImages[0].imageId, "ID", id
        );
        
        const temp = [];

        Array.from(Array(5).keys()).map((ele)=>

      {  temp.push(response.data.hotelImages[ele].baseUrl.replace(
          "{size}",
          "z"
        ))
      
      return}
        
        )


        setImage((getImage) => [...getImage, {ImageUrl: temp, ID: id , Title: title, Rating: rating, Price:price}]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getData = async () => {
    await axios
      .request(list)
      .then(function (response) {
        setImage([]);
        


        Array.from(Array(numberOfHotelsToDisplay).keys()).map((ele) => {
            
        const title = response.data.data.body.searchResults.results[ele].name //Title 
        const rating = response.data.data.body.searchResults.results[ele].starRating
        const price = response.data.data.body.searchResults.results[ele].ratePlan.price.current
  
          setTitle((getTitle) => [...getTitle, title]);

          callPhotosApi(response.data.data.body.searchResults.results[ele].id,title,rating,price);

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
              
                  navigation.navigate('BookingScreen' , {hotelId : item.item.ID , imageUrl: item.item.ImageUrl, title: item.item.Title , rating: item.item.Rating , price : item.item.Price })


                }}
                
                >
                <Image
                  style={styles.imageStyle}
                  source={{
                    uri: `${item.item.ImageUrl[1]}`,
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
