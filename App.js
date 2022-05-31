import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";
import Hotel from "./screens/Hotels"
import Favourites from "./screens/Favourites"
import Profile from "./screens/Profile"

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ChatBotScreen from './screens/ChatBotScreen'
import Restaurants from './screens/Restaurants'


import { createDrawerNavigator } from '@react-navigation/drawer';

import Drawer from './screens/Drawer'
import 'react-native-gesture-handler';

export default function App() {


 const Tab = createBottomTabNavigator();





  return (

    <NavigationContainer>   

       <Tab.Navigator

screenOptions={
  {
    tabBarActiveTintColor: "#d27200",
    tabBarInactiveTintColor: "#4F4F4F",
    tabBarShowLabel: false,
    tabBarStyle: {
      borderRadius:30,
      position: 'absolute',
      bottom:5,
      left:5,
      right:5,
      elevation:0, 
      height:90,
      backgroundColor:'#E5E5E5'

    }
  }
  }
  >
    <Tab.Screen
      name="Drawer"
      component={Drawer}
      options={{
       headerShown: false,
        headerStyle: {
          backgroundColor: "#d27200",
        },
        headerTitleStyle: {
          color: "white",
        
        },
        headerTitleAlign: 'center',
      
        tabBarLabel: 'Home',
      
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home-outline" color={color} size={30} />
        ),
      }}
    />


    <Tab.Screen
      name="Favourites"
      component={Favourites}
      options={{

        
        headerStyle: {
          backgroundColor: "#d27200",
        },
        headerTitleStyle: {
          color: "white",
        
        },
        headerTitleAlign: 'center',
      
        tabBarLabel: 'Home',
      
        tabBarIcon: ({ color }) => (
          <Feather name="heart" size={25} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Hotels"
      component={Hotel}
      options={{

        
        headerStyle: {
          backgroundColor: "#d27200",
        },
        headerTitleStyle: {
          color: "white",
        
        },
        headerTitleAlign: 'center',

        tabBarLabel: 'createTrip',
        tabBarIcon: ({ color }) => (
          <Ionicons name="add-circle-sharp" size={60} color="#d27200"  />
        ),
      }}
    />


<Tab.Screen
      name="ChatBot"
      component={ChatBotScreen}
      options={{
        tabBarHideOnKeyboard: true, 
        
        
        headerStyle: {
          backgroundColor: "#d27200",
        },
        headerTitleStyle: {
          color: "white",
        
        },
        headerTitleAlign: 'center',
      
     
      
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="facebook-messenger" size={28} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{

        
        headerStyle: {
          backgroundColor: "#d27200",
        },
        headerTitleStyle: {
          color: "white",
        
        },
        headerTitleAlign: 'center',
        tabBarColor: 'green',
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>

  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
