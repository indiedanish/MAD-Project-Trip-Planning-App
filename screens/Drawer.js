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
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Favourites from "./Favourites";

import Home from "./Home";
import BookingScreen from "./BookingScreen"

import ViewBookings from "./ViewBookings"
import Restaurants from "./Restaurants"
import RestaurantsBookingScreen from "./RestaurantsBookingScreen"
import Res_Favourites from "./Res_Favourites"
import ViewResBooking from "./ViewResBooking"

export default function Drawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fffcf9",
        },

        drawerActiveBackgroundColor: "#d27200",
        drawerActiveTintColor: "#ffefdd",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: "#d27200",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Favourite Hotels"
        component={Favourites}
        options={{
          headerStyle: {
            backgroundColor: "#d27200",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />

<Drawer.Screen
        name="Favourite Resturants"
        component={Res_Favourites}
        options={{
          headerStyle: {
            backgroundColor: "#d27200",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />


<Drawer.Screen
        name="Hotel Bookings"
        component={ViewBookings}
        options={{
         
        
          headerStyle: {
            backgroundColor: "#d27200",
            
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />

<Drawer.Screen
        name="Restaurant Booking"
        component={ViewResBooking}
        options={{
         
        
          headerStyle: {
            backgroundColor: "#d27200",
            
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />



<Drawer.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          headerStyle: {
            backgroundColor: "#d27200",
            
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />
      
      <Drawer.Screen
        name="RestaurantsBookingScreen"
        component={RestaurantsBookingScreen}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          headerStyle: {
            backgroundColor: "#d27200",
            
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />
<Drawer.Screen
        name="Restaurants"
        component={Restaurants}
        options={{
          drawerLabel: () => null,
          
          headerStyle: {
            backgroundColor: "#d27200",
            
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTitleAlign: "center",
        }}
      />

    </Drawer.Navigator>
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

  blockStyle: {
    position: "relative",
  },

  titleStyle: {
    position: "absolute",
    color: "white",
    fontSize: 24,
    padding: "3%",

    textShadowColor: "rgb(210, 114, 0.1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  iconStyle: {
    position: "absolute",
    color: "white",
    fontSize: 24,
    padding: "3%",
    fontWeight: "bold",
    textShadowColor: "rgb(210, 114, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    top: 10,
    right: 0,
    marginRight: 20,
  },
  imageStyle: {
    borderRadius: 10,
    marginTop: 3,
    marginBottom: 3,
    position: "relative",
  },
});
