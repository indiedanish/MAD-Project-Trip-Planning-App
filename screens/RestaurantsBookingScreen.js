import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Button,
  Modal,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height; 

const RestaurantsBookingScreen = ({ route, navigation }) => {
  const FIREBASE_API_ENDPOINT =
    "https://trip-44f0a-default-rtdb.firebaseio.com/"; //Firebase 

  const [modalVisible, setModalVisible] = useState(false);

  const postData = (hotelId,imageUrl,title,price, rating) => {
    var requestOptions = {
      method: "POST",
      body: JSON.stringify({
        hotelId: hotelId,
        imageUrl: imageUrl,
        title: title,
        price: price,
        rating: rating,
       
      }),
    };
    fetch(`${FIREBASE_API_ENDPOINT}/resturants/.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <Feather name="check-circle" size={22} color="black" />
                Booked :)
              </Text>
              <View style={{ paddingTop: 20 }} />
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#d27200" }]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Restaurants");
                    navigation.goBack();
                }}
              >
              
                  <Text style={{ color: "white" }}>OK</Text>
              
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          horizontal
          data={route.params.imageUrl}
          renderItem={(item, index) => {
            return (
              <>
                <ImageBackground
                  source={{
                    uri: `${item.item}`,
                  }}
                  imageStyle={{
                    borderBottomLeftRadius: 70,
                    borderBottomRightRadius: 70,
                  }}
                  style={{
                    width: windowWidth,
                    height: windowHeight / 1.78,
                    marginRight: 4,
                  }}
                >
                  <Ionicons
                    onPress={() => {
                      navigation.navigate("Restaurants");
                      navigation.goBack();
                    }}
                    style={{ marginTop: "10%", marginLeft: "5%" }}
                    name="arrow-back"
                    size={24}
                    color="white"
                  />
                </ImageBackground>
              </>
            );
          }}
        />

        <View style={styles.infoBox}>
          <Text style={styles.textHeading}>{route.params.title} </Text>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 20,
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
              }}
            >
              Rating: {JSON.stringify(route.params.rating)}
            </Text>

            <MaterialIcons
              style={{ marginLeft: 4, marginTop: 24 }}
              name="stars"
              size={23}
              color="#d27200"
            />
            <Text
              style={{
                marginLeft: 6,
                marginTop: 20,
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {route.params.price}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              postData(route.params.hotelId, route.params.imageUrl, route.params.title,route.params.price, route.params.rating);
           
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.buttonBookNowStyle}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    borderRadius: 10,

    marginBottom: 3,
  },

  infoBox: {
    width: windowWidth,
    height: windowHeight / 2,

    backgroundColor: "#fffcf9",
  },
  textHeading: {
    color: "#d27200",
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 20,
    marginTop: 20,
    fontFamily: "sans-serif-condensed",
  },
  buttonBookNowStyle: {
    backgroundColor: "#d27200",
    color: "white",
    padding: 20,
    fontSize: 25,
    borderRadius: 20,
    marginTop: 30,
    textAlign: "center",
    marginRight: 10,
    marginLeft: 10,
    textShadowColor: "#9b5200",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    height: 180,
  },
  modalText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "KaushanScript",
  },
  modalBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e89302",

    borderRadius: 5,
    padding: 10,
    width: 180,
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default RestaurantsBookingScreen;
