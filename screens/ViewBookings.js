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
import { LinearGradient } from 'expo-linear-gradient';


export default function ViewBookings({navigation}) {

  const [isFetching, setIsFetching] = useState(false);


  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [data, setData] = useState(null)

  const FIREBASE_API_ENDPOINT =
  "https://trip-44f0a-default-rtdb.firebaseio.com/"; //Firebase 

  
  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/hotels.json`);
    const data = await response.json();

    const obj = Object.values(data);
    setData(obj)


    setIsFetching(false);
  };
  const deleteHotel = async (index) => {

    const response = await fetch(`${FIREBASE_API_ENDPOINT}/hotels.json`);
    const data = await response.json();


        const obj = Object.keys(data)

        var requestOptions = {
          method: 'DELETE',
        };
    
        fetch(`${FIREBASE_API_ENDPOINT}/hotels/${obj[index]}.json`, requestOptions)
          .then((response) => response.json())
          .then((result) => console.log('Delete Response:', result))
          .catch((error) => console.log('error', error));
      };

  const updateData = () => {
    const id = "-Mra4c0ncxW5hz5GkRNJ";
    var requestOptions = {
      method: "PATCH",
      body: JSON.stringify({
        username: "UserName",
        password: "Password",
        employeename: "Update New Employee",
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/booked/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };


  useEffect(() => {
  

    getData()

  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    getData()
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


  getData()
    return (

        

      <View style={styles.container}>
        

        <SafeAreaView style={styles.safeViewStyle}>
          <FlatList
            data={data}
            renderItem={(item,index) => {
              return (
                <TouchableOpacity style={styles.blockStyle}

  

                onPress={()=>{
                    
                  navigation.navigate('BookingScreen' , {hotelId : item.item.id , imageUrl: item.item.imageUrl, title: item.item.title , rating: item.item.rating , price : item.item.price })
                 

                }}
                
                >


                <Image
                  style={styles.imageStyle}
                  source={{
                    uri: `${item.item.imageUrl[1]}`,
                    width: windowWidth-5,
                    height: windowHeight / 4,
                  }}
                  
                />
            
                <Text style={styles.titleStyle} >{item.item.title}</Text>

          <LinearGradient 
         colors={['#d27200', '#e59900', '#ffbb00']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={{
          marginLeft: 12,
          marginTop: 20,
          fontSize: 20,
          fontWeight: "bold",
       
          borderRadius:20, paddingLeft:10, paddingRight:10, paddingBottom:5,
          paddingTop:5,
        
          position: "absolute",
          bottom: 0,
          marginBottom:15
          

        }}
       
      >
                            
                <Text style={styles.dateStyle} >{item.item.date.substring(0,10)}</Text>

                </LinearGradient>   
            
          <FontAwesome onPress={()=>{
            
                deleteHotel(item.index)
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


  dateStyle:{

  
    color:"white",
    fontSize:15,
  

  
    
    textShadowColor: 'rgb(210, 114, 0.1)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10,
  
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
