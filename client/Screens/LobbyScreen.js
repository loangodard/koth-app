import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions,ScrollView, FlatList } from 'react-native'

import QRCode from 'react-native-qrcode-svg';
import openSocket from "socket.io-client";

import colors from '../Constants/colors'
import url from '../Constants/url'
import LargeButton from '../Components/Boutons/LargeButton'
import Joueur from '../Components/Joueur'

const width = Dimensions.get('window').width

const joueurs = [
    {
        id:1,
        username:'joueur1',
        elo:1500,
        team:1
    },
    {
        id:2,
        username:'joueur2',
        elo:2000,
        team:2
    },
    {
        id:3,
        username:'joueur3',
        elo:1500,
        team:1
    },
    {
        id:4,
        username:'joueur4',
        elo:1300,
        team:2
    },
]

/**
 * Socket io
 */
const socket = openSocket(url)

const LobbyScreen = () => {
    const [inRoom, setInRoom] = useState(false);

    useEffect(() => {
        console.log('joining room');
        socket.emit('lobby', {room: 'ABCD'});
        return () => {
            console.log('leaving room');
            socket.emit('leave room', {room: 'ABCD'})
        }
      });

    return (
        <View style={styles.container}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <QRCode
                    value="HKJ8B" //"id" de la partie
                    color={"white"}
                    backgroundColor={colors.background}
                    size={width*0.4}
                />
                <Text style={{color:'white',fontSize:23,marginTop:15,fontWeight:'600'}}>HKJ8B</Text>
            </View>

            <View style={{flex:3,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                <FlatList contentContainerStyle={{alignItems:'center'}} style={{flex:1, borderWidth:2,borderColor:"blue",height:'100%'}} data={joueurs} renderItem={(itemData) =>{
                    if(itemData.item.team == 1){
                        return(<Joueur username={itemData.item.username} elo={itemData.item.elo.toString()}/>)
                    }
                }}/>

                <FlatList contentContainerStyle={{alignItems:'center'}} style={{flex:1, borderWidth:2,borderColor:"red",height:'100%'}} data={joueurs} renderItem={(itemData) =>{
                    if(itemData.item.team == 2){
                        return(<Joueur username={itemData.item.username} elo={itemData.item.elo}/>)
                    }
                }}/>

            </View>
            <LargeButton style={{height:50,marginVertical:20}} fontSize={30}>Prêt</LargeButton>
        </View>
    )
}

export default LobbyScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: colors.background
    },
})
