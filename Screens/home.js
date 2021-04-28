import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";
import { TouchableHighlight } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "http://localhost:5000/"
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        return (this.setState({
          listData: response.data.data
        }))
      })
      .catch(error => {
        Alert.alert(error.message);
      });
      console.log(this.state.listData)
  };

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        bottomDivider
        chevron
      onPress={() =>
        this.props.navigation.navigate("Details", { planet_name: item.name })
      }
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
       >
        <ListItem.Content>
         
          
            <ListItem.Title>{item.name} </ListItem.Title>
           <View style={{ flexDirection: 'row'}} >
          <ListItem.Subtitle>{item.distance_from_earth} </ListItem.Subtitle>
        
          
        </View>
        </ListItem.Content>
  
      
      </ListItem>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;
   // console.log(listData)
    if (listData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading</Text>
        </View>
      );
    }
else{
    return (
      <View style={styles.container}>

        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>
        <View style={styles.lowerContainer}>
          <SafeAreaView>
                      <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
          </SafeAreaView>

        </View>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988"
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743"
  },
  lowerContainer: {
    flex: 0.9
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e"
  },
  listContainer: {
    backgroundColor: "#eeecda"
  }
});