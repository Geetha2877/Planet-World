import React from 'react';
import { Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, StackNavigator} from 'react-navigation-stack';
import HomeScreen from './Screens/home';
import DetailScreen from './Screens/details';
export default function App() {
  return (
    <AppContainer/>
    
  );
}
const Appstacknavigator = createStackNavigator({
  Home:{
    screen:HomeScreen,
  navigationOptions:{
    headerShown:false
  }
},
  Details:{
   screen: DetailScreen
  }

  },
  {
    initialRouteName:'Home'
  }

  )
const AppContainer = createAppContainer(Appstacknavigator)