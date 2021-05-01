import React,{useState, useEffect,useRef, useCallback} from 'react'
import { StyleSheet, Text, View, Dimensions,ScrollView, FlatList, AppState,Alert,TouchableOpacity, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import * as Location from 'expo-location';

import QRCode from 'react-native-qrcode-svg';
import openSocket from "socket.io-client";
import axios from 'axios'

import colors from '../Constants/colors'
import url from '../Constants/url'
import LargeButton from '../Components/Boutons/LargeButton'
import Joueur from '../Components/Joueur'
import { Entypo } from '@expo/vector-icons';

const width = Dimensions.get('window').width


const LobbyScreen = ({route,navigation}) => {
    const [lobbyId, setLobbyId] = useState()
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [socket, setSocket] = useState(openSocket(url))

    socket.on('user_joined',(data)=>{
        setUsers(data)
    })

    socket.on('user_leaved',(data)=>{
        setUsers(data)
    })

    socket.on('user_ready',(data)=>{
        setUsers(data)
        setIsLoading(false)
    })

    socket.on('joueur_changed_team',(data)=>{
        setUsers(data)
    })

    // socket.on('disconnect',()=>{
    //     console.log('ON DISCONNECT')
    //     socket.emit('leave_lobby', {room: route.params.lobbyId,userId : route.params.userId})
    // })

    socket.on('match_begin',(data)=>{
        socket.disconnect()
        navigation.navigate('Game',{users:users,room:route.params.lobbyId}) 
    })

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true)
            setLobbyId(route.params.lobbyId)
            Location.getLastKnownPositionAsync().then(r=>{
                socket.emit('join_lobby', {room: route.params.lobbyId,userId : route.params.userId,nombreJoueurs:route.params.nombreJoueurs,position : {latitude : r.coords.latitude,longitude: r.coords.longitude}});
                setIsLoading(false)
            })
    
            socket.on('lobby_full',()=>{
                Alert.alert(
                    "Désolé...",
                    "La partie que vous tentez de rejoindre est complète",
                    [
                      {
                        text: "Revenir",
                        onPress: () => navigation.navigate('Menu'),
                      },
                    ],
                    {
                      cancelable: true,
                      onDismiss: () =>
                        Alert.alert(
                          "This alert was dismissed by tapping outside of the alert dialog."
                        ),
                    }
                  );
            })
    
            socket.on('wrong_location',()=>{
                Alert.alert(
                    "Erreur",
                    "Vous être trop éloigné du/des joueur(s) du lobby que vous souhaitez rejoindre",
                    [
                      {
                        text: "Revenir",
                        onPress: () => navigation.navigate('Menu'),
                      },
                    ],
                    {
                      cancelable: true,
                      onDismiss: () =>
                        Alert.alert(
                          "This alert was dismissed by tapping outside of the alert dialog."
                        ),
                    }
                  );
            })

            socket.on('wrong_zone',()=>{
                Alert.alert(
                    "Erreur",
                    "Vous devez être dans une zone enregistrée sur la carte pour jouer",
                    [
                      {
                        text: "Revenir",
                        onPress: () => navigation.navigate('Menu'),
                      },
                    ],
                    {
                      cancelable: true,
                      onDismiss: () =>
                        Alert.alert(
                          "This alert was dismissed by tapping outside of the alert dialog."
                        ),
                    }
                  );
            })

            return () => {
                socket.emit('leave_lobby', {room: route.params.lobbyId,userId : route.params.userId})
            }
        },[])
    )

    const handleChangeTeam = (teamClicked) => {
        if(users.find(user=>user._id == route.params.userId).team == teamClicked){
            //Dans ce cas, l'utilisateur veut changer d'équipe pour aller dans son équipe actuelle. On ne fait rien
            return
        }
        //Dans ce cas on change l'équipe de l'utilisateur
        socket.emit('change_team',{room: route.params.lobbyId,userId : route.params.userId})
    }


    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useFocusEffect(
        useCallback(() => {
          AppState.addEventListener("change", _handleAppStateChange);
      
          return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
          };
        }, [])
    )

  const _handleAppStateChange = (nextAppState) => {
      console.log('--->'+nextAppState)
    if(nextAppState == "background"){
        console.log('bg')
    }
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
        setIsLoading(true)
        socket.emit("reconnection", {room: route.params.lobbyId,userId : route.params.userId} ,(lobby) =>{
            setUsers(lobby)
            setIsLoading(false)
        })
        console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };
  

    return (
        <View style={styles.container}>
            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                <QRCode
                    value={lobbyId} //"id" de la partie
                    color={"white"}
                    backgroundColor={colors.background}
                    size={width*0.4}
                />
                <Text style={{color:'white',fontSize:23,marginTop:15,fontWeight:'600'}}>{lobbyId}</Text>
            </View>

            <View style={{flex:3,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                <TouchableOpacity style={{flex:1,width:width/2}} onPress={()=>handleChangeTeam(1)} activeOpacity={0.8}>
                    <FlatList keyExtractor={(u)=>u._id}  style={{flex:1, borderWidth:2,borderColor:"blue",height:'100%'}} data={users} renderItem={(itemData) =>{
                        if(itemData.item.team == 1){
                            return(
                            <View style={{flexDirection:'row',flex:1,width:width/2}}>
                                <View style={{flex:3}}>
                                    <Joueur username={itemData.item.pseudo} elo={itemData.item.elos.toString()} userId={itemData.item._id}/>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                    {itemData.item.isReady && <Entypo name="check" size={24} color="green" />}
                                </View>
                            </View>
                            )
                        }
                    }}/>
                </TouchableOpacity>

                <TouchableOpacity style={{flex:1,width:width/2}} onPress={()=>handleChangeTeam(2)} activeOpacity={0.8}>
                    <FlatList keyExtractor={(u)=>u._id} style={{flex:1, borderWidth:2,borderColor:"red",height:'100%'}} data={users} renderItem={(itemData) =>{
                        if(itemData.item.team == 2){
                            return(
                            <View style={{flexDirection:'row',flex:1,width:width/2}}>
                                <View style={{flex:3}}>
                                    <Joueur username={itemData.item.pseudo} elo={itemData.item.elos.toString()} userId={itemData.item._id}/>
                                </View>
                                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                    {itemData.item.isReady && <Entypo name="check" size={24} color="green" />}
                                </View>
                            </View>
                            )
                        }
                    }}/>
                </TouchableOpacity>

            </View>
            <LargeButton style={{height:50,marginVertical:20}} fontSize={30} onPress={()=>{setIsLoading(true);socket.emit('ready', {room: route.params.lobbyId,userId : route.params.userId})}}>
                {isLoading && <ActivityIndicator color='white'/>}
                {!isLoading && "Prêt"}
            </LargeButton>


            {/* Loading */}
            {isLoading && <ActivityIndicator style={{position:"absolute"}} size="large" color="white" />}

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
