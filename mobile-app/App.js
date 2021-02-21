import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Elos from './Components/Elos'
import colors from './Constants/colors'

import {MainNavigator} from './Navigator/MainNavigator'

export default function App() {
  return (
    <NavigationContainer>
        <MainNavigator />
    </NavigationContainer>
  );
}
