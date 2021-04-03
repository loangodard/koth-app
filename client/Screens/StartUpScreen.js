import React,{useEffect} from 'react'
import { StyleSheet, View,ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import {login,didTryAL} from '../store/actions/auth'
import colors from '../Constants/colors'

const StartUpScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      const tryLogin = async () => {
        const userData = await AsyncStorage.getItem('@userData');
        if(!userData){
            dispatch(didTryAL())
            return;
        }
        const transformerdData = JSON.parse(userData)
        dispatch(login(userId=transformerdData.userId,token=transformerdData.token))
      }
      tryLogin()
    }, [dispatch])
  
    return (
        <View style={styles.screen}>
            <ActivityIndicator />
        </View>
    )
}

export default StartUpScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
