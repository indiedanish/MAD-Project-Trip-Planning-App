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
  RefreshControl,
  ScrollView,
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
import ChatBot from "react-native-chatbot-expo";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ChatBotScreen({ route, navigation }) 
{

  
  const steps = [
    {
      id: "0",
      message: "Welcome to Visit App!",
      trigger: "1",
    },

    {
      id: "1",

      options: [
        { value: 1, label: "I'm hungry?", trigger: "2" },
        { value: 2, label: "I wanna go somewhere?", trigger: "2" },
        { value: 3, label: "I wanna plan trip?", trigger: "2" },
      ],
      trigger: 2,
    },
    {
      id: "2",
      message: "Okay! Here are some Restaurants near you",

      end: true
    },

    {
      id: "3",
      options: [
        { value: 1, label: "No. Thank You?", trigger: "2" },
        { value: 2, label: "Yes!", trigger: "2" },
       
      ],
      trigger: "2",
    },

    {
      id: "4",
      user: true,
      trigger: "2",
    },
  ];

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  


  return (
    
 <SafeAreaView style={styles.container}>
      <ScrollView
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
       <ChatBot
        botBubbleColor="#d27200"
        userBubbleColor="#533508"
        userFontColor="white"
        optionBubbleColor="#533508"
        optionFontColor="white"
        botAvatar="https://w7.pngwing.com/pngs/423/768/png-transparent-computer-icons-user-profile-avatar-woman-business-woman-face-heroes-orange.png"
        userAvatar="https://scontent.fisb6-2.fna.fbcdn.net/v/t39.30808-6/263886083_4459012267544587_3331511776210378213_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFoOXG4BaaIoeHIWB0qpsLN2zzM1hENwXDbPMzWEQ3BcNXLA--hXUAuG6-l5M9-BlFpXflv9MXKQMxob_eaNOrF&_nc_ohc=Pkihowhu_s8AX_mKtHo&_nc_ht=scontent.fisb6-2.fna&oh=00_AT_x7fzl-DqEtcu23yO6_dSV4jMkTWLYLvxTq8h_GLAcRQ&oe=61D90D02"
        steps={steps}
        handleEnd={({ renderedSteps, steps, values }) => {
          if (values == 1) {
            navigation.navigate("Restaurants");
          } else if (values == 2) {
            navigation.navigate("Hotels");
      
          }
        }}
      />
      </ScrollView>
 
  
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: "23%",
  },
});
