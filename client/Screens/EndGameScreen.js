import React, {useEffect,useState} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView, Platform} from 'react-native'

import axios from 'axios'
import url from '../Constants/url'
import openSocket from "socket.io-client";
import Modal from 'react-native-modal';
import { Entypo,AntDesign  } from '@expo/vector-icons';
import colors from '../Constants/colors'
import LottieView from 'lottie-react-native';


const EndGameScreen = ({navigation,route}) => {
    const [socket, setSocket] = useState(openSocket(url))
    const [showModal, setShowModal] = useState(false)
    const [isWinner, setIsWinner] = useState()
    const [gain, setGain] = useState({})
    const [isSocketListening, setisSocketListening] = useState(false)
    const [isDraw, setIsDraw] = useState(false)
    const [report, setReport] = useState("")
    const [match, setMatch] = useState({})
    const [reportSent, setReportSent] = useState(false)

    useEffect(() => {
        socket.on('voted',()=>{
            axios.get(url+'/result/'+route.params.lobby+"&"+route.params.userId).then(response => {
                const match = response.data
                const gain_perte_user = match.gain_perte.find(e => e.joueur == userId)
                setMatch(response.data)
                if(response.data.winner == 0){
                    setIsDraw(true)
                    console.log('EGALITE :(')
                }else{
                    setGain(gain_perte_user)
                    setIsWinner(gain_perte_user.gain_elos > 0)
                    setShowModal(true)
                }
            })
        })
        setisSocketListening(true)
    }, [])

    useEffect(() => {
        console.log('emission de join_end_game')
        socket.emit('join_end_game', {room: route.params.lobby,userId : route.params.userId, vote:route.params.vote},(isGameOver)=>{
            if(isGameOver){
                axios.get(url+'/result/'+route.params.lobby+"&"+route.params.userId).then(response => {
                    const match = response.data
                    const gain_perte_user = match.gain_perte.find(e => e.joueur == userId)
                    setMatch(response.data)
                    if(response.data.winner == 0){
                        setIsDraw(true)
                        console.log('EGALITE :(')
                    }else{
                        setGain(gain_perte_user)
                        setIsWinner(gain_perte_user.gain_elos > 0)
                        setShowModal(true)
                    }
                })
            }
        });
    }, [])

    const handleSendReport = (
    ) => {
        if(report != ""){
            axios.post(url+"/report",{message:report,userId:route.params.userId,matchId:match._id}).then(r=>{
                setReportSent(true)
                setTimeout(()=>{
                    setIsDraw(false)
                    navigation.navigate('Home')
                },1000)
            })
        }else{
            setIsDraw(false)
            navigation.navigate('Home')
        }
    }


    return (
        <View style={styles.container}>
            <Modal
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
            >
                <View style={styles.modal}>
                    <Text style={{fontFamily:"LaskiSansStencil-Black",fontSize:50,textAlign:'center',color:"white"}}>{isWinner ? "Victoire" : "Défaite"}</Text>
                    {isWinner && <LottieView source={require('../assets/win-animation.json')} autoPlay style={{height:200,zIndex:1}}/>}
                    {!isWinner && <LottieView source={require('../assets/defeat-animation.json')} autoPlay style={{height:200,zIndex:1}}/>}
                    <View style={{width:'100%',height:100,justifyContent:'center',alignItems:'center',marginTop:10}}>
                        <View style={{flex:1}}>
                            <Text style={{color:'white',fontSize:20}}>
                                <Text style={{fontWeight:'600'}}>Classement</Text> :{isWinner ? '+' : null}{gain.gain_elos} <Entypo name="trophy" size={25} color={colors.gold} />
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'white',fontSize:20}}>
                                <Text style={{fontWeight:'600'}}>Étoiles</Text> : +{gain.gain_coins} <AntDesign name="star" size={25} color={colors.purple} />
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {setShowModal(false);navigation.navigate('Home');socket.disconnect();}}>
                        <Text style={{color:'white', fontSize:20,textDecorationLine:'underline'}}>Quitter</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={{width:'100%',alignItems:'center'}}>
                <LottieView source={require('../assets/loading-animation.json')} autoPlay style={{height:200,zIndex:1,marginBottom:10}}/>
                <Text style={styles.text}>En attente des votes des autres joueurs...</Text>
                <Button onPress={() => {console.log(isDraw);setIsDraw(true)}} title='show'/>
            </View>
                
            <Modal isVisible={isDraw}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{...styles.modal,...{flex:1}}}>
                    <Text style={{fontFamily:"LaskiSansStencil-Black",fontSize:50,textAlign:'center',color:"white"}}>Match nul</Text>
                    <View>
                        <Text style={{color:'white',fontSize:15,textAlign:'center'}}>Dites nous en quelques mots ce qu'il s'est passé, nous bannirons les joueurs non fairplay</Text>
                        <TextInput onChangeText={setReport} placeholder="Faites un rapport de la situation" style={{backgroundColor:"white",padding:10,marginVertical:20,height:150,borderRadius:10}} multiline  numberOfLines = {4}/>
                        <TouchableOpacity onPress={handleSendReport} style={{borderWidth:1,borderRadius:10,borderColor:"white",paddingVertical:10,paddingHorizontal:10,justifyContent:'center',alignItems:'center'}} activeOpacity={0.8}>
                            <Text style={{color:'white',fontWeight:'bold'}}>
                                {(!reportSent && report == "") && "Passer"}
                                {(!reportSent && report != "") && "Passer"}
                                {reportSent && <AntDesign name="check" size={18} color="white" />}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default EndGameScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"black",
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    text:{
        fontSize:15,
        color:"white",
        fontWeight:'700',
        textAlign:'center'
    },
    modal:{
        backgroundColor:'black',
        padding:25,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    }
})
