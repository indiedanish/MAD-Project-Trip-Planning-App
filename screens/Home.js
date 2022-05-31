import React, {useState,useEffect} from "react";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  Button,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const image = {
  uri: "https://i.pinimg.com/564x/ac/08/d7/ac08d7ab51aa935c58c956605ff5acd7.jpg",
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const Home = ({ navigation, route }) =>{


  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [hideSearched , setHideSearched]  = useState(true);


const FIREBASE_API_ENDPOINT =
"https://trip-44f0a-default-rtdb.firebaseio.com/"; //Firebase 


const getData = async () => {
  const response = await fetch(`${FIREBASE_API_ENDPOINT}/hotels.json`);
  const data = await response.json();

  const obj = Object.values(data);
  setMasterDataSource(obj)

};

const ItemView = ({ item , index}) => {
  return (

    <TouchableOpacity style={{backgroundColor:"#f9ecd9", padding:10, borderRadius:10, marginBottom:2
  }}
    onPress={()=>{

    
                    
      navigation.navigate('BookingScreen' , {hotelId : item.id , imageUrl: item.imageUrl, title: item.title , rating: item.rating , price : item.price })
     
return
    }}
    >
    <Text style={{    opacity: 0.7,
      color: "#965000",}}>{item.title}</Text>

</TouchableOpacity>

  );
};




useEffect(() => {
  

  getData()

}, []);


const searchFilterFunction = (text) => {


  if (text) {
    const newData = masterDataSource.filter(function (item) {
      const itemData = item
        ? item.title.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    console.log(newData)
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    setFilteredDataSource(null);
    setSearch(text);
  }
};
  
  return (


  


  <>
   

    <View style={styles.container}>

    
      <ImageBackground
        source={image}
        imageStyle={{ borderBottomLeftRadius: 70, borderBottomRightRadius: 70 }}
        style={styles.image}
      >
         <Searchbar
          placeholder="Search"
          onIconPress={() => {
            return;
          }}
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            left: "60%",
            top: 0,
            opacity: 0.3,
            color: "white",
          }}

          onChangeText={(text) => {
         
            searchFilterFunction(text)
          
          }}
          value={search}
        /> 





        <TouchableOpacity
          style={{
            marginLeft: 20,
            position: "absolute",
            left: "0%",
            top: "4%",
          }}

         
        >
          <FontAwesome5
            name="user-circle"
            size={24}
            color="black"
            style={{
              position: "absolute",

              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,

              opacity: 0.6,
              color: "white",
            }}
          />
          <Text
            style={{
              fontSize: 17,
              opacity: 0.7,
              color: "white",
              marginLeft: 35,
            }}
          >
            Hi, Selena
          </Text>
        </TouchableOpacity>

        <Text style={styles.textHeading}>
          Wanna Plan {"\n"}Your Next Trip?{" "}
        </Text>
        <TouchableOpacity>
          <Text style={styles.calulateBudgetText}>Calculate Budget</Text>
        </TouchableOpacity>

        <FlatList style={{height: '50%', position: 'absolute', width: '39%', left: "60%",top:"16%" }}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
       
          renderItem={ItemView}
        />
      </ImageBackground>

      <ScrollView horizontal={true} style={styles.buttonViewStyle}>
        <TouchableOpacity style={styles.buttonStyle}
        
        onPress={() => {
          navigation.navigate("Restaurants");
        }}
        >

          
          <MaterialCommunityIcons
            style={{
              marginTop: 4,
              textShadowColor: "#9b5200",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
            }}
            name="silverware-fork-knife"
            size={21}
            color="white"
          />

          <Text style={styles.buttonTextStyle}>Restaurant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Hotels");
          }}
          style={styles.buttonStyle}
        >
          <AntDesign
            style={{
              marginTop: 3,
              textShadowColor: "#9b5200",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
            }}
            name="home"
            size={21}
            color="white"
          />
          <Text style={styles.buttonTextStyle}>Hotel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}>
          <Ionicons
            name="airplane-outline"
            size={24}
            color="white"
            style={{
              textShadowColor: "#9b5200",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
            }}
          />
          <Text style={styles.buttonTextStyle}>Tickets</Text>
        </TouchableOpacity>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: "57%",
          left: "2%",
          justifyContent: "center",
        }}
      >
        <ScrollView horizontal={true}>

          <TouchableOpacity onPress={()=>{navigation.navigate("Hotel Bookings")}}>
          <ImageBackground
            source={{
              uri: "https://worldofwanderlust.com/wp-content/uploads/2018/10/Paris-by-night.jpg",
            }}
            imageStyle={{ borderRadius: 40 }}
            style={{ width: 180, height: 220 }}
          >
            <Text style={styles.bottomImageTextStyle}>Hotels{"\n"}Bookings</Text>
          </ImageBackground>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{navigation.navigate("Restaurant Booking")}}>

          <ImageBackground
            source={{
              uri: "https://media.istockphoto.com/photos/montmartre-in-paris-france-picture-id1059273012",
            }}
            imageStyle={{ borderRadius: 40 }}
            style={{ width: 180, height: 220, marginLeft: 10 }}
          >
            <Text style={styles.bottomImageTextStyle}>Restaurants{"\n"}Bookings</Text>
          </ImageBackground>

          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{navigation.navigate("Favourite Resturants")}}>
          <ImageBackground
            source={image}
            imageStyle={{ borderRadius: 40 }}
            style={{ width: 180, height: 220, marginLeft: 10 }}
          >
            <Text style={styles.bottomImageTextStyle}>Favourite{"\n"}Hotels</Text>
          </ImageBackground>

          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  </>
);

          }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    height: windowHeight - 500,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  textHeading: {
    color: "white",
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 20,
    fontFamily: "sans-serif-condensed",
  },

  buttonViewStyle: {
    marginTop: "3%",
  },

  buttonStyle: {
    padding: 20,
    backgroundColor: "#d27200",
    borderRadius: 25,
    height: "17%",
    marginLeft: 2,
    marginRight: 2,
    flexDirection: "row",
  },
  buttonTextStyle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    textShadowColor: "#9b5200",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },

  calulateBudgetText: {
    textAlign: "center",
    color: "white",
    backgroundColor: "#d6c6ad",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "3%",
    fontSize: 24,
    padding: "2%",
    borderRadius: 18,
    opacity: 0.8,
    color: "#d27200",
  },

  bottomImageTextStyle: {
    padding: 20,
    fontSize: 20,
    color: "white",
     textShadowColor: "#9b5200",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 10,
  
  },
});

export default Home;
