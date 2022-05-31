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

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Res_Favourites({navigation}) {

  const [isFetching, setIsFetching] = useState(false);


  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [favData, setFavData] = useState(null)

  useEffect(() => {
  

    getFav()

  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    getFav()
  };

  const removeFav = async (toRemove) => {
    try {
      const existingUsers = await AsyncStorage.getItem("Res_Favourites");
      let jsonExistingUsers = JSON.parse(existingUsers);
      if (!jsonExistingUsers) {
        console.log("Null array");
        jsonExistingUsers = [];
      }

      console.log("THIS IS ARRAY: ",jsonExistingUsers)

      jsonExistingUsers= jsonExistingUsers.filter(function(obj){ 

        if(obj.title!=toRemove) return { id: obj.id, image:obj.image,title:obj.title,rating:obj.rating,price:obj.price };
    });

      await AsyncStorage.setItem(
        "Res_Favourites",
        JSON.stringify(jsonExistingUsers)
      );

    

      
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const Empty = () =>{

    return (

      <View style={{  flex: 1,
  
        width: windowWidth,
        height: windowHeight/1.3,
        alignItems: "center",
        justifyContent: "center"
 
        }} >

          <Text style={{ 
            textAlign:"center",
          
          backgroundColor:"#d27200",
          color: "white",
          padding: "3%",
          fontSize: 22,
          width: windowWidth/2,
          borderRadius:16,
          }}>No Data Found</Text>
        </View>
    )
  }

  const getFav = async () => {
    try {
      const users = await AsyncStorage.getItem("Res_Favourites");

      let jsonUsers = JSON.parse(users);

      if (jsonUsers == null) {
        // value previously stored
        console.log("No users! Null");
      } else
      
      
      
     {
       console.log("THISSS is ",jsonUsers.map(function (obj) {return obj.title }))


      setFavData(jsonUsers.map(function (obj) {return { id: obj.id, image:obj.image,title:obj.title,rating:obj.rating,price:obj.price }}));
     
       
      console.log("GOT DATA: ",jsonUsers);
}
setIsFetching(false);

    } catch (e) {
      // error reading value
      console.log(e);
    }
  } 

  
    return (

      <View style={styles.container}>
        

        <SafeAreaView style={styles.safeViewStyle}>
          <FlatList
            data={favData}
            renderItem={(item,index) => {
              return (
                <TouchableOpacity style={styles.blockStyle}

    

                onPress={()=>{
              
                  navigation.navigate('BookingScreen' , {hotelId : item.item.id , imageUrl: item.item.image, title: item.item.title , rating: item.item.rating , price : item.item.price })


                }}
                
                >
                <Image
                  style={styles.imageStyle}
                  source={{
                    uri: `${item.item.image[0]}`,
                    width: windowWidth-5,
                    height: windowHeight / 4,
                  }}
                  
                />

                <Text style={styles.titleStyle} >{item.item.title}</Text>

            
          <FontAwesome onPress={()=>{
                removeFav(item.item.title)
                onRefresh()

          }} style={styles.iconStyle}  name="trash-o" size={26} color="white" />
               

                </TouchableOpacity>
              );
            }}

            onRefresh={onRefresh}
            refreshing={isFetching}
            ListEmptyComponent={<Empty/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>

        <StatusBar style="auto" />
      </View>
  
    );
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
