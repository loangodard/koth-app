import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../Constants/colors'

const Stack = createStackNavigator()

import MainScreen from '../Screens/MainScreen'
import NewGameScreen from '../Screens/NewGameScreen'
import InitGameScreen from '../Screens/InitGameScreen'
import LobbyScreen from '../Screens/LobbyScreen'

const navigatorOptions ={
          headerStyle: {
            backgroundColor: colors.background,
            shadowRadius: 0, //Enleve la barre en bas du header
            shadowOffset: {  //Enleve la barre en bas du header
                height: 0,
            }
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: ' '
}


const MainNavigator = () => {
    return(
        <Stack.Navigator >
            <Stack.Screen name="Home" component={MainScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Nouvelle Partie" component={NewGameScreen} options={navigatorOptions}/>
            <Stack.Screen name="Creer" component={InitGameScreen} options={{...navigatorOptions,...{title:"Nouvelle Partie"}}}/>
            <Stack.Screen name="Lobby" component={LobbyScreen} options={navigatorOptions}/>
        </Stack.Navigator>
    )
}

export {MainNavigator}