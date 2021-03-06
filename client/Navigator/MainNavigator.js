import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../Constants/colors'


/**
 * Authentication navigator
 */
import RegisterScreen from '../Screens/Auth/RegisterScreen'
import LoginScreen from '../Screens/Auth/LoginScreen'
const navOptions = {
  headerStyle: {
      backgroundColor: colors.background,
      shadowRadius: 0, //Enleve la barre en bas du header
      shadowOffset: {  //Enleve la barre en bas du header
          height: 0,
      }
  },
  headerTintColor: "white",
  headerTitleStyle: {
      fontWeight: 'bold',
  },
  headerBackTitle: " "
}

 const AuthStack = createStackNavigator()
 const AuthNavigator = () => {
     return(
         <AuthStack.Navigator screenOptions={{headerTitle: false}} >
            <AuthStack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
            <AuthStack.Screen name="register" component={RegisterScreen} options={navOptions}/>
         </AuthStack.Navigator>
     )
 }




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

import { useSelector} from 'react-redux'
import StartUpScreen from '../Screens/StartUpScreen'

const MainNavigator = () => {
  const did_try_al = useSelector(state=>state.didTryAL)
  const isAuth = useSelector(state=>state.isAuth)
  if(isAuth){
    return(
        <Stack.Navigator >
            <Stack.Screen name="Home" component={MainScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Nouvelle Partie" component={NewGameScreen} options={navigatorOptions}/>
            <Stack.Screen name="Creer" component={InitGameScreen} options={{...navigatorOptions,...{title:"Nouvelle Partie"}}}/>
            <Stack.Screen name="Lobby" component={LobbyScreen} options={navigatorOptions}/>
        </Stack.Navigator>
    )
  }else if(!isAuth && did_try_al){
    return(AuthNavigator())
  }else if(!isAuth && !did_try_al){
    return(<StartUpScreen />)
  }
}

export {MainNavigator}