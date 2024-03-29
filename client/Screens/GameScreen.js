import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions,FlatList, TouchableOpacity, Alert, Platform, StatusBar} from 'react-native'
import LottieView from 'lottie-react-native';
import axios from 'axios'

import {useSelector} from 'react-redux'
import colors from '../Constants/colors'
import url from '../Constants/url'
import LargeButton from '../Components/Boutons/LargeButton'
import Joueur from '../Components/Joueur'
import { Entypo } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width


const GameScreen = ({route,navigation}) => {
    const userId = useSelector(state => state.userId)
    const [zone, setZone] = useState("")
    const [team1, setTeam1] = useState([])
    const [team2, setTeam2] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [lobby, setLobby] = useState()
    const [dateDebut, setDateDebut] = useState()

    const handleVote = (vote) => {
        console.log('USERID:'+userId)
        setShowModal(false)
        navigation.navigate('End-Game',{vote:vote,lobby:lobby,userId:userId})
    }

    useEffect(() => {
        console.log(route.params.room)
        axios.get(url+'/match/'+route.params.room).then(match=>{
            setZone(match.data.zone)
            setTeam1(match.data.team1)
            setTeam2(match.data.team2)
            setLobby(match.data.lobby)
            setDateDebut(match.data.date_debut)
        })
    }, [])

    const handleFinDuMatch = () => {
        const now = new Date()
        //5 minutes
        if(Math.abs(now - new Date(dateDebut)) > 3*60*1000){
            setShowModal(true)
        }else{
            Alert.alert(
                "Match trop rapide",
                "Pour des soucis d'abus, le match doit durer au moins 3 minutes",
                [
                  { text: "Ok" }
                ]
              );
        }
    }

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="rgb(21,21,21)"/>
            <Modal
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
            >
                <View style={{backgroundColor:'rgb(21,21,21)',padding:50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:"white",fontSize:25,fontWeight:'600',marginBottom:5}}>Qui a gagné ?</Text>
                    <Text style={{color:"white",fontSize:15,fontWeight:'500',marginBottom:45,textAlign:'center'}}>Attention ! Si vous trichez, vous risquez d'être bannis</Text>


                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>handleVote(1)} activeOpacity={0.7} style={{width:'60%',backgroundColor:'blue',padding:10,paddingVertical:15,alignItems:'center',marginHorizontal:5,borderRadius:20}}>
                            <Text style={{color:'white',fontWeight:'700'}}>Équipe Bleue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleVote(2)} activeOpacity={0.7} style={{width:'60%',backgroundColor:'red',padding:10,paddingVertical:15,alignItems:'center',marginHorizontal:5,borderRadius:20}}>
                            <Text style={{color:'white',fontWeight:'700'}}>Équipe Rouge</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                {Platform.OS === 'ios' && <LottieView source={require('../assets/spin_animation.json')} autoPlay loop  style={{height:'105%',zIndex:1}}/> }
                <Text style={{color:"white",position:'absolute',zIndex:0,fontSize:95,fontFamily:"LaskiSansStencil-Black"}}>JOUEZ</Text>

            </View>

            <View style={{flex:3,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                    <FlatList keyExtractor={(u)=>u._id}  style={{flex:1, borderWidth:2,borderColor:"blue",height:'100%'}} data={team1} renderItem={(itemData) =>{
                            return(
                            <View style={{flexDirection:'row',flex:1,width:width/2}}>
                                <View style={{flex:3}}>
                                    <Joueur username={itemData.item.pseudo} elo={itemData.item.elos.filter(e => e.zone == zone)[0].elo} userId={itemData.item._id}/>
                                </View>
                            </View>
                            )
                    }}/>

                    <FlatList keyExtractor={(u)=>u._id} style={{flex:1, borderWidth:2,borderColor:"red",height:'100%'}} data={team2} renderItem={(itemData) =>{
                            return(
                            <View style={{flexDirection:'row',flex:1,width:width/2}}>
                                <View style={{flex:3}}>
                                    <Joueur username={itemData.item.pseudo} elo={itemData.item.elos.filter(e => e.zone == zone)[0].elo} userId={itemData.item._id}/>
                                </View>
                            </View>
                            )
                    }}/>

            </View>
            <LargeButton style={{height:50,marginVertical:20}} fontSize={30} onPress={handleFinDuMatch}>Fin du match</LargeButton>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: colors.background
    },
})