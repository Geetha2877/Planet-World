import React from 'react';
import { FlatList, TextPropTypes } from 'react-native';
import { Alert, Text, View, SafeAreaView, SafeAreaViewComponent } from 'react-native';
import { ListItem, Card, Icon } from 'react-native-elements';
import axios from 'axios'
import { StyleSheet } from 'react-native';

export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {},
            image_path: "",
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
                "planet_name"
            )}`
        }
    }
    getDetails = () => {
        const  url  = this.state.url;
        axios.get(url)
            .then(response => {
                this.setdetails(response.data.data)
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    setdetails = planetdetails => {
        const planettype = planetdetails.planet_type;
        let image_path = "";
        switch (planettype) {
            case "Gas Giant":
                image_path = require('../assets/images/gas_giant.png')
            case "Terrestrial":
                image_path = require('../assets/images/terrestrial.png')
            case "Neptune Like":
                image_path = require('../assets/images/neptune_like.png')
            case "Super Earth":
                image_path = require('../assets/images/super_earth.png')
            default:
                image_path = require('../assets/images/gas_giant.png')

        }
        this.setState({
            details: planetdetails,
            image_path: image_path
        })
    }
    componentDidMount() {
        this.getDetails()
    }

   
  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
            <Text
                style={styles.cardItem}
              >{`Planet Name: ${details.name}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Speed : ${details.orbital_speed}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Mass : ${details.planet_mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Radius : ${details.planet_radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Type : ${details.planet_type}`}</Text>
            </View>
            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardItem: {
        marginBottom: 10
    }
})