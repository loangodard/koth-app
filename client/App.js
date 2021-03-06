import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider,useDispatch } from 'react-redux'
import {authStore} from "./store/reducers/auth"



import Elos from './Components/Elos'
import colors from './Constants/colors'

import {MainNavigator} from './Navigator/MainNavigator'

export default function App() {
  return (
    <Provider store={authStore}>
      <NavigationContainer>
          <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
