import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import openSocket from "socket.io-client";
import {useSelector} from 'react-redux'


import url from '../Constants/url'
const socket = openSocket(url)


const JoinGame = ({navigation}) => {
    const userId = useSelector(state => state.userId)
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [lobyId, setLobyId] = useState()

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);
    
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      navigation.navigate('Lobby',{lobbyId : data,userId : userId})
    };

    if (hasPermission === null) {
        return <Text>Autorisez l'accès à la caméra</Text>;
    }
    if (hasPermission === false) {
      return <Text>Autorisez l'accès à la caméra depuis les paramètres de votre appareil</Text>;
    }

    return (
        <View style={{flex:1,backgroundColor:'rgb(21,21,21)'}}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
        </View>
    )
}

export default JoinGame

const styles = StyleSheet.create({})
